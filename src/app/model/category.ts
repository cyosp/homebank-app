export class Category {
  key: number;
  parent: Category | null;
  flags: number;
  name: string;

  constructor(key: number, parent: Category | null , flags: number, name: string) {
    this.name = name;
    this.parent = parent;
    this.flags = flags;
    this.key = key;
  }
}
