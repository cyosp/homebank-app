import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './component/main/main.component';
import {AccountService} from "./service/account.service";
import {AccountsComponent} from "./component/accounts/accounts.component";
import {SharedDataService} from "./service/shared-data.service";

@NgModule({
  declarations: [
    MainComponent,
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
  bootstrap: [MainComponent]
})
export class AppModule { }
