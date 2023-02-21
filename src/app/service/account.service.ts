import {Injectable} from "@angular/core";
import {Account} from "../model/account";

@Injectable()
export class AccountService {
  load(homebankXmlDocument: XMLDocument, xmlAccount: Node): Account {
    let key = homebankXmlDocument.evaluate("@key", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let name = homebankXmlDocument.evaluate("@name", xmlAccount, null, XPathResult.STRING_TYPE, null).stringValue;
    let balance = this.computeAmount(homebankXmlDocument, key);
    let flags = homebankXmlDocument.evaluate("@flags", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    return new Account(key, name, balance, flags);
  }

  computeAmount(homebankXmlDocument: XMLDocument, key: number) {
    return homebankXmlDocument.evaluate(
      "sum(/homebank/ope[@account='" + key + "']/@amount)",
      homebankXmlDocument,
      null,
      XPathResult.NUMBER_TYPE,
      null
    ).numberValue;
  }

  isDisplayable(account: Account): boolean {
    const hideAccountFromSummaryFlag = 16;
    return (account.flags & hideAccountFromSummaryFlag) != hideAccountFromSummaryFlag;
  }
}
