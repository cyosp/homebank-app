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

enum PaymentMode {
  CREDIT_CARD = 1,
  CHECK = 2,
  CASH = 3,
  BANK_TRANSFER = 4,
  DEBIT_CARD = 6,
  STANDING_ORDER = 7,
  ELECTRONIC_PAYMENT = 8,
  DEPOSIT = 9,
  FI_FEE = 10,
  DIRECT_DEBIT = 11,
  MOBILE_PHONE = 12
}

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
  addOperationPaymentMode: number | undefined;
  addOperationPayee: string | undefined;
  addOperationCategory: string | undefined;
  addOperationWording: string | undefined;
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
      this.addOperationPaymentMode,
      this.addOperationPayee,
      this.addOperationCategory,
      this.addOperationWording,
      this.addOperationAmount);
    this.setOperations(account);
  }

  getPaymentModeImageUrlPath(paymode: number | undefined): string {
    return "assets/homebank/payment-mode/" + this.getPaymentModeFile(paymode);
  }

  getPaymentModeFile(paymode: number | undefined): string {
    switch (paymode) {
      case undefined:
        return "hb-pm-none.svg";
      case PaymentMode.CREDIT_CARD:
        return "hb-pm-ccard.svg";
      case PaymentMode.CHECK:
        return "hb-pm-check.svg";
      case PaymentMode.CASH:
        return "hb-pm-cash.svg";
      case PaymentMode.BANK_TRANSFER:
        return "hb-pm-transfer.svg";
      case PaymentMode.DEBIT_CARD:
        return "hb-pm-dcard.svg";
      case PaymentMode.STANDING_ORDER:
        return "hb-pm-standingorder.svg";
      case PaymentMode.ELECTRONIC_PAYMENT:
        return "hb-pm-epayment.svg";
      case PaymentMode.DEPOSIT:
        return "hb-pm-deposit.svg";
      case PaymentMode.FI_FEE:
        return "hb-pm-fifee.svg";
      case PaymentMode.DIRECT_DEBIT:
        return "hb-pm-directdebit.svg";
      case PaymentMode.MOBILE_PHONE:
        return "hb-pm-mobphone.svg";
      default:
        return String(paymode);
    }
  }

  defaultPaymentModeName(paymode: number | undefined): string {
    switch (paymode) {
      case undefined:
        return "";
      case PaymentMode.CREDIT_CARD:
        return "Credit card";
      case PaymentMode.CHECK:
        return "Check";
      case PaymentMode.CASH:
        return "Cash";
      case PaymentMode.BANK_TRANSFER:
        return "Bank transfer";
      case PaymentMode.DEBIT_CARD:
        return "Debit card";
      case PaymentMode.STANDING_ORDER:
        return "Standing order";
      case PaymentMode.ELECTRONIC_PAYMENT:
        return "Electronic payment";
      case PaymentMode.DEPOSIT:
        return "Deposit";
      case PaymentMode.FI_FEE:
        return "FI fee";
      case PaymentMode.DIRECT_DEBIT:
        return "Direct debit";
      case PaymentMode.MOBILE_PHONE:
        return "Mobile phone";
      default:
        return String(paymode);
    }
  }

  getPaymentModes(): (number | undefined)[] {
    return [
      undefined,
      PaymentMode.CREDIT_CARD,
      PaymentMode.CHECK,
      PaymentMode.CASH,
      PaymentMode.BANK_TRANSFER,
      PaymentMode.DEBIT_CARD,
      PaymentMode.STANDING_ORDER,
      PaymentMode.ELECTRONIC_PAYMENT,
      PaymentMode.DEPOSIT,
      PaymentMode.FI_FEE,
      PaymentMode.DIRECT_DEBIT,
      PaymentMode.MOBILE_PHONE
    ]
  }

  setAddOperationPaymentMode(paymentMode: number | undefined) {
    this.addOperationPaymentMode = paymentMode;
  }

  ngOnDestroy(): void {
    this.operations = null;
  }
}
