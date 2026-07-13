import {Account} from "./account";
import {Category} from "./category";
import {Payee} from "./payee";

export class Operation {
  date: number;
  amount: number;
  account: Account;
  payee: Payee | undefined;
  category: Category | undefined;
  flags: number | undefined;
  destinationAccount: Account | undefined;
  kxfer: number | undefined;

  constructor(date: number,
              amount: number,
              account: Account,
              payee: Payee | undefined,
              category: Category | undefined,
              flags: number | undefined,
              destinationAccount: Account | undefined,
              kxfer: number | undefined) {
    this.date = date;
    this.amount = amount;
    this.account = account;
    this.payee = payee;
    this.category = category;
    this.flags = flags;
    this.destinationAccount = destinationAccount;
    this.kxfer = kxfer;
  }
}
