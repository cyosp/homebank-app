import {Currency} from "./currency";

export class Property {
  title: string;
  currency: Currency;
  autoSmode: number;
  autoWeekday: number;
  autoNbmonths: number;

  constructor(title: string,
              currency: Currency,
              autoSmode: number,
              autoWeekday: number,
              autoNbmonths: number,
              ) {
    this.title = title;
    this.currency = currency;
    this.autoSmode = autoSmode;
    this.autoWeekday = autoWeekday;
    this.autoNbmonths = autoNbmonths;
  }
}
