import {Currency} from "./currency";
import {Account} from "./account";
import {Payee} from "./payee";

export class Homebank {
  currencies: Currency[];
  payees: Payee[];
  accounts: Account[];

  constructor(currencies: Currency[], payees: Payee[], accounts: Account[]) {
    this.currencies = currencies;
    this.payees = payees;
    this.accounts = accounts;
  }
}
