export class Property {
  title: string;
  currencyIso: string;
  autoSmode: number;
  autoWeekday: number;
  autoNbmonths: number;

  constructor(title: string,
              currencyIso: string,
              autoSmode: number,
              autoWeekday: number,
              autoNbmonths: number,
              ) {
    this.title = title;
    this.currencyIso = currencyIso;
    this.autoSmode = autoSmode;
    this.autoWeekday = autoWeekday;
    this.autoNbmonths = autoNbmonths;
  }
}
