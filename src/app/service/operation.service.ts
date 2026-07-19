import {Injectable} from "@angular/core";
import {Category} from "../model/category";
import {
  ensure,
  getXpathResult,
  numberToXmlAttr,
  numberToXmlAttrWithResolution,
  stringToXmlAttr,
  xmlAttrToNumber,
  xmlAttrToString
} from "../utils";
import {Payee} from "../model/payee";
import {Operation} from "../model/operation";
import {Account} from "../model/account";

@Injectable()
export class OperationService {
  public load(homebankXmlDocument: XMLDocument, accounts: Account[], payees: Payee[], categories: Category[]) {
    let operations: Operation[] = [];
    let xmlOperations = getXpathResult(homebankXmlDocument, "/homebank/ope");
    let xmlOperation = xmlOperations.iterateNext();
    while (xmlOperation) {
      operations.push(this.loadOperation(homebankXmlDocument, xmlOperation, accounts, payees, categories));
      xmlOperation = xmlOperations.iterateNext();
    }
    return operations;
  }

  private loadOperation(homebankXmlDocument: XMLDocument, xmlOperation: Node, accounts: Account[], payees: Payee[], categories: Category[]): Operation {
    return new Operation(
      xmlAttrToNumber(homebankXmlDocument, xmlOperation, "date"),
      xmlAttrToNumber(homebankXmlDocument, xmlOperation, "amount"),
      ensure(accounts.find(account => account.key === xmlAttrToNumber(homebankXmlDocument, xmlOperation, "account"))),
      payees.find(payee => payee.key === xmlAttrToNumber(homebankXmlDocument, xmlOperation, "payee")),
      categories.find(category => category.key === xmlAttrToNumber(homebankXmlDocument, xmlOperation, "category")),
      xmlAttrToString(homebankXmlDocument, xmlOperation, "wording"),
      xmlAttrToNumber(homebankXmlDocument, xmlOperation, "flags"),
      accounts.find(account => account.key === xmlAttrToNumber(homebankXmlDocument, xmlOperation, "dst_account")),
      xmlAttrToNumber(homebankXmlDocument, xmlOperation, "kxfer"));
  }

  private operationToXml(operation: Operation): string {
    return "<ope"
      + numberToXmlAttr("date", operation.date)
      + numberToXmlAttr("amount", operation.amount)
      + numberToXmlAttrWithResolution("account", operation.account, operation.account?.key)
      + numberToXmlAttrWithResolution("payee", operation.payee, operation.payee?.key)
      + numberToXmlAttrWithResolution("category", operation.category, operation.category?.key)
      + stringToXmlAttr("wording", operation.wording)
      + numberToXmlAttr("flags", operation.flags)
      + numberToXmlAttrWithResolution("dst_account", operation.destinationAccount, operation.destinationAccount?.key)
      + numberToXmlAttr("kxfer", operation.kxfer)
      + "/>";
  }

  public toXml(operations: Operation[]): string {
    let xml = "";
    operations.forEach(operation => {
      xml += this.operationToXml(operation);
    })
    return xml;
  }
}
