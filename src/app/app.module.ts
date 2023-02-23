import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './component/main/main.component';
import {AccountService} from "./service/account.service";
import {AccountsComponent} from "./component/accounts/accounts.component";
import {SharedDataService} from "./service/shared-data.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    AccountService,
    SharedDataService
  ],
  bootstrap: [MainComponent]
})
export class AppModule { }
