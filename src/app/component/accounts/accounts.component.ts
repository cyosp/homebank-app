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
      this.load(homebankXmlDocument);
    });
  }

  load(homebankXmlDocument: XMLDocument) {
    this.accounts = [];
    let accounts = homebankXmlDocument.evaluate("/homebank/account", homebankXmlDocument, null, XPathResult.ANY_TYPE, null);
    let xmlAccount = accounts.iterateNext();
    while (xmlAccount) {
      this.accounts.push(this.accountService.load(homebankXmlDocument, xmlAccount));
      xmlAccount = accounts.iterateNext();
    }
  }

  get accountsToDisplay() {
    return this.accounts.filter(account => this.accountService.isDisplayable(account));
  }
}
