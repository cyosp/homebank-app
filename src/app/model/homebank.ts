import {Currency} from "./currency";
import {Account} from "./account";

export class Homebank {
  currencies: Currency[];
  accounts: Account[];

  constructor(currencies: Currency[], accounts: Account[]) {
    this.currencies = currencies;
    this.accounts = accounts;
  }
}
