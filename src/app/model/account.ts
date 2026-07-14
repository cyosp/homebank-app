import {Operation} from "./operation";

export class Account {
  key: number;
  pos: number;
  currencyIso: string;
  name: string;
  initial: number;
  balance: number;
  minimum: number;
  maximum: number;
  flags: number;

  operations: Operation[] = [];

  constructor(key: number,
              pos: number,
              currencyIso: string,
              name: string,
              initial: number,
              minimum: number,
              maximum: number,
              flags: number
              ) {
    this.key = key;
    this.pos = pos;
    this.currencyIso = currencyIso;
    this.name = name;
    this.initial = initial;
    this.balance = this.initial;
    this.minimum = minimum;
    this.maximum = maximum;
    this.flags = flags;
  }
}
