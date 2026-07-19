import {Injectable} from "@angular/core";
import {Currency} from "../model/currency";
import {getXpathResult, numberToXmlAttr, stringToXmlAttr, xmlAttrToNumber, xmlAttrToString} from "../utils";

@Injectable()
export class CurrencyService {
  public load(homebankXmlDocument: XMLDocument) {
    let currencies: Currency[] = [];
    let xmlCurrencies = getXpathResult(homebankXmlDocument, "/homebank/cur");
    let xmlCurrency = xmlCurrencies.iterateNext();
    while (xmlCurrency) {
      currencies.push(this.loadCurrency(homebankXmlDocument, xmlCurrency));
      xmlCurrency = xmlCurrencies.iterateNext();
    }
    return currencies;
  }

  private loadCurrency(homebankXmlDocument: XMLDocument, xmlCurrency: Node): Currency {
    return new Currency(
      xmlAttrToNumber(homebankXmlDocument, xmlCurrency, "key"),
      xmlAttrToNumber(homebankXmlDocument, xmlCurrency, "flags"),
      xmlAttrToString(homebankXmlDocument, xmlCurrency, "iso"),
      xmlAttrToString(homebankXmlDocument, xmlCurrency, "name"),
      xmlAttrToString(homebankXmlDocument, xmlCurrency, "symb"),
      xmlAttrToNumber(homebankXmlDocument, xmlCurrency, "syprf"),
      xmlAttrToString(homebankXmlDocument, xmlCurrency, "dchar"),
      xmlAttrToString(homebankXmlDocument, xmlCurrency, "gchar"),
      xmlAttrToNumber(homebankXmlDocument, xmlCurrency, "frac"),
      xmlAttrToNumber(homebankXmlDocument, xmlCurrency, "rate"),
      xmlAttrToNumber(homebankXmlDocument, xmlCurrency, "mdate")
    );
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
