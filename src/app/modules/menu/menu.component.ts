import {Component} from '@angular/core';
import {Account} from "@app/_models/account";
import {AccountService} from "@app/_services/account.service";
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink]
})


export class MenuComponent {
  account: Account;
  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe(x => this.account = x);
  }

  logout() {
    this.accountService.logout();
  }
}
