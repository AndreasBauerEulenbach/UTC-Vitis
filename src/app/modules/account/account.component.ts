import { Component } from '@angular/core';
import {Router, RouterOutlet, Routes} from '@angular/router';
import {AccountService} from "@app/_services/account.service";

@Component({
    templateUrl: 'account.component.html',
    standalone: true,
    imports: [RouterOutlet]
})
export class AccountComponent {
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    // redirect to home if already logged in
    if (this.accountService.accountValue) {
      this.router.navigate(['/']);
    }
  }
}
