export class Account {
  key: number;
  name: string;
  balance: number;
  flags: number;
  currencyIso: string;

  constructor(key: number, name: string, balance: number, flags: number, currencyIso: string) {
    this.name = name;
    this.key = key;
    this.balance = balance;
    this.flags = flags;
    this.currencyIso = currencyIso;
  }
}
