import {Injectable} from "@angular/core";
import {Payee} from "../model/payee";

@Injectable()
export class PayeeService {
  public load(homebankXmlDocument: XMLDocument) {
    let payees: Payee[] = [];
    let xmlPayees = homebankXmlDocument.evaluate("/homebank/pay", homebankXmlDocument, null, XPathResult.ANY_TYPE, null);
    let xmlPayee = xmlPayees.iterateNext();
    while (xmlPayee) {
      payees.push(this.loadPayee(homebankXmlDocument, xmlPayee));
      xmlPayee = xmlPayees.iterateNext();
    }
    return payees;
  }

  private loadPayee(homebankXmlDocument: XMLDocument, xmlCurrency: Node): Payee {
    let key = homebankXmlDocument.evaluate("@key", xmlCurrency, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let name = homebankXmlDocument.evaluate("@name", xmlCurrency, null, XPathResult.STRING_TYPE, null).stringValue;
    return new Payee(key, name);
  }
}
