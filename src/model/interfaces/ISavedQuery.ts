export interface ISavedQuery {
    savedqueries: {
        '@_xmlns:xsi': string;
        savedquery: savedquery;
    }
}

export interface savedquery {
    savedqueryid: string;
    querytype: number;
    layoutxml: ISavedqueryLayoutxml;
    fetchxml: ISavedqueryFetchxml;
    IsCustomizable: string;
    CanBeDeleted: string;
    IntroducedVersion: string;
    isquickfindquery: string;
    isdefault: string;
    isprivate: string;
    LocalizedNames: { LocalizedName: ILocalizedName[] };
}

export interface ISavedqueryLayoutxml {
    grid: ISavedqueryLayoutxmlGrid;
}

export interface ISavedqueryFetchxml {
    fetch: IFetchType;
}

export interface IFetchType {
    '@_version': string;
    '@_output-format': string;
    '@_mapping': string;
    entity: {
        '@_name':string;
        attribute: ICustomAttribute[] | ICustomAttribute;
        order: ICustomOrder;
    }
}

export interface ICustomAttribute {
    '@_name': string
}

export interface ICustomOrder {
    '@_attribute': string
    '@_descending': string
}

export interface ISavedqueryLayoutxmlGrid {
    row: ISavedqueryLayoutxmlGridRow;
    '@_name': string;
    '@_select': string;
    '@_preview': string;
    '@_icon': string;
    '@_jump': string;
}

export interface ISavedqueryLayoutxmlGridRow {
    cell: ISavedqueryLayoutxmlGridRowCell[];
    '@_name': string;
    '@_id': string;
}

export interface ISavedqueryLayoutxmlGridRowCell {
    '@_name': string;
    '@_width': string;
}

export interface ILocalizedName {
    '@_description': string;
    '@_languagecode': string;
}