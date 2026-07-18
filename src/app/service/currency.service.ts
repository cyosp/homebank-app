import {Injectable} from "@angular/core";
import {Currency} from "../model/currency";
import {numberToXmlAttr, stringToXmlAttr} from "../utils";

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
    let flags = homebankXmlDocument.evaluate("@flags", xmlCurrency, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let iso = homebankXmlDocument.evaluate("@iso", xmlCurrency, null, XPathResult.STRING_TYPE, null).stringValue;
    let name = homebankXmlDocument.evaluate("@name", xmlCurrency, null, XPathResult.STRING_TYPE, null).stringValue;
    let symb = homebankXmlDocument.evaluate("@symb", xmlCurrency, null, XPathResult.STRING_TYPE, null).stringValue;
    let syprf = homebankXmlDocument.evaluate("@syprf", xmlCurrency, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let dchar = homebankXmlDocument.evaluate("@dchar", xmlCurrency, null, XPathResult.STRING_TYPE, null).stringValue;
    let gchar = homebankXmlDocument.evaluate("@gchar", xmlCurrency, null, XPathResult.STRING_TYPE, null).stringValue;
    let frac = homebankXmlDocument.evaluate("@frac", xmlCurrency, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let rate = homebankXmlDocument.evaluate("@rate", xmlCurrency, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let mdate = homebankXmlDocument.evaluate("@mdate", xmlCurrency, null, XPathResult.NUMBER_TYPE, null).numberValue;
    return new Currency(key,
      flags,
      iso,
      name,
      symb,
      syprf,
      dchar,
      gchar,
      frac,
      rate,
      mdate);
  }

  private currencyToXml(currency: Currency): string {
    return "<cur"
      + numberToXmlAttr("key", currency.key)
      + numberToXmlAttr("flags", currency.flags)
      + stringToXmlAttr("iso", currency.iso)
      + stringToXmlAttr("symb", currency.symb)
      + numberToXmlAttr("syprf", currency.syprf)
      + stringToXmlAttr("dchar", currency.dchar)
      + stringToXmlAttr("gchar", currency.gchar)
      + numberToXmlAttr("frac", currency.frac)
      + numberToXmlAttr("rate", currency.rate)
      + numberToXmlAttr("mdate", currency.mdate)
      + "/>";
  }

  public toXml(currencies: Currency[]): string {
    let xml = "";
    currencies.forEach(currency => {
      xml += this.currencyToXml(currency);
    })
    return xml;
  }
}
