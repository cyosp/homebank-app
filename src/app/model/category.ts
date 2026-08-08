export class Category {
  key: number;
  parent: Category | null;
  flags: number | undefined;
  name: string;

  constructor(key: number, parent: Category | null , flags: number | undefined, name: string) {
    this.name = name;
    this.parent = parent;
    this.flags = flags;
    this.key = key;
  }
}
