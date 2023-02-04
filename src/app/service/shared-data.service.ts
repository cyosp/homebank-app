import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SharedDataService {
  private homebankFileLoaded = new BehaviorSubject(false);
  private homebankXmlDocument = new BehaviorSubject(new Document());

  homebankFileLoadedObservable = this.homebankFileLoaded.asObservable();
  homebankXmlDocumentObservable = this.homebankXmlDocument.asObservable();

  constructor() {
  }

  setHomebankFileLoaded(homebankFileLoaded: boolean): void {
    this.homebankFileLoaded.next(homebankFileLoaded);
  }

  setHomebankXmlDocument(homebankXmlDocument: XMLDocument): void {
    this.homebankXmlDocument.next(homebankXmlDocument);
  }
}
