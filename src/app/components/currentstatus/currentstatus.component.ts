import {Component, OnInit} from '@angular/core';
import {AccountService} from "@app/_services/account.service";
import {first} from "rxjs/operators";
import {GameService} from "@app/_services/game.service";
import { NgFor } from '@angular/common';
import {RouterLink} from "@angular/router";
import {PlayerComponent} from "@app/components/player/player.component";
import {Account} from "@app/models/account";


@Component({
    selector: 'app-currentstatus',
    templateUrl: 'currentstatus.component.html',
    styleUrls: ['currentstatus.component.scss'],
    standalone: true,
  imports: [NgFor, RouterLink, PlayerComponent]
})

export class CurrentstatusComponent implements OnInit {
  accounts: Account[];
  allGames: any[];
  private accountId: '3';

  constructor(private accountService: AccountService, public gameService: GameService) {}

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
