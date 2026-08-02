import {Injectable} from "@angular/core";
import {Category} from "../model/category";
import {
  getXpathResult,
  numberToXmlAttr,
  numberToXmlAttrWithResolution,
  stringToXmlAttr,
  xmlAttrToNumber,
  xmlAttrToNumberOrUndefined,
  xmlAttrToString
} from "../utils";
import {Payee} from "../model/payee";
import {Account} from "../model/account";
import {Favorite} from "../model/favorite";

@Injectable()
export class FavoriteService {
  public load(homebankXmlDocument: XMLDocument, accounts: Map<number, Account>, payees: Map<number, Payee>, categories: Map<number, Category>) {
    let favorites = new Map<number, Favorite>();
    let xmlFavorites = getXpathResult(homebankXmlDocument, "/homebank/fav");
    let xmlFavorite = xmlFavorites.iterateNext();
    while (xmlFavorite) {
      let favorire = this.loadFavortie(homebankXmlDocument, xmlFavorite, accounts, payees, categories);
      favorites.set(favorire.key, favorire);
      xmlFavorite = xmlFavorites.iterateNext();
    }
    return favorites;
  }

  private loadFavortie(homebankXmlDocument: XMLDocument, xmlFavorite: Node, accounts: Map<number, Account>, payees: Map<number, Payee>, categories: Map<number, Category>): Favorite {
    return new Favorite(
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "key"),
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "amount"),
      accounts.get(xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "account")),
      accounts.get(xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "dst_account")),
      xmlAttrToNumberOrUndefined(homebankXmlDocument, xmlFavorite, "paymode"),
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "flags"),
      payees.get(xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "payee")),
      categories.get(xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "category")),
      xmlAttrToString(homebankXmlDocument, xmlFavorite, "wording"),
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "recflg"),
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "nextdate"),
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "every"),
      xmlAttrToNumberOrUndefined(homebankXmlDocument, xmlFavorite, "unit"),
      xmlAttrToNumberOrUndefined(homebankXmlDocument, xmlFavorite, "weekend"),
      xmlAttrToNumberOrUndefined(homebankXmlDocument, xmlFavorite, "limit"));
  }

  private favoriteToXml(favorite: Favorite): string {
    return "<fav"
      + numberToXmlAttr("key", favorite.key)
      + numberToXmlAttr("amount", favorite.amount)
      + numberToXmlAttrWithResolution("account", favorite.account, favorite.account?.key)
      + numberToXmlAttrWithResolution("dst_account", favorite.destinationAccount, favorite.destinationAccount?.key)
      + numberToXmlAttr("paymode", favorite.paymode)
      + numberToXmlAttr("flags", favorite.flags)
      + numberToXmlAttrWithResolution("payee", favorite.payee, favorite.payee?.key)
      + numberToXmlAttrWithResolution("category", favorite.category, favorite.category?.key)
      + stringToXmlAttr("wording", favorite.wording)
      + numberToXmlAttr("recflg", favorite.recflg)
      + numberToXmlAttr("nextdate", favorite.nextdate)
      + numberToXmlAttr("every", favorite.every)
      + numberToXmlAttr("unit", favorite.unit)
      + numberToXmlAttr("weekend", favorite.weekend)
      + numberToXmlAttr("limit", favorite.limit)
      + "/>\n";
  }

  public toXml(favorites: Map<number, Favorite>): string {
    let xml = "";
    favorites.forEach(favorite => {
      xml += this.favoriteToXml(favorite);
    })
    return xml;
  }
}
