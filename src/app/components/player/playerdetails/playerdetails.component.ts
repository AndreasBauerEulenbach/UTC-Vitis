import {Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Account} from "@app/models/account";
import {AccountService} from "@app/_services/account.service";
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-playerdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playerdetails.component.html',
  styleUrl: './playerdetails.component.scss'
})
export class PlayerdetailsComponent {
  private $player: Observable<Account>;
  player: Account;
  private routeSub: Subscription;
  private accountService = inject(AccountService);


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    const playerId = this.route.snapshot.paramMap.get('playerid');
    this.$player = this.accountService.getById(playerId);
    this.$player.subscribe(account => this.player = account);
    console.log(this.player);
  }
}
