import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SharedDataService {
  private homebankFileLoaded = new BehaviorSubject(false);
  private homebankXmlDocument = new BehaviorSubject(new Document());
  private homebankLocation = new BehaviorSubject("");

  homebankFileLoadedObservable = this.homebankFileLoaded.asObservable();
  homebankXmlDocumentObservable = this.homebankXmlDocument.asObservable();
  homebankLocationObservable = this.homebankLocation.asObservable();

  constructor() {
  }

  setHomebankFileLoaded(homebankFileLoaded: boolean): void {
    this.homebankFileLoaded.next(homebankFileLoaded);
  }

  setHomebankXmlDocument(homebankXmlDocument: XMLDocument): void {
    this.homebankXmlDocument.next(homebankXmlDocument);
  }

  setHomebankLocation(homebankLocation: string): void {
    this.homebankLocation.next(homebankLocation);
  }
}
