import {Currency} from "./currency";
import {Account} from "./account";
import {Payee} from "./payee";
import {Category} from "./category";
import {Operation} from "./operation";
import {Property} from "./property";

export class Homebank {
  currencies: Currency[];
  property: Property;
  accounts: Account[];
  payees: Payee[];
  categories: Category[];
  operations: Operation[];

  constructor(currencies: Currency[],
              property: Property,
              accounts: Account[],
              payees: Payee[],
              categories: Category[],
              operations: Operation[]) {
    this.currencies = currencies;
    this.property = property;
    this.accounts = accounts;
    this.payees = payees;
    this.categories = categories;
    this.operations = operations;
  }
}
