export interface TagItem {
    tag: string;
    displayValue: string;
}

export interface HtmlBodyTag {
    tagDescription: TagItem;
    innerHtml: string;
    attributes: Object;
    presentOrEdit: boolean;
}