import { Component } from '@angular/core';
import {AccountService} from "@app/_services/account.service";
import { RouterLink } from '@angular/router';

@Component({
    templateUrl: 'details.component.html',
    standalone: true,
    imports: [RouterLink]
})
export class DetailsComponent {
account = this.accountService.accountValue;

constructor(private accountService: AccountService) { }
  }
