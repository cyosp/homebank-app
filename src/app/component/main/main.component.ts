import {Component} from '@angular/core';
import {AccountService} from "../../service/account.service";
import {SharedDataService} from "../../service/shared-data.service";
import {NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {faRightFromBracket, IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent {
  isTogglerCollapsed: boolean;
  location: string;
  disconnect: IconDefinition;
  fileReader: FileReader;
  domParser: DOMParser;
  homebankFileLoaded: boolean;

  constructor(private accountService: AccountService,
              private titleService: Title,
              private sharedDataService: SharedDataService,
              private router: Router) {
    this.isTogglerCollapsed = true;
    this.location = "";
    this.disconnect = faRightFromBracket;
    this.fileReader = new FileReader();
    this.domParser = new DOMParser();
    this.homebankFileLoaded = false;

    this.sharedDataService.getHomebankFileLoaded().subscribe(homebankFileLoaded => {
      this.homebankFileLoaded = homebankFileLoaded;
    });

    this.sharedDataService.getHomebankXmlDocument().subscribe(homebankXmlDocument => {
      let homebankTitle = homebankXmlDocument.evaluate("/homebank/properties/@title", homebankXmlDocument, null, XPathResult.STRING_TYPE, null).stringValue;
      this.titleService.setTitle(homebankTitle);
      this.sharedDataService.setHomebankLocation(homebankTitle);
    });

    this.sharedDataService.getHomebankLocation().subscribe(homebankLocation => {
      this.location = homebankLocation;
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
      console.debug('HomeBank file loaded in ' + (new Date().getTime() - startTime) + ' ms');

      this.sharedDataService.setHomebankFileLoaded(true);
      this.sharedDataService.setHomebankXmlDocument(homebankXmlDocument);

      this.router.navigate(['/accounts']);
    }
  }
}
