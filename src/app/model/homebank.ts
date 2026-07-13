import {Currency} from "./currency";
import {Account} from "./account";
import {Payee} from "./payee";
import {Category} from "./category";
import {Operation} from "./operation";

export class Homebank {
  currencies: Currency[];
  accounts: Account[];
  payees: Payee[];
  categories: Category[];
  operations: Operation[];

  constructor(currencies: Currency[],
              accounts: Account[],
              payees: Payee[],
              categories: Category[],
              operations: Operation[]) {
    this.currencies = currencies;
    this.accounts = accounts;
    this.payees = payees;
    this.categories = categories;
    this.operations = operations;
  }
}
