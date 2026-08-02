import {Injectable} from "@angular/core";
import {Category} from "../model/category";
import {
  ensure,
  getXpathResult,
  numberToXmlAttr,
  numberToXmlAttrWithResolution,
  stringToXmlAttr,
  xmlAttrToNumber, xmlAttrToNumberOrUndefined,
  xmlAttrToString
} from "../utils";
import {Payee} from "../model/payee";
import {Operation} from "../model/operation";
import {Account} from "../model/account";

@Injectable()
export class OperationService {
  public load(homebankXmlDocument: XMLDocument, accounts: Map<number, Account>, payees: Map<number, Payee>, categories: Map<number, Category>) {
    let operations: Operation[] = [];
    let xmlOperations = getXpathResult(homebankXmlDocument, "/homebank/ope");
    let xmlOperation = xmlOperations.iterateNext();
    while (xmlOperation) {
      operations.push(this.loadOperation(homebankXmlDocument, xmlOperation, accounts, payees, categories));
      xmlOperation = xmlOperations.iterateNext();
    }
    return operations;
  }

  private loadOperation(homebankXmlDocument: XMLDocument, xmlOperation: Node, accounts: Map<number, Account>, payees: Map<number, Payee>, categories: Map<number, Category>): Operation {
    return new Operation(
      xmlAttrToNumber(homebankXmlDocument, xmlOperation, "date"),
      xmlAttrToNumber(homebankXmlDocument, xmlOperation, "amount"),
      ensure(accounts.get(xmlAttrToNumber(homebankXmlDocument, xmlOperation, "account"))),
      accounts.get(xmlAttrToNumber(homebankXmlDocument, xmlOperation, "dst_account")),
      xmlAttrToNumberOrUndefined(homebankXmlDocument, xmlOperation, "paymode"),
      xmlAttrToNumberOrUndefined(homebankXmlDocument, xmlOperation, "flags"),
      payees.get(xmlAttrToNumber(homebankXmlDocument, xmlOperation, "payee")),
      categories.get(xmlAttrToNumber(homebankXmlDocument, xmlOperation, "category")),
      xmlAttrToString(homebankXmlDocument, xmlOperation, "wording"),
      xmlAttrToString(homebankXmlDocument, xmlOperation, "info"),
      xmlAttrToNumber(homebankXmlDocument, xmlOperation, "kxfer"));
  }

  private operationToXml(operation: Operation): string {
    return "<ope"
      + numberToXmlAttr("date", operation.date)
      + numberToXmlAttr("amount", operation.amount)
      + numberToXmlAttrWithResolution("account", operation.account, operation.account?.key)
      + numberToXmlAttrWithResolution("dst_account", operation.destinationAccount, operation.destinationAccount?.key)
      + numberToXmlAttr("paymode", operation.paymode)
      + numberToXmlAttr("flags", operation.flags)
      + numberToXmlAttrWithResolution("payee", operation.payee, operation.payee?.key)
      + numberToXmlAttrWithResolution("category", operation.category, operation.category?.key)
      + stringToXmlAttr("wording", operation.wording)
      + stringToXmlAttr("info", operation.info)
      + numberToXmlAttr("kxfer", operation.kxfer)
      + "/>\n";
  }

  public toXml(operations: Operation[]): string {
    let xml = "";
    operations.forEach(operation => {
      xml += this.operationToXml(operation);
    })
    return xml;
  }
}
