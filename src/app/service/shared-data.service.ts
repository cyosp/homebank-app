import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SharedDataService {
  private homebankXmlDocument = new BehaviorSubject(new Document());

  homebankXmlDocumentObservable = this.homebankXmlDocument.asObservable();

  constructor() {
  }

  setHomebankXmlDocument(homebankXmlDocument: XMLDocument): void {
    this.homebankXmlDocument.next(homebankXmlDocument);
  }
}
