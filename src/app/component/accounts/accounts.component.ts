import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedDataService} from "../../service/shared-data.service";
import {Account} from "../../model/account";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: Account[] | null;

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
    return (account.flags & hideAccountFromSummaryFlag) != hideAccountFromSummaryFlag;
  }

  get displayableAccounts() {
    return this.accounts?.filter(account => this.isDisplayable(account));
  }

  ngOnDestroy(): void {
    this.accounts = null;
  }
}
