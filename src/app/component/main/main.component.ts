import {Component} from '@angular/core';
import {HomebankService} from "../../service/homebank.service";
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
  homebankTitle: string;
  disconnectIcon: IconDefinition;
  fileReader: FileReader;
  domParser: DOMParser;
  homebankFileLoaded: boolean;

  constructor(private homebankService: HomebankService,
              private titleService: Title,
              private sharedDataService: SharedDataService,
              private router: Router) {
    this.isTogglerCollapsed = true;
    this.homebankTitle = "";
    this.disconnectIcon = faRightFromBracket;
    this.fileReader = new FileReader();
    this.domParser = new DOMParser();
    this.homebankFileLoaded = false;

    this.sharedDataService.getHomebankFileLoaded().subscribe(homebankFileLoaded => {
      this.homebankFileLoaded = homebankFileLoaded;
    });

    this.sharedDataService.getTitle().subscribe(title => {
      this.homebankTitle = title;
      this.titleService.setTitle(this.homebankTitle);
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

      this.sharedDataService.setHomebankXmlDocument(homebankXmlDocument);
      let homebank = this.homebankService.load(homebankXmlDocument);
      this.sharedDataService.setTitle(homebank.property.title);
      this.sharedDataService.setHomebank(homebank);
      this.sharedDataService.setHomebankFileLoaded(true);

      this.router.navigate(['/accounts']);
    }
  }

  disconnect() {
    this.sharedDataService.resetHomebank();
    this.router.navigate(['/']);
  }
}
