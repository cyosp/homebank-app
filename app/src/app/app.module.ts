import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AccountService} from "./service/account.service";
import {AccountsComponent} from "./component/accounts/accounts.component";
import {SharedDataService} from "./service/shared-data.service";

@NgModule({
  declarations: [
    AppComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    AccountService,
    SharedDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
