import {Injectable} from "@angular/core";
import {Category} from "../model/category";
import {getXpathResult, numberToXmlAttr, numberToXmlAttrWithResolution, xmlAttrToNumber} from "../utils";
import {Payee} from "../model/payee";
import {Account} from "../model/account";
import {Favorite} from "../model/favorite";

@Injectable()
export class FavoriteService {
  public load(homebankXmlDocument: XMLDocument, accounts: Account[], payees: Payee[], categories: Category[]) {
    let favorites: Favorite[] = [];
    let xmlFavorites = getXpathResult(homebankXmlDocument, "/homebank/fav");
    let xmlFavorite = xmlFavorites.iterateNext();
    while (xmlFavorite) {
      favorites.push(this.loadFavortie(homebankXmlDocument, xmlFavorite, accounts, payees, categories));
      xmlFavorite = xmlFavorites.iterateNext();
    }
    return favorites;
  }

  private loadFavortie(homebankXmlDocument: XMLDocument, xmlFavorite: Node, accounts: Account[], payees: Payee[], categories: Category[]): Favorite {
    return new Favorite(
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "key"),
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "amount"),
      accounts.find(account => account.key === xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "account")),
      accounts.find(account => account.key === xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "dst_account")),
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "paymode") ,
      payees.find(payee => payee.key === xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "payee")),
      categories.find(category => category.key === xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "category")),
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "recflg"),
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "nextdate"),
      xmlAttrToNumber(homebankXmlDocument, xmlFavorite, "every"));
  }

  private favoriteToXml(favorite: Favorite): string {
    return "<fav"
      + numberToXmlAttr("key", favorite.key)
      + numberToXmlAttr("amount", favorite.amount)
      + numberToXmlAttrWithResolution("account", favorite.account, favorite.account?.key)
      + numberToXmlAttrWithResolution("dst_account", favorite.destinationAccount, favorite.destinationAccount?.key)
      + numberToXmlAttr("paymode", favorite.paymode)
      + numberToXmlAttrWithResolution("payee", favorite.payee, favorite.payee?.key)
      + numberToXmlAttrWithResolution("category", favorite.category, favorite.category?.key)
      + numberToXmlAttr("recflg", favorite.recflg)
      + numberToXmlAttr("nextdate", favorite.nextdate)
      + numberToXmlAttr("every", favorite.every)
      + "/>";
  }

  public toXml(favorites: Favorite[]): string {
    let xml = "";
    favorites.forEach(favorite => {
      xml += this.favoriteToXml(favorite);
    })
    return xml;
  }
}
