import {Component} from '@angular/core';
import {AccountService} from "../../service/account.service";
import {SharedDataService} from "../../service/shared-data.service";
import {NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent {
  fileReader: FileReader;
  domParser: DOMParser;
  homebankFileLoaded: boolean;
  title: string;

  constructor(private accountService: AccountService,
              private titleService: Title,
              private sharedDataService: SharedDataService,
              private router: Router) {
    this.fileReader = new FileReader();
    this.domParser = new DOMParser();
    this.homebankFileLoaded = false;
    this.title = "";

    this.sharedDataService.homebankFileLoadedObservable.subscribe(homebankFileLoaded => {
      this.homebankFileLoaded = homebankFileLoaded;
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd && event.url === '/') {
        this.sharedDataService.setHomebankFileLoaded(false);
      }
    });
  }

  homebankFileChanged(event: any) {
    this.loadDocument(event.target.files[0]);
  }

  loadDocument(homebankFileBlob: Blob) {
    this.fileReader.readAsText(homebankFileBlob);

    this.fileReader.onload = () => {
      let homebankXmlFileContent = this.fileReader.result as string;

      let startTime = new Date().getTime();
      let homebankXmlDocument = this.domParser.parseFromString(homebankXmlFileContent, 'text/xml');
      console.debug('HomeBank file loaded in ' + (new Date().getTime() - startTime) + ' ms')
      this.sharedDataService.setHomebankFileLoaded(true);
      this.sharedDataService.setHomebankXmlDocument(homebankXmlDocument);

      this.loadTitle(homebankXmlDocument);

      this.router.navigate(['/accounts']);
    }
  }

  loadTitle(homebankXmlDocument: XMLDocument) {
    this.title = homebankXmlDocument.evaluate("/homebank/properties/@title", homebankXmlDocument, null, XPathResult.STRING_TYPE, null).stringValue;
    this.titleService.setTitle(this.title);
  }
}
