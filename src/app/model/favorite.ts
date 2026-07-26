import {Account} from "./account";
import {Category} from "./category";
import {Payee} from "./payee";

export class Favorite {
  key: number;
  amount: number;
  account: Account | undefined;
  destinationAccount: Account | undefined;
  paymode: number | undefined;
  flags: number | undefined;
  payee: Payee | undefined;
  category: Category | undefined;
  wording: string | undefined;
  recflg: number | undefined;
  nextdate: number | undefined;
  every: number;
  unit: number | undefined
  weekend: number | undefined
  limit: number | undefined

  constructor(key: number,
              amount: number,
              account: Account | undefined,
              destinationAccount: Account | undefined,
              paymode: number | undefined,
              flags: number | undefined,
              payee: Payee | undefined,
              category: Category | undefined,
              wording: string | undefined,
              recflg: number | undefined,
              nextdate: number | undefined,
              every: number,
              unit: number | undefined,
              weekend: number | undefined,
              limit: number | undefined) {
    this.key = key;
    this.amount = amount;
    this.account = account;
    this.destinationAccount = destinationAccount;
    this.paymode = paymode;
    this.flags = flags;
    this.payee = payee;
    this.category = category;
    this.wording = wording;
    this.recflg = recflg;
    this.nextdate = nextdate;
    this.every = every;
    this.unit = unit;
    this.weekend = weekend;
    this.limit = limit;
  }
}
