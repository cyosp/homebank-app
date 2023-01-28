import {Component} from '@angular/core';

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
  homebankXmlDocument: XMLDocument;
  title: string;

  constructor() {
    this.fileReader = new FileReader();
    this.domParser = new DOMParser();
    this.homebankFile = new Blob();
    this.homebankFileLoaded = false;
    this.homebankXmlDocument = this.domParser.parseFromString('<root/>', 'text/xml');
    this.title = '';
  }

  homebankFileChanged(event: any) {
    this.homebankFileLoaded = false;
    this.homebankFile = event.target.files[0];
    this.loadDocument();
  }

  loadDocument() {
    this.fileReader.readAsText(this.homebankFile);

    this.fileReader.onload = () => {
      let homebankXmlFileContent = this.fileReader.result as string;
      let startTime = new Date().getTime();
      this.homebankXmlDocument = this.domParser.parseFromString(homebankXmlFileContent, 'text/xml');
      console.debug('HomeBank file loaded in ' + (new Date().getTime() - startTime) + ' ms');
      this.homebankFileLoaded = true;

      this.loadTitle();
    }
  }

  loadTitle() {
    this.title = this.homebankXmlDocument.evaluate("/homebank/properties/@title", this.homebankXmlDocument, null, XPathResult.STRING_TYPE, null).stringValue;
  }
}
