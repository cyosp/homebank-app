import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './component/main/main.component';
import {HomebankService} from "./service/homebank.service";
import {AccountsComponent} from "./component/accounts/accounts.component";
import {SharedDataService} from "./service/shared-data.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CurrencyService} from "./service/currency.service";
import {PayeeService} from "./service/payee.service";
import {CategoryService} from "./service/category.service";

@NgModule({
  declarations: [
    MainComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [
    HomebankService,
    CurrencyService,
    PayeeService,
    CategoryService,
    SharedDataService
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
