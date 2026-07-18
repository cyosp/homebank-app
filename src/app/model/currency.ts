export class Currency {
  key: number;
  flags: number;
  iso: string;
  name: string;
  symb: string;
  syprf: number;
  dchar: string;
  gchar: string;
  frac: number;
  rate: number;
  mdate: number;

  constructor(key: number,
              flags: number,
              iso: string,
              name: string,
              symb: string,
              syprf: number,
              dchar: string,
              gchar: string,
              frac: number,
              rate: number,
              mdate: number,
  ) {
    this.key = key;
    this.flags = flags;
    this.iso = iso;
    this.name = name;
    this.symb = symb;
    this.syprf = syprf;
    this.dchar = dchar;
    this.gchar = gchar;
    this.frac = frac;
    this.rate = rate;
    this.mdate = mdate;
  }
}
