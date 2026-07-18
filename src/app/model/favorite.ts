import {Account} from "./account";
import {Category} from "./category";
import {Payee} from "./payee";

export class Favorite {
  key: number;
  amount: number;
  account: Account | undefined;
  destinationAccount: Account | undefined;
  paymode: number | undefined;
  payee: Payee | undefined;
  category: Category | undefined;
  recflg: number | undefined;
  nextdate: number | undefined;
  every: number;

  constructor(key: number,
              amount: number,
              account: Account | undefined,
              destinationAccount: Account | undefined,
              paymode: number | undefined,
              payee: Payee | undefined,
              category: Category | undefined,
              recflg: number | undefined,
              nextdate: number | undefined,
              every: number) {
    this.key = key;
    this.amount = amount;
    this.account = account;
    this.destinationAccount = destinationAccount;
    this.paymode = paymode;
    this.payee = payee;
    this.category = category;
    this.recflg = recflg;
    this.nextdate = nextdate;
    this.every = every;
  }
}
