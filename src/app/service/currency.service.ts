import {Injectable} from "@angular/core";
import {Currency} from "../model/currency";

@Injectable()
export class CurrencyService {
  public load(homebankXmlDocument: XMLDocument) {
    let currencies: Currency[] = [];
    let xmlCurrencies = homebankXmlDocument.evaluate("/homebank/cur", homebankXmlDocument, null, XPathResult.ANY_TYPE, null);
    let xmlCurrency = xmlCurrencies.iterateNext();
    while (xmlCurrency) {
      currencies.push(this.loadCurrency(homebankXmlDocument, xmlCurrency));
      xmlCurrency = xmlCurrencies.iterateNext();
    }
    return currencies;
  }

  private loadCurrency(homebankXmlDocument: XMLDocument, xmlCurrency: Node): Currency {
    let key = homebankXmlDocument.evaluate("@key", xmlCurrency, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let name = homebankXmlDocument.evaluate("@name", xmlCurrency, null, XPathResult.STRING_TYPE, null).stringValue;
    let iso = homebankXmlDocument.evaluate("@iso", xmlCurrency, null, XPathResult.STRING_TYPE, null).stringValue;
    return new Currency(key, name, iso);
  }
}
