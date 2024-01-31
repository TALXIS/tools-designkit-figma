import { ISiteMap, ISiteMapType, ISiteMapTypeArea, ISiteMapTypeAreaGroup, ISiteMapTypeAreaGroupSubArea, ITitleValue, ITitlesType_SiteMapTitle } from "./interfaces/ISiteMap";

export class SiteMap implements ISiteMap { 
    
    AppModuleSiteMap: { '@_xmlns:xsi': string,SiteMapUniqueName: string; ShowHome: boolean; ShowPinned: boolean; ShowRecents: boolean; SiteMap: ISiteMapType; };

    constructor(name: string, showHome: boolean, showPinned: boolean, showRecent: boolean, siteMap: SiteMapType) {
        const appModule = <ISiteMap> { AppModuleSiteMap: {"@_xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",SiteMapUniqueName: name,ShowHome: showHome,ShowPinned: showPinned, ShowRecents: showRecent, SiteMap: siteMap}};
        this.AppModuleSiteMap = appModule.AppModuleSiteMap;
    }
}

export class SiteMapType implements ISiteMapType {
    IntroducedVersion: string;
    Area: SiteMapTypeArea[];

    constructor(area: SiteMapTypeArea[]) {
        this.IntroducedVersion = "7.0.0.0";
        this.Area = area;
    }
}

export class SiteMapTypeArea implements ISiteMapTypeArea {
    '@_Id': string;
    '@_ResourceId': string;
    '@_DescriptionResourceId': string;
    '@_ShowGroups': boolean;
    '@_IntroducedVersion': string;
    Titles: TitlesType_SiteMapTitle[];
    Group: SiteMapTypeAreaGroup[];
    
    constructor(id: string,titles: TitlesType_SiteMapTitle[],groups: SiteMapTypeAreaGroup[]) {
        this["@_Id"] = id;
        this["@_ResourceId"] = "SitemapDesigner.NewTitle";
        this["@_DescriptionResourceId"] = "SitemapDesigner.NewTitle";
        this["@_ShowGroups"] = true;
        this["@_IntroducedVersion"] = "7.0.0.0";
        this.Titles = titles;
        this.Group = groups;
    }
}

export class TitlesType_SiteMapTitle implements ITitlesType_SiteMapTitle {
    Title: TitleValue;

    constructor(title: TitleValue) {
        this.Title = title;
    }
}

export class SiteMapTypeAreaGroup implements ISiteMapTypeAreaGroup {
    '@_Id': string;
    '@_ResourceId': string;
    '@_DescriptionResourceId': string;
    '@_IsProfile': boolean;
    '@_IntroducedVersion': string;
    '@_ToolTipResourseId': string;
    Titles: TitlesType_SiteMapTitle[];
    SubArea: SiteMapTypeAreaGroupSubArea[];
    
    constructor(id: string,titles: TitlesType_SiteMapTitle[],subareas: SiteMapTypeAreaGroupSubArea[]) {
        this["@_Id"] = id;
        this["@_ResourceId"] = "SitemapDesigner.NewTitle";
        this["@_DescriptionResourceId"] = "SitemapDesigner.NewTitle";
        this["@_IsProfile"] = false;
        this["@_IntroducedVersion"] = "7.0.0.0";
        this["@_ToolTipResourseId"] = "SitemapDesigner.Unknown"
        this.Titles = titles;
        this.SubArea = subareas;
    }
}

export class SiteMapTypeAreaGroupSubArea implements ISiteMapTypeAreaGroupSubArea {
    '@_Id': string;
    '@_ResourceId': string;
    '@_Client': string;
    '@_AvailableOffline': boolean;
    '@_PassParams': boolean;
    '@_Sku': string;
    '@_Entity'? : string;
    Titles: TitlesType_SiteMapTitle[];

    constructor(id:string,titles: TitlesType_SiteMapTitle[],entity?: string) {
        this["@_Id"] = id;
        this["@_ResourceId"] = "SitemapDesigner.NewSubArea";
        this["@_Client"] = "All,Outlook,OutlookLaptopClient,OutlookWorkstationClient,Web";
        this["@_AvailableOffline"] = true;
        this["@_PassParams"] = false;
        this["@_Sku"] = "All,OnPremise,Live,SPLA";
        this["@_Entity"] = entity;
        this.Titles = titles;
    }
}

export class TitleValue implements ITitleValue {
    '@_LCID': string;
    '@_Title': string;

    constructor(lcid: string,title: string) {
        this["@_LCID"] = lcid;
        this["@_Title"] = title;
    }
}