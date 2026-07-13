import {Currency} from "./currency";
import {Account} from "./account";
import {Payee} from "./payee";
import {Category} from "./category";

export class Homebank {
  currencies: Currency[];
  payees: Payee[];
  categories: Category[];
  accounts: Account[];

  constructor(currencies: Currency[], payees: Payee[], categories: Category[], accounts: Account[]) {
    this.currencies = currencies;
    this.payees = payees;
    this.categories = categories;
    this.accounts = accounts;
  }
}
