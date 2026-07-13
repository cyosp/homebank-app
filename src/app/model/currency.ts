export class Currency {
  key: number;
  name: string;
  iso: string;

  constructor(key: number, name: string, iso: string) {
    this.name = name;
    this.key = key;
    this.iso = iso;
  }
}
