import {Injectable} from "@angular/core";
import {Payee} from "../model/payee";
import {numberToXmlAttr, stringToXmlAttr} from "../utils";

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

  private loadPayee(homebankXmlDocument: XMLDocument, xmlPayee: Node): Payee {
    let key = homebankXmlDocument.evaluate("@key", xmlPayee, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let name = homebankXmlDocument.evaluate("@name", xmlPayee, null, XPathResult.STRING_TYPE, null).stringValue;
    return new Payee(key, name);
  }

  private payeeToXml(payee: Payee): string {
    return "<pay"
      + numberToXmlAttr("key", payee.key)
      + stringToXmlAttr("name", payee.name)
      + "/>";
  }

  public toXml(payees: Payee[]): string {
    let xml = "";
    payees.forEach(payee => {
      xml += this.payeeToXml(payee);
    })
    return xml;
  }
}
