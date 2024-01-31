import { IAppModule, IAppModuleComponentType, IAppModuleType, IDescription, ILocalizedName } from "./interfaces/IAppModule";

export class AppModule implements IAppModule {
    AppModule: IAppModuleType;
    
    constructor(appModule: AppModuleType) {
        this.AppModule = appModule;
    }
}

export class AppModuleType implements IAppModuleType {
    UniqueName: string;
    IntroducedVersion: string;
    WebResourceId: string;
    statecode: number;
    statuscode: number;
    FormFactor: string;
    ClientType: number;
    NavigationType: number;
    AppModuleComponents: { AppModuleComponent: IAppModuleComponentType[]; };
    LocalizedNames: { LocalizedName: ILocalizedName | ILocalizedName[]; };
    Descriptions: { Description: IDescription[]; };

    constructor(uniqueName: string, version: string, resourceID: string, statecode: number, 
        statuscode: number, formFactor: string,navigationType: number, appModuleComponent: AppModuleComponentType[], localizatedNames: LocalizedName[],description: Description[]) {
        this.UniqueName = uniqueName;
        this.IntroducedVersion = version;
        this.WebResourceId = resourceID;
        this.statecode = statecode;
        this.statuscode = statuscode;
        this.FormFactor = formFactor;
        this.ClientType = 4;
        this.NavigationType = navigationType;

        const components = <IAppModuleType> {AppModuleComponents: {AppModuleComponent: appModuleComponent},LocalizedNames : {LocalizedName: localizatedNames},Descriptions: {Description: description}};
        this.AppModuleComponents = components.AppModuleComponents;
        this.LocalizedNames = components.LocalizedNames;
        this.Descriptions = components.Descriptions;
    }
    
}

export class AppModuleComponentType implements IAppModuleComponentType {
    '@_type': number;
    '@_schemaName'?: string;

    constructor(type: number, schemaName: string) {
        this["@_type"] = type;
        this["@_schemaName"] = schemaName;
    }
}

export class LocalizedName implements ILocalizedName {
    '@_description': string;
    '@_languagecode': string;

    constructor(description: string, languageCode: string) {
        this["@_description"] = description;
        this["@_languagecode"] = languageCode;
    }
}

export class Description implements IDescription {
    '@_description': string;
    '@_languagecode': string;

    constructor(description: string, languageCode: string) {
        this["@_description"] = description;
        this["@_languagecode"] = languageCode;
    }
}