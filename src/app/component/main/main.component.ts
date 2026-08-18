import {Component} from '@angular/core';
import {HomebankService} from "../../service/homebank.service";
import {SharedDataService} from "../../service/shared-data.service";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {faRightFromBracket, faSave, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {saveAs} from 'file-saver';
import {NgIf} from '@angular/common';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';
import {WebdavService} from "../../service/webdav.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
  standalone: true,
  imports: [NgIf, FaIconComponent, NgbCollapse, RouterOutlet, FormsModule]
})
export class MainComponent {
  isTogglerCollapsed: boolean;
  homebankTitle: string;
  disconnectIcon: IconDefinition;
  saveIcon: IconDefinition;
  fileReader: FileReader;
  domParser: DOMParser;
  homebankFileLoaded: boolean;

  webdavUrl: URL | null;
  webdavLogin: string | null;
  webdavPassword: string | null;

  constructor(private homebankService: HomebankService,
              private titleService: Title,
              private sharedDataService: SharedDataService,
              private router: Router,
              private webdavService: WebdavService) {
    this.isTogglerCollapsed = true;
    this.homebankTitle = "";
    this.disconnectIcon = faRightFromBracket;
    this.saveIcon = faSave;
    this.fileReader = new FileReader();
    this.domParser = new DOMParser();
    this.homebankFileLoaded = false;
    this.webdavUrl = null;
    this.webdavLogin = null;
    this.webdavPassword = null;

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

  loadFromContent(xmlConrent: string) {
    let startTime = new Date().getTime();
    let homebankXmlDocument = this.domParser.parseFromString(xmlConrent, 'text/xml');
    let homebank = this.homebankService.load(homebankXmlDocument);
    console.debug('HomeBank file loaded in ' + (new Date().getTime() - startTime) + ' ms');

    this.sharedDataService.setTitle(homebank.property.title);
    this.sharedDataService.setHomebank(homebank);
    this.sharedDataService.setHomebankFileLoaded(true);

    this.router.navigate(['/accounts']);
  }

  loadDocument(homebankFileBlob: Blob) {
    this.fileReader.readAsText(homebankFileBlob);
    this.fileReader.onload = () => {
      this.loadFromContent(this.fileReader.result as string)
    }
  }

  disconnect() {
    this.sharedDataService.resetHomebank();
    this.webdavUrl = null;
    this.webdavLogin = null;
    this.webdavPassword = null;
    this.router.navigate(['/']);
  }

  save() {
    let xmlContent = this.homebankService.toXml();
    if (this.webdavUrl) {
      this.webdavService.save(xmlContent);
    } else {
      const blob = new Blob([xmlContent], {type: "text/xml;charset=utf-8"});
      saveAs(blob, "hb.xml");
    }
  }

  webdavLoad() {
    this.webdavService.getResource(new URL(this.webdavUrl!), this.webdavLogin!, this.webdavPassword!)
      .then(data => {
        this.loadFromContent(data as string);
      });
  }
}
