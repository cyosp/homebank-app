import {Currency} from "./currency";
import {Account} from "./account";
import {Payee} from "./payee";
import {Category} from "./category";
import {Operation} from "./operation";
import {Property} from "./property";
import {Favorite} from "./favorite";

export class Homebank {
  v: number;
  d: string;
  currencies: Map<number, Currency>;
  property: Property;
  accounts: Map<number, Account>;
  payees: Map<number, Payee>;
  categories: Map<number, Category>;
  favorites: Map<number, Favorite>;
  operations: Operation[];

  constructor(v: number,
              d: string,
              currencies: Map<number, Currency>,
              property: Property,
              accounts: Map<number, Account>,
              payees: Map<number, Payee>,
              categories: Map<number, Category>,
              favorites: Map<number, Favorite>,
              operations: Operation[]) {
    this.v = v;
    this.d = d;
    this.currencies = currencies;
    this.property = property;
    this.accounts = accounts;
    this.payees = payees;
    this.categories = categories;
    this.favorites = favorites;
    this.operations = operations;
  }
}
