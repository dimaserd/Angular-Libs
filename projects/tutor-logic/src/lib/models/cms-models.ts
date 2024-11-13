
export interface CmsPageBlockModel {
    id: string;
    versionId: string;
    name: string;
    description: string;
    dataJson: string;
    dataType: string;
    isVisible: boolean;
}

export interface CmsPageModel {
    title: string;
    navigationItems: Array<CmsPageNavigationItem>;
    properties: CmsPropertiesModel;
    buttons: Array<CmsButton>;
}

export interface CmsPageNavigationItem {
    id: string;
    name: string;
}

export interface CmsPropertiesModel {
    booleans: Array<CmsBooleanProperty>;
    strings: Array<CmsStringProperty>;
}

export interface CmsBooleanProperty {
    name: string;
    value: boolean;
}

export interface CmsStringProperty {
    name: string;
    value: string;
}

export interface CmsButton {
    text: string;
    type: string;
    clickHandler: string;
}