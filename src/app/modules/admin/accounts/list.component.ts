import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {AccountService} from "@app/_services/account.service";
import { RouterLink } from '@angular/router';
import {DatePipe, NgFor, NgIf} from '@angular/common';
import {pipe} from "rxjs";

@Component({
    templateUrl: 'list.component.html',
    standalone: true,
    imports: [NgFor, RouterLink, NgIf]
})
export class ListComponent implements OnInit {
    accounts: any[];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAllAccounts("")
            .pipe(first())
            .subscribe(accounts => this.accounts = accounts);
    }

    deleteAccount(id: string) {
        const account = this.accounts.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.deleteAccount(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id)
            });
    }

    getFormattedDate(date: string) {
      return new DatePipe('de-DE').transform(new Date(date), 'longDate');
    }
}
