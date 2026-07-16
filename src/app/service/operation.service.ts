import {Injectable} from "@angular/core";
import {Category} from "../model/category";
import {ensure} from "../utils";
import {Payee} from "../model/payee";
import {Operation} from "../model/operation";
import {Account} from "../model/account";

@Injectable()
export class OperationService {
  public load(homebankXmlDocument: XMLDocument, accounts: Account[], payees: Payee[], categories: Category[]) {
    let operations: Operation[] = [];
    let xmlOperations = homebankXmlDocument.evaluate("/homebank/ope", homebankXmlDocument, null, XPathResult.ANY_TYPE, null);
    let xmlOperation = xmlOperations.iterateNext();
    while (xmlOperation) {
      operations.push(this.loadOperation(homebankXmlDocument, xmlOperation, accounts, payees, categories));
      xmlOperation = xmlOperations.iterateNext();
    }
    return operations;
  }

  private loadOperation(homebankXmlDocument: XMLDocument, xmlOperation: Node, accounts: Account[], payees: Payee[], categories: Category[]): Operation {
    let date = homebankXmlDocument.evaluate("@date", xmlOperation, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let amount = homebankXmlDocument.evaluate("@amount", xmlOperation, null, XPathResult.NUMBER_TYPE, null).numberValue;

    let accountValue = homebankXmlDocument.evaluate("@account", xmlOperation, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let account = ensure(accounts.find(account => account.key === accountValue));

    let payeeValue = homebankXmlDocument.evaluate("@payee", xmlOperation, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let payee = payees.find(payee => payee.key === payeeValue);

    let categoryValue = homebankXmlDocument.evaluate("@category", xmlOperation, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let category = categories.find(category => category.key === categoryValue);
    let flags = homebankXmlDocument.evaluate("@flags", xmlOperation, null, XPathResult.NUMBER_TYPE, null).numberValue;

    let wording = homebankXmlDocument.evaluate("@wording", xmlOperation, null, XPathResult.STRING_TYPE, null).stringValue;

    let dstAccountValue = homebankXmlDocument.evaluate("@dst_account", xmlOperation, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let destinationAccount = accounts.find(account => account.key === dstAccountValue);

    let kxfer = homebankXmlDocument.evaluate("@kxfer", xmlOperation, null, XPathResult.NUMBER_TYPE, null).numberValue;

    return new Operation(date, amount, account, payee, category, wording, flags, destinationAccount, kxfer);
  }
}
