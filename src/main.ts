import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { HomebankService } from './app/service/homebank.service';
import { CurrencyService } from './app/service/currency.service';
import { PropertiesService } from './app/service/properties.service';
import { AccountService } from './app/service/account.service';
import { PayeeService } from './app/service/payee.service';
import { CategoryService } from './app/service/category.service';
import { FavoriteService } from './app/service/favorites.service';
import { OperationService } from './app/service/operation.service';
import { SharedDataService } from './app/service/shared-data.service';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { AccountsComponent } from './app/component/accounts/accounts.component';
import { OperationsComponent } from './app/component/operations/operations.component';
import { MainComponent } from './app/component/main/main.component';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(MainComponent, {
    providers: [
        importProvidersFrom(BrowserModule, NgbModule, FontAwesomeModule, FormsModule),
        HomebankService,
        CurrencyService,
        PropertiesService,
        AccountService,
        PayeeService,
        CategoryService,
        FavoriteService,
        OperationService,
        SharedDataService,
        provideRouter([
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
    ]
})
  .catch(err => console.error(err));
