import {Injectable} from "@angular/core";
import {ensure} from "../utils";
import {Currency} from "../model/currency";
import {Account} from "../model/account";

@Injectable()
export class AccountService {
  public load(homebankXmlDocument: XMLDocument, currencies: Currency[]) {
    let accounts = [];
    let xmlAccounts = homebankXmlDocument.evaluate("/homebank/account", homebankXmlDocument, null, XPathResult.ANY_TYPE, null);
    let xmlAccount = xmlAccounts.iterateNext();
    while (xmlAccount) {
      accounts.push(this.loadAccount(homebankXmlDocument, xmlAccount, currencies));
      xmlAccount = xmlAccounts.iterateNext();
    }
    return accounts;
  }

  private computeAmount(homebankXmlDocument: XMLDocument, key: number) {
    return homebankXmlDocument.evaluate(
      "sum(/homebank/account[@key='" + key + "']/@initial | /homebank/ope[@account='" + key + "']/@amount)",
      homebankXmlDocument,
      null,
      XPathResult.NUMBER_TYPE,
      null
    ).numberValue;
  }

  private loadAccount(homebankXmlDocument: XMLDocument, xmlAccount: Node, currencies: Currency[]): Account {
    let key = homebankXmlDocument.evaluate("@key", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let name = homebankXmlDocument.evaluate("@name", xmlAccount, null, XPathResult.STRING_TYPE, null).stringValue;
    let balance = this.computeAmount(homebankXmlDocument, key);
    let flags = homebankXmlDocument.evaluate("@flags", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let currencyValue = homebankXmlDocument.evaluate("@curr", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    return new Account(key, name, balance, flags, ensure(currencies.find(currency => currency.key === currencyValue)).iso);
  }
}
