export class Account {
  name: string;
  position: number;
  balance: number;
  flags: number;

  constructor(name: string, position: number, balance: number, flags: number) {
    this.name = name;
    this.position = position;
    this.balance = balance;
    this.flags = flags;
  }
}
