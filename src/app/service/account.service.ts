import {Injectable} from "@angular/core";
import {
  ensure,
  getXpathResult,
  numberToXmlAttr,
  numberToXmlAttrWithResolution,
  stringToXmlAttr,
  xmlAttrToNumber,
  xmlAttrToNumberOrUndefined,
  xmlAttrToString
} from "../utils";
import {Currency} from "../model/currency";
import {Account} from "../model/account";

@Injectable()
export class AccountService {
  public load(homebankXmlDocument: XMLDocument, currencies: Map<number, Currency>) {
    let accounts = new Map<number, Account>;
    let xmlAccounts = getXpathResult(homebankXmlDocument, "/homebank/account");
    let xmlAccount = xmlAccounts.iterateNext();
    while (xmlAccount) {
      let account = this.loadAccount(homebankXmlDocument, xmlAccount, currencies)
      accounts.set(account.key, account);
      xmlAccount = xmlAccounts.iterateNext();
    }
    return accounts;
  }

  private loadAccount(homebankXmlDocument: XMLDocument, xmlAccount: Node, currencies: Map<number, Currency>): Account {
    return new Account(
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "key"),
      xmlAttrToNumberOrUndefined(homebankXmlDocument, xmlAccount, "flags"),
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "pos"),
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "type"),
      ensure(currencies.get(xmlAttrToNumber(homebankXmlDocument, xmlAccount, "curr"))),
      xmlAttrToString(homebankXmlDocument, xmlAccount, "name"),
      xmlAttrToString(homebankXmlDocument, xmlAccount, "bankname"),
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "initial"),
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "minimum"),
      xmlAttrToNumber(homebankXmlDocument, xmlAccount, "maximum"),
      xmlAttrToString(homebankXmlDocument, xmlAccount, "cheque1"),
      xmlAttrToString(homebankXmlDocument, xmlAccount, "cheque2"),
      xmlAttrToString(homebankXmlDocument, xmlAccount, "rdate"),
    );
  }

  private accountToXml(accont: Account): string {
    return "<account"
      + numberToXmlAttr("key", accont.key)
      + numberToXmlAttr("flags", accont.flags)
      + numberToXmlAttr("pos", accont.pos)
      + numberToXmlAttr("type", accont.type)
      + numberToXmlAttrWithResolution("curr", accont.currency, accont.currency.key)
      + stringToXmlAttr("name", accont.name)
      + stringToXmlAttr("bankname", accont.bankname)
      + numberToXmlAttr("initial", accont.initial)
      + numberToXmlAttr("minimum", accont.minimum)
      + numberToXmlAttr("maximum", accont.maximum)
      + stringToXmlAttr("cheque1", accont.cheque1)
      + stringToXmlAttr("cheque2", accont.cheque2)
      + stringToXmlAttr("rdate", accont.rdate)
      + "/>\n";
  }

  public toXml(accounts: Map<number, Account>): string {
    let xml = "";
    accounts.forEach(account => {
      xml += this.accountToXml(account);
    })
    return xml;
  }
}
