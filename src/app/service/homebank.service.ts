import {Injectable} from "@angular/core";
import {Account} from "../model/account";
import {CurrencyService} from "./currency.service";
import {Homebank} from "../model/homebank";
import {Currency} from "../model/currency";
import {PayeeService} from "./payee.service";
import {CategoryService} from "./category.service";
import {ensure} from "../utils";

@Injectable()
export class HomebankService {

  constructor(private currencyService: CurrencyService,
              private payeeService: PayeeService,
              private categoryService: CategoryService,
              ) {}

  public load(homebankXmlDocument: XMLDocument) {
    let currencies = this.currencyService.load(homebankXmlDocument);
    let payees = this.payeeService.load(homebankXmlDocument);
    let categories = this.categoryService.load(homebankXmlDocument);

    let accounts = [];
    let xmlAccounts = homebankXmlDocument.evaluate("/homebank/account", homebankXmlDocument, null, XPathResult.ANY_TYPE, null);
    let xmlAccount = xmlAccounts.iterateNext();
    while (xmlAccount) {
      accounts.push(this.loadAccount(homebankXmlDocument, xmlAccount, currencies));
      xmlAccount = xmlAccounts.iterateNext();
    }
    return new Homebank(currencies, payees, categories, accounts);
  }

  private loadAccount(homebankXmlDocument: XMLDocument, xmlAccount: Node, currencies: Currency[]): Account {
    let key = homebankXmlDocument.evaluate("@key", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let name = homebankXmlDocument.evaluate("@name", xmlAccount, null, XPathResult.STRING_TYPE, null).stringValue;
    let balance = this.computeAmount(homebankXmlDocument, key);
    let flags = homebankXmlDocument.evaluate("@flags", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let currencyValue = homebankXmlDocument.evaluate("@curr", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
    return new Account(key, name, balance, flags, ensure(currencies.find( currency  => currency.key === currencyValue)).iso);
  }

  private computeAmount(homebankXmlDocument: XMLDocument, key: number) {
    return homebankXmlDocument.evaluate(
      "sum(/homebank/account[@key='" + key + "']/@initial | /homebank/ope[@account='" + key + "']/@amount)",
      homebankXmlDocument,
      null,
      XPathResult.NUMBER_TYPE,
      null
    ).numberValue;
  }

  public isDisplayable(account: Account): boolean {
    const hideAccountFromSummaryFlag = 16;
    return (account.flags & hideAccountFromSummaryFlag) != hideAccountFromSummaryFlag;
  }
}
