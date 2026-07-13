import {Injectable} from "@angular/core";
import {Category} from "../model/category";
import {ensure} from "../utils";

@Injectable()
export class CategoryService {
  public load(homebankXmlDocument: XMLDocument) {
    let categories: Category[] = [];
    let xmlCategories = homebankXmlDocument.evaluate("/homebank/cat", homebankXmlDocument, null, XPathResult.ANY_TYPE, null);
    let xmlCategory = xmlCategories.iterateNext();
    while (xmlCategory) {
      categories.push(this.loadCategory(homebankXmlDocument, xmlCategory, categories));
      xmlCategory = xmlCategories.iterateNext();
    }
    return categories;
  }

  private loadCategory(homebankXmlDocument: XMLDocument, xmlCategory: Node, categories: Category[]): Category {
    let key = homebankXmlDocument.evaluate("@key", xmlCategory, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let parentNumberValue = homebankXmlDocument.evaluate("@parent", xmlCategory, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let category = parentNumberValue ? ensure(categories.find(category => category.key === parentNumberValue)) : null;
    let flags = homebankXmlDocument.evaluate("@flags", xmlCategory, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let name = homebankXmlDocument.evaluate("@name", xmlCategory, null, XPathResult.STRING_TYPE, null).stringValue;
    return new Category(key, category, flags, name);
  }
}
