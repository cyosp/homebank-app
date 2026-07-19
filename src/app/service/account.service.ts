import {Injectable} from "@angular/core";
import {
  ensure,
  getXpathResult,
  numberToXmlAttr,
  numberToXmlAttrWithResolution,
  stringToXmlAttr,
  xmlAttrToNumber,
  xmlAttrToString
} from "../utils";
import {Currency} from "../model/currency";
import {Account} from "../model/account";

@Injectable()
export class AccountService {
  public load(homebankXmlDocument: XMLDocument, currencies: Currency[]) {
    let accounts = [];
    let xmlAccounts = getXpathResult(homebankXmlDocument, "/homebank/account");
    let xmlAccount = xmlAccounts.iterateNext();
    while (xmlAccount) {
      accounts.push(this.loadAccount(homebankXmlDocument, xmlAccount, currencies));
      xmlAccount = xmlAccounts.iterateNext();
    }
    return accounts;
  }

  private loadAccount(homebankXmlDocument: XMLDocument, xmlAccount: Node, currencies: Currency[]): Account {
    return new Account(
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "key"),
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "pos"),
      ensure(currencies.find(currency => currency.key === xmlAttrToNumber(homebankXmlDocument, xmlAccount, "curr"))),
      xmlAttrToString(homebankXmlDocument, xmlAccount, "name"),
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "initial"),
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "minimum"),
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "maximum"),
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "flags")
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
      + "/>\n";
  }

  public toXml(accounts: Account[]): string {
    let xml = "";
    accounts.forEach(account => {
      xml += this.accountToXml(account);
    })
    return xml;
  }
}
