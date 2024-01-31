export interface ISiteMap {
    AppModuleSiteMap:{
        '@_xmlns:xsi': string;
        SiteMapUniqueName: string;
        ShowHome: boolean;
        ShowPinned: boolean;
        ShowRecents: boolean;
        SiteMap:ISiteMapType;
    }
}

export interface ISiteMapType {
    IntroducedVersion: string;
    Area: ISiteMapTypeArea[];
}
export interface ISiteMapTypeArea {
    '@_Id': string;
    '@_ResourceId': string;
    '@_DescriptionResourceId': string;
    '@_ShowGroups': boolean;
    '@_IntroducedVersion': string;
    Titles: ITitlesType_SiteMapTitle[];
    Group: ISiteMapTypeAreaGroup[];
}

export interface ITitlesType_SiteMapTitle {
    Title: ITitleValue;
}

export interface ISiteMapTypeAreaGroup {
    '@_Id': string;
    '@_ResourceId': string;
    '@_DescriptionResourceId': string;
    '@_IsProfile': boolean;
    '@_IntroducedVersion': string;
    '@_ToolTipResourseId': string;
    Titles: ITitlesType_SiteMapTitle[];
    SubArea: ISiteMapTypeAreaGroupSubArea[];
}

export interface ISiteMapTypeAreaGroupSubArea {
    '@_Id': string;
    '@_ResourceId': string;
    '@_Client': string;
    '@_AvailableOffline': boolean;
    '@_PassParams': boolean;
    '@_Sku': string;
    '@_Entity'? : string;
    Titles: ITitlesType_SiteMapTitle[];
}

export interface ITitleValue {
    '@_LCID': string;
    '@_Title': string;
}