import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Homebank} from "../model/homebank";

@Injectable()
export class SharedDataService {
  private homebankFileLoaded = new BehaviorSubject(false);
  private homebankXmlDocument = new BehaviorSubject(new Document());
  private homebankLocation = new BehaviorSubject("");
  private homebank = new BehaviorSubject(new Homebank([],[],[],[],[]));

  constructor() {
  }

  public getHomebankFileLoaded(): Observable<boolean> {
    return this.homebankFileLoaded;
  }

  setHomebankFileLoaded(homebankFileLoaded: boolean): void {
    this.homebankFileLoaded.next(homebankFileLoaded);
  }

  public getHomebankXmlDocument(): Observable<Document> {
    return this.homebankXmlDocument;
  }

  setHomebankXmlDocument(homebankXmlDocument: XMLDocument): void {
    this.homebankXmlDocument.next(homebankXmlDocument);
  }

  public getHomebankLocation(): Observable<string> {
    return this.homebankLocation;
  }

  setHomebankLocation(homebankLocation: string): void {
    this.homebankLocation.next(homebankLocation);
  }

  public getHomebank(): Observable<Homebank> {
    return this.homebank;
  }

  setHomebank(homebank: Homebank): void {
    this.homebank.next(homebank);
  }
}
