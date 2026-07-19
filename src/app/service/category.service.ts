import {Injectable} from "@angular/core";
import {Category} from "../model/category";
import {
  ensure,
  getXpathResult,
  numberToXmlAttr,
  numberToXmlAttrWithResolution,
  stringToXmlAttr,
  xmlAttrToNumber,
  xmlAttrToString
} from "../utils";

@Injectable()
export class CategoryService {
  public load(homebankXmlDocument: XMLDocument) {
    let categories: Category[] = [];
    let xmlCategories = getXpathResult(homebankXmlDocument, "/homebank/cat");
    let xmlCategory = xmlCategories.iterateNext();
    while (xmlCategory) {
      categories.push(this.loadCategory(homebankXmlDocument, xmlCategory, categories));
      xmlCategory = xmlCategories.iterateNext();
    }
    return categories;
  }

  private loadCategory(homebankXmlDocument: XMLDocument, xmlCategory: Node, categories: Category[]): Category {
    let parentNumberValue = xmlAttrToNumber(homebankXmlDocument, xmlCategory, "parent");
    return new Category(
      xmlAttrToNumber(homebankXmlDocument, xmlCategory, "key"),
      parentNumberValue ? ensure(categories.find(category => category.key === parentNumberValue)) : null,
      xmlAttrToNumber(homebankXmlDocument, xmlCategory, "flags"),
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

  public toXml(categories: Category[]): string {
    let xml = "";
    categories.forEach(category => {
      xml += this.categoryToXml(category);
    })
    return xml;
  }
}
