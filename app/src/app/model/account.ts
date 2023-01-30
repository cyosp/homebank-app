export class Account {
  name: string;
  position: number;
  amount: number;
  flags: number;

  constructor(name: string, position: number, amount: number, flags: number) {
    this.name = name;
    this.position = position;
    this.amount = amount;
    this.flags = flags;
  }
}
