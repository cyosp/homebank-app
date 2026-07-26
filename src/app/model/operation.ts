import {Account} from "./account";
import {Category} from "./category";
import {Payee} from "./payee";

export class Operation {
  date: number;
  amount: number;
  balance: number = 0;
  account: Account;
  destinationAccount: Account | undefined;
  paymode: number | undefined;
  flags: number | undefined;
  payee: Payee | undefined;
  category: Category | undefined;
  wording: string | undefined;
  info: string | undefined;
  kxfer: number | undefined;

  constructor(date: number,
              amount: number,
              account: Account,
              destinationAccount: Account | undefined,
              paymode: number | undefined,
              flags: number | undefined,
              payee: Payee | undefined,
              category: Category | undefined,
              wording: string | undefined,
              info: string | undefined,
              kxfer: number | undefined) {
    this.date = date;
    this.amount = amount;
    this.account = account;
    this.destinationAccount = destinationAccount;
    this.paymode = paymode;
    this.flags = flags;
    this.payee = payee;
    this.category = category;
    this.wording = wording;
    this.info = info;
    this.kxfer = kxfer;
  }
}
