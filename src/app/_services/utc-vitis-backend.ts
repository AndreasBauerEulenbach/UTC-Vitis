import {Inject, Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import {Observable, of, throwError} from 'rxjs';
import {AlertService} from "@app/_services/alert.service";
import {delay, dematerialize, first, materialize} from "rxjs/operators";
import {AccountService} from "@app/_services/account.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class UtcVitisBackend implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("FE --> UTCVitisBackend-Interceptor URL: " + request.url);

    const {url, method, headers, body} = request;


    return next.handle(request);//return handleRoute();

    function handleRoute() {/*
      switch (true) {
        case url.endsWith('/accounts/register') && method === 'POST':
          return register();
        default:
          // pass through any requests not handled above

      }
    }

    function register() {

    }**/


      /**
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

       }**/

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

      function isAuthorizedAsAdmin() {
        const account = currentAccount();
        if (!account) return false;
        return account.isAdmin;
      }

      function idFromUrl() {
        const urlParts = url.split('/');
        return parseInt(urlParts[urlParts.length - 1]);
      }


      function currentAccount() {
        // check if jwt token is in auth header
        const authHeader = headers.get('Authorization');
        if (!authHeader.startsWith('Bearer fake-jwt-token')) return;

        // check if token is expired
        const jwtToken = JSON.parse(atob(authHeader.split('.')[1]));
        const tokenExpired = Date.now() > (jwtToken.exp * 1000);
        if (tokenExpired) return;

        const account = this.accounts.find(x => x.id === jwtToken.id);
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
    }
  }
}
