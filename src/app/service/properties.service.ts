import {Injectable} from "@angular/core";
import {
  ensure,
  getXpathResult,
  numberToXmlAttr,
  numberToXmlAttrWithResolution,
  stringToXmlAttr,
  xmlAttrToNumber,
  xmlAttrToString
} from "../utils";
import {Currency} from "../model/currency";
import {Property} from "../model/property";

@Injectable()
export class PropertiesService {
  public load(homebankXmlDocument: XMLDocument, currencies: Currency[]) {
    let properties = [];
    let xmlProperties = getXpathResult(homebankXmlDocument, "/homebank/properties");
    let xmlProperty = xmlProperties.iterateNext();
    while (xmlProperty) {
      properties.push(this.loadProperty(homebankXmlDocument, xmlProperty, currencies));
      xmlProperty = xmlProperties.iterateNext();
    }
    return properties[0];
  }

  private loadProperty(homebankXmlDocument: XMLDocument, xmlProperty: Node, currencies: Currency[]): Property {
    return new Property(
      xmlAttrToString(homebankXmlDocument, xmlProperty, "title"),
      ensure(currencies.find(currency => currency.key === xmlAttrToNumber(homebankXmlDocument, xmlProperty, "curr"))),
      xmlAttrToNumber(homebankXmlDocument, xmlProperty, "auto_smode"),
      xmlAttrToNumber(homebankXmlDocument, xmlProperty, "auto_weekday"),
      xmlAttrToNumber(homebankXmlDocument, xmlProperty, "auto_nbmonths")
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
