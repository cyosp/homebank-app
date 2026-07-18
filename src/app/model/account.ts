import {Operation} from "./operation";
import {Currency} from "./currency";

export class Account {
  key: number;
  pos: number;
  currency: Currency;
  name: string;
  initial: number;
  balance: number;
  minimum: number;
  maximum: number;
  flags: number;

  operations: Operation[] = [];

  constructor(key: number,
              pos: number,
              currency: Currency,
              name: string,
              initial: number,
              minimum: number,
              maximum: number,
              flags: number
              ) {
    this.key = key;
    this.pos = pos;
    this.currency = currency;
    this.name = name;
    this.initial = initial;
    this.balance = this.initial;
    this.minimum = minimum;
    this.maximum = maximum;
    this.flags = flags;
  }
}
