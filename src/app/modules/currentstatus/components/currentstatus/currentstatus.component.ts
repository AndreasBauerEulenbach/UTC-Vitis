import {Component, OnInit} from '@angular/core';
import {AccountService} from "@app/_services/account.service";
import {first} from "rxjs/operators";
import {GameService} from "@app/_services/game.service";


@Component({
  selector: 'app-currentstatus',
  templateUrl: 'currentstatus.component.html',
  styleUrls: ['currentstatus.component.scss']
})

export class CurrentstatusComponent implements OnInit {
  accounts: any[];
  allGames: any[];
  private accountId: '3';

  constructor(private accountService: AccountService, private gameService: GameService) {}

  ngOnInit() {
    this.accountService.getAll()
      .pipe(first())
      .subscribe(accounts => this.accounts = accounts);

    this.gameService.createGameForCurrentAccount("2").pipe(first())
      .subscribe();

    this.gameService.getAllGamesOfAccount(this.accountId)
      .pipe(first())
      .subscribe(allGames => this.allGames = allGames);
  }
}
