import {Injectable} from "@angular/core";
import {Payee} from "../model/payee";
import {getXpathResult, numberToXmlAttr, stringToXmlAttr, xmlAttrToNumber, xmlAttrToString} from "../utils";

@Injectable()
export class PayeeService {
  public load(homebankXmlDocument: XMLDocument) {
    let payees: Payee[] = [];
    let xmlPayees = getXpathResult(homebankXmlDocument, "/homebank/pay");
    let xmlPayee = xmlPayees.iterateNext();
    while (xmlPayee) {
      payees.push(this.loadPayee(homebankXmlDocument, xmlPayee));
      xmlPayee = xmlPayees.iterateNext();
    }
    return payees;
  }

  private loadPayee(homebankXmlDocument: XMLDocument, xmlPayee: Node): Payee {
    return new Payee(
      xmlAttrToNumber(homebankXmlDocument, xmlPayee, "key"),
      xmlAttrToString(homebankXmlDocument, xmlPayee, "name")
    );
  }

  private payeeToXml(payee: Payee): string {
    return "<pay"
      + numberToXmlAttr("key", payee.key)
      + stringToXmlAttr("name", payee.name)
      + "/>\n";
  }

  public toXml(payees: Payee[]): string {
    let xml = "";
    payees.forEach(payee => {
      xml += this.payeeToXml(payee);
    })
    return xml;
  }
}
