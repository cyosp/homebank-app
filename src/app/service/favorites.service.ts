import {Injectable} from "@angular/core";
import {Category} from "../model/category";
import {numberToXmlAttr, numberToXmlAttrWithResolution} from "../utils";
import {Payee} from "../model/payee";
import {Account} from "../model/account";
import {Favorite} from "../model/favorite";

@Injectable()
export class FavoriteService {
  public load(homebankXmlDocument: XMLDocument, accounts: Account[], payees: Payee[], categories: Category[]) {
    let favorites: Favorite[] = [];
    let xmlFavorites = homebankXmlDocument.evaluate("/homebank/fav", homebankXmlDocument, null, XPathResult.ANY_TYPE, null);
    let xmlFavorite = xmlFavorites.iterateNext();
    while (xmlFavorite) {
      favorites.push(this.loadFavortie(homebankXmlDocument, xmlFavorite, accounts, payees, categories));
      xmlFavorite = xmlFavorites.iterateNext();
    }
    return favorites;
  }

  private loadFavortie(homebankXmlDocument: XMLDocument, xmlFavorite: Node, accounts: Account[], payees: Payee[], categories: Category[]): Favorite {
    let key = homebankXmlDocument.evaluate("@key", xmlFavorite, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let amount = homebankXmlDocument.evaluate("@amount", xmlFavorite, null, XPathResult.NUMBER_TYPE, null).numberValue;

    let accountValue = homebankXmlDocument.evaluate("@account", xmlFavorite, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let account = accounts.find(account => account.key === accountValue);

    let dstAccountValue = homebankXmlDocument.evaluate("@dst_account", xmlFavorite, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let destinationAccount = accounts.find(account => account.key === dstAccountValue);

    let paymode = homebankXmlDocument.evaluate("@paymode", xmlFavorite, null, XPathResult.NUMBER_TYPE, null).numberValue;

    let payeeValue = homebankXmlDocument.evaluate("@payee", xmlFavorite, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let payee = payees.find(payee => payee.key === payeeValue);

    let categoryValue = homebankXmlDocument.evaluate("@category", xmlFavorite, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let category = categories.find(category => category.key === categoryValue);

    let recflg = homebankXmlDocument.evaluate("@recflg", xmlFavorite, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let nextdate = homebankXmlDocument.evaluate("@nextdate", xmlFavorite, null, XPathResult.NUMBER_TYPE, null).numberValue;
    let every = homebankXmlDocument.evaluate("@every", xmlFavorite, null, XPathResult.NUMBER_TYPE, null).numberValue;

    return new Favorite(key,
      amount,
      account,
      destinationAccount,
      paymode,
      payee,
      category,
      recflg,
      nextdate,
      every);
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
