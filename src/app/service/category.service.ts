import {Injectable} from "@angular/core";
import {Category} from "../model/category";
import {
  ensure,
  getXpathResult,
  numberToXmlAttr,
  numberToXmlAttrWithResolution,
  stringToXmlAttr,
  xmlAttrToNumber,
  xmlAttrToNumberOrUndefined,
  xmlAttrToString
} from "../utils";

@Injectable()
export class CategoryService {
  public load(homebankXmlDocument: XMLDocument) {
    let categories = new Map<number, Category>();
    let xmlCategories = getXpathResult(homebankXmlDocument, "/homebank/cat");
    let xmlCategory = xmlCategories.iterateNext();
    while (xmlCategory) {
      let category = this.loadCategory(homebankXmlDocument, xmlCategory, categories);
      categories.set(category.key, category);
      xmlCategory = xmlCategories.iterateNext();
    }
    return categories;
  }

  private loadCategory(homebankXmlDocument: XMLDocument, xmlCategory: Node, categories: Map<number, Category>): Category {
    let parentNumberValue = xmlAttrToNumber(homebankXmlDocument, xmlCategory, "parent");
    return new Category(
      xmlAttrToNumber(homebankXmlDocument, xmlCategory, "key"),
      parentNumberValue ? ensure(categories.get(parentNumberValue)) : null,
      xmlAttrToNumberOrUndefined(homebankXmlDocument, xmlCategory, "flags"),
      xmlAttrToString(homebankXmlDocument, xmlCategory, "name"));
  }

  private categoryToXml(category: Category): string {
    return "<cat"
      + numberToXmlAttr("key", category.key)
      + numberToXmlAttrWithResolution("parent", category.parent, category.parent?.key)
      + numberToXmlAttr("flags", category.flags)
      + stringToXmlAttr("name", category.name)
      + "/>\n";
  }

  public toXml(categories: Map<number, Category>): string {
    let xml = "";
    categories.forEach(category => {
      xml += this.categoryToXml(category);
    })
    return xml;
  }

  private addNew(categories: Map<number, Category>, value: string | undefined): Category | undefined {
    if (value === undefined) {
      return undefined;
    }

    let maxKey = [...categories.keys()]
      .reduce((key1, key2) => key1 < key2 ? key2 : key1);
    let newKey = maxKey + 1;
    return categories.set(newKey, new Category(newKey, null, undefined, value)).get(newKey)!;
  }

  public getOrAdd(categories: Map<number, Category>, value: string | undefined): Category | undefined {
    return [...categories.values()].find((category: Category) => category.name === value) || this.addNew(categories, value);
  }
}
