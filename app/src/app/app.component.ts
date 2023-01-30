import {Component} from '@angular/core';
import {Account} from './model/account';
import {AccountService} from "./service/account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  fileReader: FileReader;
  domParser: DOMParser
  homebankFile: Blob;
  homebankFileLoaded: boolean;
  homebankFileLoadedInMs: number;
  homebankXmlDocument: XMLDocument;
  title: string;
  accounts: Account[];

  constructor(private accountService: AccountService) {
    this.fileReader = new FileReader();
    this.domParser = new DOMParser();
    this.homebankFile = new Blob();
    this.homebankFileLoaded = false;
    this.homebankFileLoadedInMs = 0;
    this.homebankXmlDocument = this.domParser.parseFromString('<root/>', 'text/xml');
    this.title = '';
    this.accounts = [];
  }

  homebankFileChanged(event: any) {
    this.homebankFileLoaded = false;
    this.accounts = [];
    this.homebankFile = event.target.files[0];
    this.loadDocument();
  }

  loadDocument() {
    this.fileReader.readAsText(this.homebankFile);

    this.fileReader.onload = () => {
      let homebankXmlFileContent = this.fileReader.result as string;
      let startTime = new Date().getTime();
      this.homebankXmlDocument = this.domParser.parseFromString(homebankXmlFileContent, 'text/xml');
      this.homebankFileLoadedInMs = new Date().getTime() - startTime;
      this.homebankFileLoaded = true;

      this.loadTitle();
      this.loadAccounts();
    }
  }

  loadTitle() {
    this.title = this.homebankXmlDocument.evaluate("/homebank/properties/@title", this.homebankXmlDocument, null, XPathResult.STRING_TYPE, null).stringValue;
  }

  loadAccounts() {
    let accounts = this.homebankXmlDocument.evaluate("/homebank/account", this.homebankXmlDocument, null, XPathResult.ANY_TYPE, null);
    let xmlAccount = accounts.iterateNext();
    while (xmlAccount) {
      let position = this.homebankXmlDocument.evaluate("@pos", xmlAccount, null, XPathResult.NUMBER_TYPE, null).numberValue;
      this.accounts.push(this.accountService.load(this.homebankXmlDocument, xmlAccount, position));
      xmlAccount = accounts.iterateNext();
    }
  }

  get accountsToDisplay() {
    return this.accounts.filter(account => this.accountService.isDisplayable(account));
  }
}
