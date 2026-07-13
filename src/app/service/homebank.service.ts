import {Injectable} from "@angular/core";
import {Account} from "../model/account";
import {CurrencyService} from "./currency.service";
import {Homebank} from "../model/homebank";
import {PayeeService} from "./payee.service";
import {CategoryService} from "./category.service";
import {OperationService} from "./operation.service";
import {AccountService} from "./account.service";

@Injectable()
export class HomebankService {

  constructor(private currencyService: CurrencyService,
              private accountService: AccountService,
              private payeeService: PayeeService,
              private categoryService: CategoryService,
              private operationService: OperationService,
  ) {
  }

  public load(homebankXmlDocument: XMLDocument) {
    let currencies = this.currencyService.load(homebankXmlDocument);
    let accounts = this.accountService.load(homebankXmlDocument, currencies);
    let payees = this.payeeService.load(homebankXmlDocument);
    let categories = this.categoryService.load(homebankXmlDocument);
    let operations = this.operationService.load(homebankXmlDocument, accounts, payees, categories);

    return new Homebank(currencies, accounts, payees, categories, operations);
  }

  public isDisplayable(account: Account): boolean {
    const hideAccountFromSummaryFlag = 16;
    return (account.flags & hideAccountFromSummaryFlag) != hideAccountFromSummaryFlag;
  }
}
