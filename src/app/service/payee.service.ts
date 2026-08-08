import {Injectable} from "@angular/core";
import {Payee} from "../model/payee";
import {getXpathResult, numberToXmlAttr, stringToXmlAttr, xmlAttrToNumber, xmlAttrToString} from "../utils";

@Injectable()
export class PayeeService {
  public load(homebankXmlDocument: XMLDocument) {
    let payees = new Map<number, Payee>();
    let xmlPayees = getXpathResult(homebankXmlDocument, "/homebank/pay");
    let xmlPayee = xmlPayees.iterateNext();
    while (xmlPayee) {
      let payee = this.loadPayee(homebankXmlDocument, xmlPayee);
      payees.set(payee.key, payee);
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

  public toXml(payees: Map<number, Payee>): string {
    let xml = "";
    payees.forEach(payee => {
      xml += this.payeeToXml(payee);
    })
    return xml;
  }

  private addNew(payees: Map<number, Payee>, value: string): Payee {
    let maxKey = [...payees.keys()]
      .reduce((key1, key2) => key1 < key2 ? key2 : key1);
    let newKey = maxKey + 1;
    return payees.set(newKey, new Payee(newKey, value)).get(newKey)!;
  }

  public getOrAdd(payees: Map<number, Payee>, value: string): Payee {
    return [...payees.values()].find((payee: Payee) => payee.name === value) || this.addNew(payees, value);
  }
}
