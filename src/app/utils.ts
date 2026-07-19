export function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there'): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }
  return argument;
}

export function getXpathResult(xmlDocument: XMLDocument, xpath: string): XPathResult {
  return xmlDocument.evaluate(xpath, xmlDocument, null, XPathResult.ANY_TYPE, null);
}

export function xmlAttrToString(xmlDocument: XMLDocument, node: Node, name: string): string {
  return xmlDocument.evaluate("@" + name, node, null, XPathResult.STRING_TYPE, null).stringValue;
}

export function xmlAttrToNumber(xmlDocument: XMLDocument, node: Node, name: string): number {
  return xmlDocument.evaluate("@" + name, node, null, XPathResult.NUMBER_TYPE, null).numberValue;
}

export function stringToXmlAttr(name: string, value: string | undefined): string {
  return value ? " " + name + "=\""
    + value.replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/&(?!(lt;|gt;|quot;|apos;|amp;))/g, '&amp;')
    + "\"" : "";
}

export function numberToXmlAttr(name: string, value: number | undefined): string {
  return value ? " " + name + "=\"" + value + "\"" : "";
}

export function numberToXmlAttrWithResolution(name: string, value: any, resolutionValue: number | undefined): string {
  return value ? " " + name + "=\"" + resolutionValue + "\"" : "";
}
