import {Injectable} from "@angular/core";
import {Account} from "../model/account";
import {CurrencyService} from "./currency.service";
import {Homebank} from "../model/homebank";
import {PayeeService} from "./payee.service";
import {CategoryService} from "./category.service";
import {OperationService} from "./operation.service";
import {AccountService} from "./account.service";
import {Operation} from "../model/operation";
import {PropertiesService} from "./properties.service";
import {SharedDataService} from "./shared-data.service";
import {numberToXmlAttr, stringToXmlAttr} from "../utils";

@Injectable()
export class HomebankService {
  private SUPPORTED_HOMEBANK_VERSION = 1.6;
  private homebank: Homebank | null;

  constructor(private currencyService: CurrencyService,
              private propertiesService: PropertiesService,
              private accountService: AccountService,
              private payeeService: PayeeService,
              private categoryService: CategoryService,
              private operationService: OperationService,
              private sharedDataService: SharedDataService) {
    this.homebank = null;
    this.sharedDataService.getHomebank().subscribe(homebank => {
      this.homebank = homebank;
    });
  }

  public load(homebankXmlDocument: XMLDocument) {
    let currencies = this.currencyService.load(homebankXmlDocument);
    let property = this.propertiesService.load(homebankXmlDocument, currencies);
    let accounts = this.accountService.load(homebankXmlDocument, currencies);
    let payees = this.payeeService.load(homebankXmlDocument);
    let categories = this.categoryService.load(homebankXmlDocument);
    let operations = this.operationService.load(homebankXmlDocument, accounts, payees, categories);

    this.link(accounts, operations)

    const v = homebankXmlDocument.evaluate("/homebank/@v", homebankXmlDocument, null, XPathResult.NUMBER_TYPE, null).numberValue;
    if (v > this.SUPPORTED_HOMEBANK_VERSION) {
      // TODO Replace this native alert
      alert("Homebank supported version: " + this.SUPPORTED_HOMEBANK_VERSION + " whereas loaded version: " + v + ", load could be incomplete and save could result in data loss")
    }
    return new Homebank(
      v,
      homebankXmlDocument.evaluate("homebank/@d", homebankXmlDocument, null, XPathResult.STRING_TYPE, null).stringValue,
      currencies,
      property,
      accounts,
      payees,
      categories,
      operations);
  }

  public link(accounts: Account[], operations: Operation[]): void {
    accounts.forEach(account => {
      let balance = account.initial;
      operations.filter(operation => {
        return operation.account === account;
      }).sort((a1, a2) => a1.date - a2.date)
        .map(operation => {
          balance += operation.amount;
          operation.balance = balance;
          account.operations.push(operation);
        });
      account.balance = balance;
    })
  }

  public toXml(): string {
    const homebank = this.homebank;
    if (homebank) {
      return "<?xml version=\"1.0\"?>\n"
        + "<homebank" + numberToXmlAttr("v", homebank.v) + stringToXmlAttr("d", homebank.d) + ">\n"
        + this.propertiesService.toXml(homebank.property) + "\n"
        + this.currencyService.toXml(homebank.currencies) + "\n"
        + this.accountService.toXml(homebank.accounts) + "\n"
        + "</homebank>";
    } else {
      throw new DOMException("No home bank file loaded");
    }
  }
}
