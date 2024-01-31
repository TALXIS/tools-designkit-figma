import { IAttributeDescription, IDescriptionParam, IDisplayNameParam, IEntity, IEntityAttribute, IEntityInfoType, IEntityInfoTypeEntity, IFieldXmlFieldUIType } from "./interfaces/IEntity";
import { CrmDataType } from "./types/CrmDataType";

export class Entity implements IEntity {
    Entity: { Name: string; EntityInfo: IEntityInfoType; };
    
    constructor(name: string, info: EntityInfoType) {
        const ent = <IEntity> {Entity: {Name: name, EntityInfo: info}};
        this.Entity = ent.Entity;
    }
}

export class EntityInfoType implements IEntityInfoType {
    entity: IEntityInfoTypeEntity;

    constructor(entity: EntityInfoTypeEntity) {
        this.entity = entity;
    }

}

export class EntityInfoTypeEntity implements IEntityInfoTypeEntity {
    '@_Name': string;
    localizedNames: FieldXmlFieldUIType[];
    descriptions: FieldXmlFieldUIType[];
    attributes: {attribute: EntityAttribute[] | EntityAttribute};

    constructor(name: string,localizedNames: FieldXmlFieldUIType[],descriptions: FieldXmlFieldUIType[], attribute: EntityAttribute[] | EntityAttribute) {
        this["@_Name"] = name;
        this.localizedNames = localizedNames;
        this.descriptions = descriptions;
        
        const attr = <IEntityInfoTypeEntity> {attributes: {attribute: attribute}};
        this.attributes = attr.attributes;
    }
}

export class FieldXmlFieldUIType implements IFieldXmlFieldUIType {
    description: string;
    languagecode: string;
    
    constructor(description: string, languageCode: string) {
        this.description = description;
        this.languagecode = languageCode;
    }
}

export class EntityAttribute implements IEntityAttribute {
    '@_PhysicalName': string;
    //Type: CrmDataType;
    Name: string;
    LogicalName: string;
    RequiredLevel: string;
    Descriptions?: DescriptionParam | undefined;
    displaynames?: DisplayNameParam | undefined;

    constructor(physicalName: string,/*type: CrmDataType,*/ name: string, logicalName: string,requiredLevel: string, dscr?: DescriptionParam | undefined, displayName?: DisplayNameParam | undefined){
        this["@_PhysicalName"] = physicalName;
        //this.Type = type;
        this.Name = name;
        this.LogicalName = logicalName;
        this.RequiredLevel = requiredLevel;
        this.Descriptions = dscr;
        this.displaynames = displayName;
    }
    
}

export class DescriptionParam implements IDescriptionParam {
    Description: AttributeDescription | AttributeDescription[];

    constructor(dscr: AttributeDescription | AttributeDescription[]) {
        this.Description = dscr;
    }
    
}

export class DisplayNameParam implements IDisplayNameParam {
    displayname: AttributeDescription | AttributeDescription[];
    
    constructor(displayName: AttributeDescription | AttributeDescription[]) {
        this.displayname = displayName;
    }
}

export class AttributeDescription implements IAttributeDescription {
    '@_description': string;
    '@_languagecode': string;

    constructor(dscr: string, languageCode: string) {
        this["@_description"] = dscr;
        this["@_languagecode"] = languageCode;
    }
}