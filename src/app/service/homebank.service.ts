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

@Injectable()
export class HomebankService {

  constructor(private currencyService: CurrencyService,
              private propertiesService: PropertiesService,
              private accountService: AccountService,
              private payeeService: PayeeService,
              private categoryService: CategoryService,
              private operationService: OperationService,
  ) {
  }

  public load(homebankXmlDocument: XMLDocument) {
    let currencies = this.currencyService.load(homebankXmlDocument);
    let property = this.propertiesService.load(homebankXmlDocument, currencies);
    let accounts = this.accountService.load(homebankXmlDocument, currencies);
    let payees = this.payeeService.load(homebankXmlDocument);
    let categories = this.categoryService.load(homebankXmlDocument);
    let operations = this.operationService.load(homebankXmlDocument, accounts, payees, categories);

    this.link(accounts, operations)

    return new Homebank(currencies, property, accounts, payees, categories, operations);
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
}
