import { Component } from '@angular/core';
import {AccountService} from "@app/_services/account.service";
import { NgIf } from '@angular/common';

@Component({
    templateUrl: 'home.component.html',
    standalone: true,
    imports: [NgIf]
})
export class HomeComponent {
  account = this.accountService.accountValue;

  constructor(private accountService: AccountService) { }
}
