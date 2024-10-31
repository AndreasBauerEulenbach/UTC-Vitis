import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, materialize, dematerialize} from 'rxjs/operators';

import {AlertService} from '@app/_services/alert.service';
import {Game} from "@app/models/game";
import {Account} from "@app/models/account";

// array in local storage for accounts
const accountsKey = 'angular-10-signup-verification-boilerplate-accounts';
let accounts = JSON.parse(localStorage.getItem(accountsKey)) || [];

const gamesKey = 'angular-10-signup-verification-boilerplate-games';
let games = JSON.parse(localStorage.getItem(gamesKey)) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;
    const alertService = this.alertService;

    return handleRoute();

    function handleRoute() {
      console.log("URL Fake-Backend --> " + url);
      switch (true) {
        case url.endsWith('/accounts/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/accounts/refresh-token') && method === 'POST':
          return refreshToken();
        case url.endsWith('/accounts/revoke-token') && method === 'POST':
          return revokeToken();
        case url.match(/\/games\/\d+$/) && method === 'GET':
          return getAllGamesOfAccount();
        case url.match(/\/games\/\d+$/) && method === 'POST':
          return createGame();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const {email, password} = body;
      const account = accounts.find(x => x.email === email && x.password === password && x.isVerified);

      //console.log("Account: ", account);
      //console.log("Accounts: ", accounts);

      if (!account) return error('Email oder Passwort sind falsch!');

      // add refresh token to account
      account.refreshTokens.push(generateRefreshToken());
      localStorage.setItem(accountsKey, JSON.stringify(accounts));

      return ok({
        ...basicDetailsAccount(account),
        jwtToken: generateJwtToken(account)
      });
    }

    function refreshToken() {
      const refreshToken = getRefreshToken();

      if (!refreshToken) return unauthorized();

      const account = accounts.find(x => x.refreshTokens.includes(refreshToken));

      if (!account) return unauthorized();

      // replace old refresh token with a new one and save
      account.refreshTokens = account.refreshTokens.filter(x => x !== refreshToken);
      account.refreshTokens.push(generateRefreshToken());
      localStorage.setItem(accountsKey, JSON.stringify(accounts));

      return ok({
        ...basicDetailsAccount(account),
        jwtToken: generateJwtToken(account)
      });

    }

    function revokeToken() {
      if (!isAuthenticated()) return unauthorized();

      const refreshToken = getRefreshToken();
      const account = accounts.find(x => x.refreshTokens.includes(refreshToken));

      // revoke token and save
      account.refreshTokens = account.refreshTokens.filter(x => x !== refreshToken);
      localStorage.setItem(accountsKey, JSON.stringify(accounts));

      return ok();
    }


    // helper functions

    function ok(body?) {
      return of(new HttpResponse({status: 200, body}))
        .pipe(delay(500)); // delay observable to simulate server api call
    }

    function error(message) {
      return throwError({error: {message}})
        .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function unauthorized() {
      return throwError({status: 401, error: {message: 'Unauthorized'}})
        .pipe(materialize(), delay(500), dematerialize());
    }

    function basicDetailsAccount(account) {
      const {id, title, firstName, lastName, email, isAdmin, dateCreated, isVerified} = account;
      return {id, title, firstName, lastName, email, isAdmin, dateCreated, isVerified};
    }

    function basicDetailsGame(game) {
      const {id, player1, player2, date, time} = game;
      return {id, player1, player2, date, time};
    }

    function isAuthenticated() {
      return !!currentAccount();
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function newAccountId() {
      return accounts.length ? Math.max(...accounts.map(x => x.id)) + 1 : 1;
    }

    function newGameId() {
      return games.length ? Math.max(...games.map(x => x.gameId), 1) + 1 : 1;
    }

    function currentAccount() {
      // check if jwt token is in auth header
      const authHeader = headers.get('Authorization');
      if (!authHeader.startsWith('Bearer fake-jwt-token')) return;

      // check if token is expired
      const jwtToken = JSON.parse(atob(authHeader.split('.')[1]));
      const tokenExpired = Date.now() > (jwtToken.exp * 1000);
      if (tokenExpired) return;

      const account = accounts.find(x => x.id === jwtToken.id);
      return account;
    }

    function generateJwtToken(account) {
      // create token that expires in 15 minutes
      const tokenPayload = {
        exp: Math.round(new Date(Date.now() + 15 * 60 * 1000).getTime() / 1000),
        id: account.id
      }
      return `fake-jwt-token.${btoa(JSON.stringify(tokenPayload))}`;
    }

    function generateRefreshToken() {
      const token = new Date().getTime().toString();

      // add token cookie that expires in 7 days
      const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `fakeRefreshToken=${token}; expires=${expires}; path=/`;

      return token;
    }

    function getRefreshToken() {
      // get refresh token from cookie
      return (document.cookie.split(';').find(x => x.includes('fakeRefreshToken')) || '=').split('=')[1];
    }

    function getAllGamesOfAccount() {
      if (!isAuthenticated()) return unauthorized();

      //let foundGames = games.find(x => x.game.id === idFromUrl());

      return ok(games.map(x => basicDetailsGame(x)));
    }

    function createGame() {
      if (!isAuthenticated()) return unauthorized();

      //localStorage.clear();

      const newGame = new Game();
      const player2Account = accounts.find(x => x.id === idFromUrl());

      // assign game id and a few other properties then save
      newGame.gameId = newGameId();
      newGame.player1 = currentAccount();
      newGame.player2 = player2Account;
      console.log(newGame);

      games.push(newGame);
      localStorage.setItem(gamesKey, JSON.stringify(games));

      return ok();
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
