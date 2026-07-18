import {Injectable} from "@angular/core";
import {ensure, numberToXmlAttr, numberToXmlAttrWithResolution, stringToXmlAttr} from "../utils";
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

  private loadAccount(homebankXmlDocument: XMLDocument, xmlAccount: Node, currencies: Currency[]): Account {
    let key = homebankXmlDocument.evaluate("@key", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let pos = homebankXmlDocument.evaluate("@pos", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let currencyValue = homebankXmlDocument.evaluate("@curr", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let name = homebankXmlDocument.evaluate("@name", xmlAccount, null, XPathResult.STRING_TYPE, null).stringValue;
    let initial = homebankXmlDocument.evaluate("@initial", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let minimum = homebankXmlDocument.evaluate("@minimum", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let maximum = homebankXmlDocument.evaluate("@maximum", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let flags = homebankXmlDocument.evaluate("@flags", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    return new Account(key,
      pos,
      ensure(currencies.find(currency => currency.key === currencyValue)),
      name,
      initial,
      minimum,
      maximum,
      flags
    );
  }

  private accountToXml(accont: Account): string {
    return "<account"
      + numberToXmlAttr("key", accont.key)
      + numberToXmlAttr("pos", accont.pos)
      + numberToXmlAttrWithResolution("iso", accont.currency, accont.currency.key)
      + stringToXmlAttr("name", accont.name)
      + numberToXmlAttr("initial", accont.initial)
      + numberToXmlAttr("minimum", accont.minimum)
      + numberToXmlAttr("maximum", accont.maximum)
      + numberToXmlAttr("flags", accont.flags)
      + "/>";
  }

  public toXml(accounts: Account[]): string {
    let xml = "";
    accounts.forEach(account => {
      xml += this.accountToXml(account);
    })
    return xml;
  }
}
