export interface AppMenu {
    items: Array<MenuItem>;
    socialLinks: Array<SocialLinkItem>;
}

export interface MenuItem {
    title: string;
    link: string;
    visibleCheckName: string;
    icon: IconWithSourceType;
    children: Array<MenuItem>;
}

export interface IconWithSourceType {
    sourceType: string;
    icon: string;
}

export interface SocialLinkItem {
    icon: IconWithSourceType;
    name: string;
    link: string;
}


