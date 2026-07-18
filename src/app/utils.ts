export function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there'): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }
  return argument;
}

export function stringToXmlAttr(name: string, value: string): string {
  return  value ? " " + name +   "=\""
    + value.replace(/</g, '&lt;')
      .replace(/>/g, '&gt;') // Realy needed ?
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/&/g, '&amp;')
    + "\"" : "";
}

export function numberToXmlAttr(name: string, value: number): string {
  return value ? " " + name + "=\"" + value + "\"" : "";
}

export function numberToXmlAttrWithResolution(name: string, value: any, resolutionValue: number): string {
  return value ? " " + name + "=\"" + resolutionValue + "\"" : "";
}
