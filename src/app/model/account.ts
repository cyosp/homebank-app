import {Operation} from "./operation";
import {Currency} from "./currency";

export class Account {
  key: number;
  flags: number | undefined;
  pos: number;
  type: number;
  currency: Currency;
  name: string;
  bankname: string;
  initial: number;
  balance: number;
  minimum: number;
  maximum: number;
  cheque1: string | undefined
  cheque2: string | undefined;
  rdate: string | undefined;

  operations: Operation[] = [];

  constructor(key: number,
              flags: number | undefined,
              pos: number,
              type: number,
              currency: Currency,
              name: string,
              bankname: string,
              initial: number,
              minimum: number,
              maximum: number,
              cheque1: string,
              cheque2: string,
              rdate: string
              ) {
    this.key = key;
    this.flags = flags;
    this.pos = pos;
    this.type = type;
    this.currency = currency;
    this.name = name;
    this.bankname = bankname;
    this.initial = initial;
    this.balance = this.initial;
    this.minimum = minimum;
    this.maximum = maximum;
    this.cheque1 = cheque1;
    this.cheque2 = cheque2;
    this.rdate = rdate;
  }
}
