import { CrmDataType } from "../types/CrmDataType";

export interface IEntity {
    Entity:{
        Name: string;
        EntityInfo:IEntityInfoType;
    }
}

export interface IEntityInfoType {
    entity: IEntityInfoTypeEntity;
}

export interface IEntityInfoTypeEntity {
    '@_Name': string;
    localizedNames: IFieldXmlFieldUIType[];
    descriptions: IFieldXmlFieldUIType[];
    attributes: {attribute: IEntityAttribute[] | IEntityAttribute};
}

export interface IFieldXmlFieldUIType {
    description: string;
    languagecode: string;
}

export interface IEntityAttribute {
    '@_PhysicalName': string;
    //Type: CrmDataType;
    Name: string;
    LogicalName: string;
    RequiredLevel: string;
    Descriptions?: IDescriptionParam;
    displaynames?: IDisplayNameParam;
}

export interface IDisplayNameParam {
    displayname: IAttributeDescription[] | IAttributeDescription;
}

export interface IDescriptionParam {
    Description: IAttributeDescription[] | IAttributeDescription;
}

export interface IAttributeDescription {
    '@_description': string;
    '@_languagecode': string;
}