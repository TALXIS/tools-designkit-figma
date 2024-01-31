export interface IFormXml {
    forms: {
        systemform: {
            formid: string;
            IntroducedVersion: string;
            FormPresentation: number;
            FormActivationState: number;
            form: IFormType;
            IsCustomizable: number;
            CanBeDeleted: number;
            LocalizedNames: { LocalizedName: ILocalizedName[] | ILocalizedName };
        }
    };
}

export interface IFormType {
    // ancestor: FormTypeAncestor;
    // hiddencontrols: FormTypeData[];
    // controlDescriptions: { controlDescription: FormTypeControlDescription[] | FormTypeControlDescription };
    tabs: IFormTypeTabs;
    // header: FormXmlHeaderFooterType;
    // footer: FormXmlHeaderFooterType;
    // events: { event: FormXmlEventsTypeEvent[] | FormXmlEventsTypeEvent };
    //formLibraries: {Library: FormXmlLibraryTypeLibrary[] | FormXmlLibraryTypeLibrary};
    // externaldependencies: FormXmlExternalDependenciesTypeDependency[];
    // formparameters: FormQueryStringParameterType[];
    // clientresources: ClientResourcesType;
   // navigation: FormNavigationType;
    // displayConditions: FormDisplayConditionsType;
    // ribbonDiffXml: RibbonEntityDiffXmlType;
    //enablerelatedinformation: boolean;
    //enablerelatedinformationSpecified: boolean;
    // relatedInformationCollapsed: boolean;
    // relatedInformationCollapsedSpecified: boolean;
    // hasmargin: boolean;
    // hasmarginSpecified: boolean;
    // addedby: string;
    '@_shownavigationbar': boolean;
    '@_headerdensity': string;
    '@_showImage': boolean; 
    // maxWidth: string;
}

export interface IFormTypeTabs {
    tab: IFormTypeTabsTab[] | IFormTypeTabsTab;
    //filterby?: string;
    //dashboardCategory?: string;
    //timeframe?: string;
    //primaryentitylogicalname?: string;
    //entityview?: string;
    //tilespresent?: boolean;
    //tilespresentSpecified?: boolean;
}

export interface IFormTypeTabsTab {
    labels: {label: IFormXmlLabelsTypeLabel | IFormXmlLabelsTypeLabel[]};
    // '@_verticallayout': boolean;
    '@_name': string;
    '@_labelid': string;
    '@_id': string;
    '@_showlabel': boolean;
    // '@_isUserDefined': string;
    // '@_locklevel': string;
    // '@_expanded': boolean;
    // '@_visible'?: boolean;
    // tabheader?: FormXmlHeaderFooterType;
    // tabfooter?: FormXmlHeaderFooterType;
    columns?: { column: IFormTypeTabsTabColumn[] | IFormTypeTabsTabColumn };
    // events?: FormXmlEventsTypeEvent[];
    //group?: string;
    //addedby?: string;
    //availableforphone?: boolean;
    //'@_collapsible'?: boolean;
}

export interface IFormXmlLabelsTypeLabel {
    '@_description': string;
    '@_languagecode': string;
}

export interface IFormTypeTabsTabColumn {
    sections: IFormTypeTabsTabColumnSections;
    // '@_width': string;
}

export interface IFormTypeTabsTabColumnSections {
    section?: IFormTypeTabsTabColumnSectionsSection[] | IFormTypeTabsTabColumnSectionsSection;
}

export interface IFormTypeTabsTabColumnSectionsSection {
    '@_id': string;
    '@_name': string;
    '@_columns': string;
    '@_showlabel': boolean;
    '@_showbar': boolean;
    //'@_isUserDefined': string;
    //'@_locklevel': string;
    //'@_labelwidth': string;
    // '@_celllabelalignment': FormXmlHeaderFooterTypeCelllabelalignment;
    // '@_celllabelposition': FormXmlHeaderFooterTypeCelllabelposition;
    '@_labelid': string;
    labels: {label: IFormXmlLabelsTypeLabel | IFormXmlLabelsTypeLabel[]};
    rows?: IFormTypeTabsTabColumnSectionsSectionRows;
    // group?: string;
    // height?: string;
    // layout?: string;
    // visible?: boolean;
    // rowheight?: string;
    //autoexpand?: boolean;
    //availableforphone?: boolean;
}

export interface IFormTypeTabsTabColumnSectionsSectionRows {
    row: IFormTypeTabsTabColumnSectionsSectionRowsRow[] | IFormTypeTabsTabColumnSectionsSectionRowsRow;
}

export interface IFormTypeTabsTabColumnSectionsSectionRowsRow {
    cell: IFormTypeTabsTabColumnSectionsSectionRowsRowCell[] | IFormTypeTabsTabColumnSectionsSectionRowsRowCell;
    //height?: string;
}

export interface IFormTypeTabsTabColumnSectionsSectionRowsRowCell {
    '@_id': string;
    '@_labelid': string;
    '@_rowspan': string;
    '@_colspan': string;
    '@_showlabel': boolean;
    //'@_locklevel': string;
    labels: {label: IFormXmlLabelsTypeLabel[] | IFormXmlLabelsTypeLabel};
    control: IFormXmlControlType;
    //'@_visible'?: boolean;
    //'@_addedby'?: string;
    // events?: FormXmlEventsTypeEvent[];
    //'@_auto'?: boolean;
    //'@_userspacer'?: boolean;
    //'@_ispreviewcell'?: boolean;
    //availableforphone?: boolean;
    //isstreamcell?: boolean;
    //ischartcell?: boolean;
    //istilecell?: boolean;
}

export interface IFormXmlControlType {
    '@_id': string;
    '@_classid': string;
    '@_datafieldname'?: string;
    '@_disabled'?: boolean;
}

export interface ILocalizedName {
    '@_description': string;
    '@_languagecode': string;
}