import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import {Component} from '@angular/core';
import {AccountService} from "@app/_services/account.service";
import {Role} from "@app/_models/role";
import {Account} from "@app/_models/account";


@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent  implements OnInit {
  Role = Role;
  account: Account;
  title: "test";

  ngOnInit(): void {
    initFlowbite();
  }

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe(x => this.account = x);
  }

  logout() {
    this.accountService.logout();
  }
}
