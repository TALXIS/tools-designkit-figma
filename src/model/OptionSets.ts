import { SolutionComponent } from "./SolutionComponent";
import { IAttributeDescription, IDescriptionParam, IDisplayNameParam, IFieldXmlFieldUIType, IOptionSetLabel, IOptionSetType, IOptionSets, IoptionstypeOption, OptionSetEnumType, TrueFalse01Type } from "./interfaces/IOptionSets";

export class OptionSets implements IOptionSets {
    optionsets: { optionset: OptionSetType[] | OptionSetType };

    constructor(optionset: OptionSetType[]) {
        const sets = <IOptionSets> { optionsets: { optionset: optionset }};
        this.optionsets = sets.optionsets;
    }

}

export class OptionSetType implements IOptionSetType {
    '@_Name': string;
    '@_localizedName': string;
    '@_xmlns:xsi': string;
    OptionSetType: OptionSetEnumType;
    IsGlobal?: TrueFalse01Type;
    IsCustomizable: TrueFalse01Type;
    IntroducedVersion: string;
    displaynames: DisplayNameParam;
    Descriptions: DescriptionParam;
    options?: {option: OptionstypeOption[] | OptionstypeOption};

    constructor(name: string,localizedName: string,optionSetType: OptionSetEnumType,isGlobal: TrueFalse01Type,introducedVersion: string,displayNames: DisplayNameParam, description: DescriptionParam, options?: OptionstypeOption[]) {
        this["@_Name"] = name;
        this["@_localizedName"] = localizedName;
        this["@_xmlns:xsi"] = "http://www.w3.org/2001/XMLSchema-instance";
        this.OptionSetType = optionSetType;
        this.IsGlobal = isGlobal;
        this.IsCustomizable = TrueFalse01Type.Item1;
        this.IntroducedVersion = introducedVersion;
        this.displaynames = displayNames;
        this.Descriptions = description;
        const opts = <IOptionSetType> {options: {option: options}};
        this.options = opts.options;
    }

}

export class OptionstypeOption implements IoptionstypeOption {
    '@_value': string;
    labels: OptionSetLabel;
    descriptions?: FieldXmlFieldUIType[];
    id?: string;
    colors?: FieldXmlFieldUIType[];
    externalValue?: string;
    color?: string;
    addedby?: string;

    constructor(value:string,labels: OptionSetLabel, id?: string,externalValue?: string,color?: string) {
        this["@_value"] = value;
        this.labels = labels;
        this.id = id;
        this.externalValue = externalValue;
        this.color = color;
    }
}

export class DisplayNameParam implements IDisplayNameParam{
    displayname: AttributeDescription[] | AttributeDescription;

    constructor(displayname: AttributeDescription[] | AttributeDescription) {
        this.displayname = displayname;
    }
}

export class DescriptionParam implements IDescriptionParam {
    Description: AttributeDescription[] | AttributeDescription;

    constructor(description: AttributeDescription[] | AttributeDescription) {
        this.Description = description;
    }
}

export class OptionSetLabel implements IOptionSetLabel {
    label: AttributeDescription[] | AttributeDescription;

    constructor(label: AttributeDescription[] | AttributeDescription) {
        this.label = label;
    }
}

export class AttributeDescription implements IAttributeDescription {
    '@_description': string;
    '@_languagecode': string;

    constructor(description: string, languageCode: string) {
        this["@_description"] = description;
        this["@_languagecode"] = languageCode;
    }
}

export class FieldXmlFieldUIType implements IFieldXmlFieldUIType {
    id: string;
    description: string;
    languagecode: string;

    constructor(id:string,description:string,languageCode:string) {
        this.id = id;
        this.description = description;
        this.languagecode = languageCode;
    }
}