import {Component} from '@angular/core';
import {Account} from '../../model/account';
import {AccountService} from "../../service/account.service";
import {SharedDataService} from "../../service/shared-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent {
  homebankFileLoaded: boolean;
  accounts: Account[];

  constructor(private accountService: AccountService, private sharedDataService: SharedDataService) {
    this.homebankFileLoaded = false;
    this.sharedDataService.homebankFileLoadedObservable.subscribe(homebankFileLoaded => {
      this.homebankFileLoaded = homebankFileLoaded;
    });
    this.accounts = [];
    this.sharedDataService.homebankXmlDocumentObservable.subscribe(homebankXmlDocument => {
      this.accounts = accountService.load(homebankXmlDocument);
    });
  }

  get accountsToDisplay() {
    return this.accounts.filter(account => this.accountService.isDisplayable(account));
  }
}
