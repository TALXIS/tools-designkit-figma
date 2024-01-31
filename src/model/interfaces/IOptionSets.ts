export interface IOptionSets {
    optionsets: {
        optionset: IOptionSetType[] | IOptionSetType;
    }
}

export interface IOptionSetType {
    '@_Name': string;
    '@_localizedName': string;
    '@_xmlns:xsi': string;
    OptionSetType: OptionSetEnumType;
    IsGlobal?: TrueFalse01Type;
    IsCustomizable: TrueFalse01Type;
    IntroducedVersion: string;
    displaynames: IDisplayNameParam;
    Descriptions: IDescriptionParam;
    options?: {option: IoptionstypeOption[] | IoptionstypeOption};
}

export interface IoptionstypeOption {
    '@_value': string;
    labels: IOptionSetLabel;
    descriptions?: IFieldXmlFieldUIType[];
    id?: string;
    colors?: IFieldXmlFieldUIType[];
    externalValue?: string;
    color?: string;
    addedby?: string;
}

export interface IDisplayNameParam {
    displayname: IAttributeDescription[] | IAttributeDescription;
}

export interface IDescriptionParam {
    Description: IAttributeDescription[] | IAttributeDescription;
}

export interface IOptionSetLabel {
    label: IAttributeDescription[] | IAttributeDescription;
}

export interface IAttributeDescription {
    '@_description': string;
    '@_languagecode': string;
}

export interface IFieldXmlFieldUIType {
    id: string;
    description: string;
    languagecode: string;
}

export enum OptionSetEnumType {
    picklist = 'picklist',
    state = 'state',
    status = 'status',
    bit = 'bit'
}

export enum TrueFalse01Type {
    Item0,
    Item1
}