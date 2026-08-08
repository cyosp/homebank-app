import {Component, OnDestroy, OnInit} from '@angular/core';
import {SharedDataService} from "../../service/shared-data.service";
import {ActivatedRoute} from "@angular/router";
import {Operation} from "../../model/operation";
import {Homebank} from "../../model/homebank";
import {ensure} from "../../utils";
import {Account} from "../../model/account";
import {CurrencyPipe, DatePipe, NgClass, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HomebankService} from "../../service/homebank.service";
import {OperationService} from "../../service/operation.service";

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.sass'],
  standalone: true,
  imports: [NgIf, NgFor, NgClass, FormsModule, CurrencyPipe, DatePipe]
})
export class OperationsComponent implements OnInit, OnDestroy {
  private homebank: Homebank | null;
  account: Account | null;
  operations: Operation[] | null;

  addOperationDate: string = this.formatDate(new Date);
  addOperationPayee: string = "";
  addOperationCategory: string = "";
  addOperationWording: string = "";
  addOperationAmount: number = 0;

  constructor(private route: ActivatedRoute,
              private sharedDataService: SharedDataService,
              private operationService: OperationService,
              private homebankService: HomebankService) {
    this.homebank = null;
    this.account = null;
    this.operations = null;
  }

  private on2Digits(value: number): string {
    return value.toString().padStart(2, '0');
  }

  formatDate(date: Date): string {
    return date.getFullYear() + "-" + this.on2Digits(date.getMonth() + 1) + "-" + this.on2Digits(date.getDate());
  }

  ngOnInit(): void {
    this.sharedDataService.getHomebank().subscribe(homebank => {
      this.homebank = homebank;
    });

    this.route.params.subscribe(params => {
      let accountId = Number(params["accountId"]);
      this.account = this.getAccount(accountId);
      if (this.account) {
        this.setTitle(this.account)
        this.setOperations(this.account);
      }
    });
  }

  private getAccount(accountId: number): Account | null {
    if (this.homebank) {
      return ensure(this.homebank.accounts.get(accountId));
    }
    return null;
  }

  private setTitle(account: Account): void {
    this.sharedDataService.setTitle(this.homebank?.property.title + " / " + account.name);
  }

  private setOperations(account: Account) {
    let balance = account.balance;
    this.operations = account.operations
      .sort((operation1, operation2) => operation2.date - operation1.date) // Reverse order
      .map(operation => {
        operation.balance = balance;
        balance -= operation.amount;
        return operation;
      })
      .slice(0, 500); // Keep only 500 first elements
  }

  isInFuture(date: number): boolean {
    return this.operationService.dateToGregorian(date).getTime() > new Date().getTime();
  }

  dateToGregorian(date: number): Date {
    return this.operationService.dateToGregorian(date);
  }

  add() {
    let account = this.account!;
    this.homebankService.addOperation(
      account,
      this.addOperationDate,
      this.addOperationPayee,
      this.addOperationCategory,
      this.addOperationWording,
      this.addOperationAmount);
    this.setOperations(account);
  }

  ngOnDestroy(): void {
    this.operations = null;
  }
}
