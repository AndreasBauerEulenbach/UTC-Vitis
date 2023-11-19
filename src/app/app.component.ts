import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import {Component} from '@angular/core';
import {AccountService} from "@app/_services/account.service";
import {Role} from "@app/_models/role";
import {Account} from "@app/_models/account";
import { FooterComponent } from './modules/footer/footer.component';
import {RouterOutlet} from '@angular/router';
import { AlertComponent } from './_components/alert.component';
import { MenuComponent } from './modules/menu/menu.component';


@Component({
    selector: 'app', templateUrl: 'app.component.html',
    standalone: true,
    imports: [MenuComponent, AlertComponent, RouterOutlet, FooterComponent]
})
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
