import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Homebank} from "../model/homebank";
import {Property} from "../model/property";

@Injectable()
export class SharedDataService {
  private homebankFileLoaded = new BehaviorSubject(false);
  private homebankXmlDocument = new BehaviorSubject(new Document());
  private homebankTitle = new BehaviorSubject("");
  private homebank = new BehaviorSubject(new Homebank(
    [],
    new Property('','',-1,-1,-1),
    [],
    [],
    [],
    []));

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

  public getTitle(): Observable<string> {
    return this.homebankTitle;
  }

  setTitle(homebankLocation: string): void {
    this.homebankTitle.next(homebankLocation);
  }

  public getHomebank(): Observable<Homebank> {
    return this.homebank;
  }

  setHomebank(homebank: Homebank): void {
    this.homebank.next(homebank);
  }
}
