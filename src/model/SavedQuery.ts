import { ICustomAttribute, ICustomOrder, IFetchType, ILocalizedName, ISavedQuery, ISavedqueryFetchxml, ISavedqueryLayoutxml, ISavedqueryLayoutxmlGrid, ISavedqueryLayoutxmlGridRow, ISavedqueryLayoutxmlGridRowCell, savedquery } from "./interfaces/ISavedQuery";

export class SavedQuery implements ISavedQuery {
    savedqueries: { 
        '@_xmlns:xsi': string;
        savedquery: savedQuery; 
    };
    
    constructor(savedquery: savedQuery) {
        const saved = <ISavedQuery> {savedqueries: { "@_xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance" ,savedquery: savedquery} };
        this.savedqueries = saved.savedqueries;
    }
}

export class savedQuery implements savedquery {
    savedqueryid: string;
    querytype: number;
    layoutxml: SavedqueryLayoutxml;
    fetchxml: SavedqueryFetchxml;
    IsCustomizable: string;
    CanBeDeleted: string;
    IntroducedVersion: string;
    isquickfindquery: string;
    isdefault: string;
    isprivate: string;
    LocalizedNames: { LocalizedName: LocalizedName[] };

    constructor(savedqueryid: string,querytype: number, layoutxml: SavedqueryLayoutxml,fetchXML: SavedqueryFetchxml,IsCustomizable: string,
        CanBeDeleted: string,introducedVersion: string,isquickfindquery: string,isdefault: string,isprivate: string,localizedNames: LocalizedName[]) {
        this.savedqueryid = savedqueryid;
        this.querytype = querytype;
        this.layoutxml = layoutxml;
        this.fetchxml = fetchXML;
        this.IsCustomizable = IsCustomizable;
        this.CanBeDeleted = CanBeDeleted;
        this.IntroducedVersion = introducedVersion;
        this.isquickfindquery = isquickfindquery;
        this.isdefault = isdefault;
        this.isprivate = isprivate;

        const names = <savedquery> {LocalizedNames: {LocalizedName: localizedNames}};
        this.LocalizedNames = names.LocalizedNames;
    }
}

export class SavedqueryLayoutxml implements ISavedqueryLayoutxml {
    grid: SavedqueryLayoutxmlGrid;
    
    constructor(grid: SavedqueryLayoutxmlGrid) {
        this.grid = grid;
    }
}

export class SavedqueryFetchxml implements ISavedqueryFetchxml {
    fetch: IFetchType;
    
    constructor(fetch: FetchType) {
        this.fetch = fetch;
    }
}

export class FetchType implements IFetchType {
    '@_version': string;
    '@_output-format': string;
    '@_mapping': string;
    entity: {
        '@_name':string;
        attribute: CustomAttribute[] | CustomAttribute;
        order: CustomOrder;
    }

    constructor(version: string, entityName: string, attribute: CustomAttribute[], order: CustomOrder) {
        this["@_version"] = version;
        this["@_output-format"] = "xml-platform";
        this["@_mapping"] = "logical";

        const ent = <IFetchType> {entity: {"@_name": entityName,attribute: attribute, order: order}};
        this.entity = ent.entity;
    }
}

export class CustomAttribute implements ICustomAttribute {
    '@_name': string

    constructor(name: string) {
        this["@_name"] = name;
    }
}

export class CustomOrder implements ICustomOrder {
    '@_attribute': string
    '@_descending': string

    constructor(attribute: string, descending: string) {
        this["@_attribute"] = attribute;
        this["@_descending"] = descending;
    }
}

export class SavedqueryLayoutxmlGrid implements ISavedqueryLayoutxmlGrid {
    row: SavedqueryLayoutxmlGridRow;
    '@_name': string;
    '@_select': string;
    '@_preview': string;
    '@_icon': string;
    '@_jump': string;

    constructor(name: string, select: string, preview: string, icon: string, jump: string, row: SavedqueryLayoutxmlGridRow) {
        this["@_name"] = name;
        this["@_select"] = select;
        this["@_preview"] = preview;
        this["@_icon"] = icon;
        this["@_jump"] = jump;
        this.row = row;
    }
}

export class SavedqueryLayoutxmlGridRow implements ISavedqueryLayoutxmlGridRow {
    cell: SavedqueryLayoutxmlGridRowCell[];
    '@_name': string;
    '@_id': string;

    constructor(id: string, name: string, cell: SavedqueryLayoutxmlGridRowCell[]) {
        this["@_id"] = id;
        this["@_name"] = name;
        this.cell = cell;
    }
}

export class SavedqueryLayoutxmlGridRowCell implements ISavedqueryLayoutxmlGridRowCell {
    '@_name': string;
    '@_width': string;

    constructor(name: string, width: string) {
        this["@_name"] = name;
        this["@_width"] = width;
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