import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MainComponent} from './component/main/main.component';
import {HomebankService} from "./service/homebank.service";
import {AccountsComponent} from "./component/accounts/accounts.component";
import {SharedDataService} from "./service/shared-data.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {CurrencyService} from "./service/currency.service";
import {PayeeService} from "./service/payee.service";
import {CategoryService} from "./service/category.service";
import {OperationService} from "./service/operation.service";
import {AccountService} from "./service/account.service";
import {RouterModule} from "@angular/router";
import {OperationsComponent} from "./component/operations/operations.component";

@NgModule({
  declarations: [
    MainComponent,
    AccountsComponent,
    OperationsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      {
        path: 'accounts',
        children: [{
          path: '',
          component: AccountsComponent,
        }, {
          path: ':accountId/operations',
          component: OperationsComponent
        }]
      }
    ])
  ],
  providers: [
    HomebankService,
    CurrencyService,
    AccountService,
    PayeeService,
    CategoryService,
    OperationService,
    SharedDataService
  ],
  bootstrap: [MainComponent]
})
export class AppModule {
}
