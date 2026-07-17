import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedDataService} from "../../service/shared-data.service";
import {ActivatedRoute} from "@angular/router";
import {Operation} from "../../model/operation";
import {Homebank} from "../../model/homebank";
import {ensure} from "../../utils";
import {Account} from "../../model/account";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.sass']
})
export class OperationsComponent implements OnInit, OnDestroy {
  private DAYS_BETWEEN_JC_AND_FIRST_JANUARY_1970 = 719163;
  private DAY_TO_MILLISECONDS = 24 * 60 * 60 * 1000;

  private homebank: Homebank | null;
  operations: Operation[] | null;

  constructor(private route: ActivatedRoute,
              private sharedDataService: SharedDataService) {
    this.homebank = null;
    this.operations = null;
  }

  ngOnInit(): void {
    this.sharedDataService.getHomebank().subscribe(homebank => {
      this.homebank = homebank;
    });

    this.route.params.subscribe(params => {
      let accountId = Number(params["accountId"]);
      this.setTitle(accountId)
      this.setOperations(accountId);
    });
  }

  private getAccount(accountId: number): Account | null {
    if (this.homebank) {
      return ensure(this.homebank.accounts.find(account => {
        return account.key === accountId;
      }));
    }
    return null;
  }

  private setTitle(accountId: number): void {
    let account = this.getAccount(accountId);
    if (account) {
      this.sharedDataService.setTitle(this.homebank?.property.title + " / " + account.name);
    }
  }

  private setOperations(accountId: number) {
    let account = this.getAccount(accountId);
    if (account) {
      this.operations = account.operations
        .sort((a1, a2) => a2.date - a1.date) // Reverse order
        .slice(0, 500); // Keep only 500 first elements
    }
  }

  dateToGregorian(date: number): Date {
    return new Date((date - this.DAYS_BETWEEN_JC_AND_FIRST_JANUARY_1970) * this.DAY_TO_MILLISECONDS);
  }

  ngOnDestroy(): void {
    this.operations = null;
  }
}
