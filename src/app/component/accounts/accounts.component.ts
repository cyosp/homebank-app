import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedDataService} from "../../service/shared-data.service";
import {Account} from "../../model/account";
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.sass'],
    standalone: true,
    imports: [NgIf, NgFor, RouterLink, CurrencyPipe]
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: Map<number, Account> | null;

  constructor(private sharedDataService: SharedDataService) {
    this.accounts = null;
  }

  ngOnInit(): void {
    this.sharedDataService.getHomebank().subscribe(homebank => {
      this.accounts = homebank.accounts;
    });
  }

  isDisplayable(account: Account): boolean {
    const hideAccountFromSummaryFlag = 16;
    return account.flags === undefined || isNaN(account.flags) || (account.flags & hideAccountFromSummaryFlag) != hideAccountFromSummaryFlag;
  }

  get displayableAccounts() {
    let localAccounts: Account[] = [];
    this.accounts?.forEach((account: Account) => {
      localAccounts.push(account);
    })
    return localAccounts
      .sort((a1, a2) => a1.pos - a2.pos)
      .filter(account => this.isDisplayable(account));
  }

  ngOnDestroy(): void {
    this.accounts = null;
  }
}
