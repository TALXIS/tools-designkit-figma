export interface IAppModule {
    AppModule: IAppModuleType;
}

export interface IAppModuleType {
    UniqueName: string;
    IntroducedVersion: string;
    WebResourceId: string;
    statecode: number;
    statuscode: number;
    FormFactor: string;
    ClientType: number;
    NavigationType: number;
    AppModuleComponents: {AppModuleComponent:IAppModuleComponentType[]};
    LocalizedNames: { LocalizedName: ILocalizedName[] | ILocalizedName };
    Descriptions: { Description: IDescription[] };
}

export interface IAppModuleComponentType {
    '@_type': number;
    '@_schemaName'?: string;
}

export interface ILocalizedName {
    '@_description': string;
    '@_languagecode': string;
}
export interface IDescription {
    '@_description': string;
    '@_languagecode': string;
}