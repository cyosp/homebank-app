import {Component} from '@angular/core';
import {Account} from '../../model/account';
import {HomebankService} from "../../service/homebank.service";
import {SharedDataService} from "../../service/shared-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.sass']
})
export class AccountsComponent {
  homebankFileLoaded: boolean;
  accounts: Account[];

  constructor(private homebankService: HomebankService, private sharedDataService: SharedDataService) {
    this.homebankFileLoaded = false;
    this.sharedDataService.getHomebankFileLoaded().subscribe(homebankFileLoaded => {
      this.homebankFileLoaded = homebankFileLoaded;
    });
    this.accounts = [];
    this.sharedDataService.getHomebankXmlDocument().subscribe(homebankXmlDocument => {
      this.accounts = homebankService.load(homebankXmlDocument).accounts;
    });
  }

  get accountsToDisplay() {
    return this.accounts.filter(account => this.homebankService.isDisplayable(account));
  }
}
