export class Account {
  key: number;
  name: string;
  balance: number;
  flags: number;

  constructor(key: number, name: string, balance: number, flags: number) {
    this.name = name;
    this.key = key;
    this.balance = balance;
    this.flags = flags;
  }
}
