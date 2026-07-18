import {Injectable} from "@angular/core";
import {ensure, numberToXmlAttr, numberToXmlAttrWithResolution, stringToXmlAttr} from "../utils";
import {Currency} from "../model/currency";
import {Property} from "../model/property";

@Injectable()
export class PropertiesService {
  public load(homebankXmlDocument: XMLDocument, currencies: Currency[]) {
    let properties = [];
    let xmlProperties = homebankXmlDocument.evaluate("/homebank/properties", homebankXmlDocument, null, XPathResult.ANY_TYPE, null);
    let xmlProperty = xmlProperties.iterateNext();
    while (xmlProperty) {
      properties.push(this.loadProperty(homebankXmlDocument, xmlProperty, currencies));
      xmlProperty = xmlProperties.iterateNext();
    }
    return properties[0];
  }

  private loadProperty(homebankXmlDocument: XMLDocument, xmlAccount: Node, currencies: Currency[]): Property {
    let title = homebankXmlDocument.evaluate("@title", xmlAccount, null, XPathResult.STRING_TYPE, null).stringValue;
    let currencyValue = homebankXmlDocument.evaluate("@curr", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let autoSmode = homebankXmlDocument.evaluate("@auto_smode", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let autoWeekday = homebankXmlDocument.evaluate("@auto_weekday", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let autoNbmonths = homebankXmlDocument.evaluate("@auto_nbmonths", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    return new Property(title,
      ensure(currencies.find(currency => currency.key === currencyValue)),
      autoSmode,
      autoWeekday,
      autoNbmonths
    );
  }

  public toXml(property: Property): string {
    return "<properties"
      + stringToXmlAttr("title", property.title)
      + numberToXmlAttrWithResolution("curr", property.currency, property.currency.key)
      + numberToXmlAttr("auto_smode", property.autoSmode)
      + numberToXmlAttr("auto_weekday", property.autoWeekday)
      + numberToXmlAttr("auto_nbmonths", property.autoNbmonths)
      + "/>";
  }
}
