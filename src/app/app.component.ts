import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import {Component} from '@angular/core';
import {AccountService} from "@app/_services/account.service";
import {Account} from "@app/models/account";
import { FooterComponent } from '@app/components/footer/footer.component';
import {RouterOutlet} from '@angular/router';
import { AlertComponent } from '@app/components/alert/alert.component';
import { MenuComponent } from '@app/components/menu/menu.component';


@Component({
    selector: 'app', templateUrl: 'app.component.html',
    standalone: true,
    imports: [MenuComponent, AlertComponent, RouterOutlet, FooterComponent]
})
export class AppComponent  implements OnInit {
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
