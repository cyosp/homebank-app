import {Injectable} from "@angular/core";
import {Account} from "../model/account";

@Injectable()
export class AccountService {
  load(homebankXmlDocument: XMLDocument, xmlAccount: Node, position: number): Account {
    let name = homebankXmlDocument.evaluate("@name", xmlAccount, null, XPathResult.STRING_TYPE, null).stringValue;
    let balance = this.computeAmount(homebankXmlDocument, position);
    let flags = homebankXmlDocument.evaluate("@flags", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    return new Account(name, position, balance, flags);
  }

  computeAmount(homebankXmlDocument: XMLDocument, position: number) {
    return homebankXmlDocument.evaluate(
      "sum(/homebank/ope[@account='" + position + "']/@amount)",
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
