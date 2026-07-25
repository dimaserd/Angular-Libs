import { HtmlBodyTag } from "../models";


export class TagBuildExtensions {
  static buildTagString(bodyTag: HtmlBodyTag, attrs: { [name: string]: { defaultValue: string; }; }): string {

    const tagName = bodyTag.tagDescription.tag;

    const attrValStrs: string[] = [];

    Object.keys(attrs).forEach(attributeName => {
      const attrDescription = attrs[attributeName];

      const attrVal = bodyTag.attributes[attributeName] ?? attrDescription.defaultValue;

      const attrValStr = (attrVal === undefined || attrVal === null)
        ? null
        : `${attributeName}="${attrVal}"`;

      if (attrValStr) {
        attrValStrs.push(attrValStr);
      }
    });

    const attrStr = attrValStrs.length > 0
      ? " " + [attrValStrs].join(" ")
      : "";

    return `<${tagName}${attrStr}></${tagName}>`;
  }
}
