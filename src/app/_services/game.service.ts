import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {environment} from '@environments/environment';
import {Game} from "@app/models/game";
import {AccountService} from "@app/_services/account.service";

const baseUrl = `${environment.apiUrl}/games`;

@Injectable({ providedIn: 'root' })
export class GameService {
  private gameSubject: BehaviorSubject<Game>;
  public game: Observable<Game>;

  constructor(
      private router: Router,
      private http: HttpClient,
      private accountService: AccountService
  ) {
    this.gameSubject = new BehaviorSubject<Game>(null);
    this.game = this.gameSubject.asObservable();
  }

  getAllGamesOfAccount(accountId: String): Observable<Game[]> {
    return this.http.get<Game[]>(`${baseUrl}/3`);
  }

  createGameForCurrentAccount(player2Id): Observable<Object> {
    return this.http.post(baseUrl + '/' + player2Id, "");
  }

  isGameCreatedByCurrentAccount(gameId: String) {
    let creatorOfGame;
    this.http.get<Game>(`${baseUrl}/${gameId}`).subscribe(resp => creatorOfGame = resp.creatorId);
    console.log("GameID : " + gameId);
    return creatorOfGame == this.getCurrentAccount()._id;
  }

  getCurrentAccount() {
    return this.accountService.accountValue;
  }
}
