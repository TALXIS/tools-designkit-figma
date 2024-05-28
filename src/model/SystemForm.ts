import { ILocalizedName } from "./interfaces/IAppModule";
import { IFormTypeTabs, IFormType, IFormXml, IFormTypeTabsTab, IFormTypeTabsTabColumn, IFormXmlLabelsTypeLabel, IFormTypeTabsTabColumnSections,
    IFormTypeTabsTabColumnSectionsSection, IFormTypeTabsTabColumnSectionsSectionRows, IFormTypeTabsTabColumnSectionsSectionRowsRow, 
    IFormTypeTabsTabColumnSectionsSectionRowsRowCell, IFormXmlControlType} from "./interfaces/IFormXML";

export class SystemForm implements IFormXml {
    forms: { systemform: { 
        formid: string;
        IntroducedVersion: string;
        FormPresentation: number;
        FormActivationState: number;
        form: FormType; 
        IsCustomizable: number;
        CanBeDeleted: number;
        LocalizedNames: { LocalizedName: LocalizedName[] | LocalizedName };
    }; };
    
    constructor(formtype: FormType, formID: string,localizatedNames: LocalizedName[]) {
        const systemform = <IFormXml> { forms: { systemform: {formid: formID,IntroducedVersion: "1.0.0.0",FormActivationState: 1, FormPresentation: 1,IsCustomizable: 1,CanBeDeleted: 1,form: formtype, LocalizedNames: {LocalizedName: localizatedNames}} }};
        this.forms = systemform.forms;
    }
}

export class FormType implements IFormType {
    '@_shownavigationbar': boolean;
    '@_headerdensity': string;
    '@_showImage': boolean; 
    tabs: FormTypeTabs;

    constructor(tabs: FormTypeTabs, showImage:boolean) {
        this["@_shownavigationbar"] = false;
        this["@_headerdensity"] = "HighWithControls";
        this["@_showImage"] = showImage;
        this.tabs = tabs;
    }
    
}

export class FormTypeTabs implements IFormTypeTabs {
    tab: FormTypeTabsTab | FormTypeTabsTab[];

    constructor(tab: FormTypeTabsTab | FormTypeTabsTab[]) {
        this.tab = tab;
    }
}

export class FormTypeTabsTab implements IFormTypeTabsTab {
    labels: { label: FormXmlLabelsTypeLabel | FormXmlLabelsTypeLabel[]; };
    columns?: { column: FormTypeTabsTabColumn | FormTypeTabsTabColumn[]; } | undefined;
    '@_name': string;
    '@_labelid': string;
    '@_id': string;
    '@_showlabel': boolean;

    constructor(id: string,name: string, labelID: string, labels: FormXmlLabelsTypeLabel[] | FormXmlLabelsTypeLabel, columns: FormTypeTabsTabColumn[]) {
        this["@_id"] = id;
        this["@_name"] = name;
        this["@_labelid"] = labelID;
        this["@_showlabel"] = true;
        const lbl = <IFormTypeTabsTab> { labels: { label: labels}};
        this.labels = lbl.labels;
        const clm = <IFormTypeTabsTab> { columns: {column: columns}};
        this.columns = clm.columns;
    }
}

export class FormTypeTabsTabColumn implements IFormTypeTabsTabColumn {
    sections: FormTypeTabsTabColumnSections;
    
    constructor(sections: FormTypeTabsTabColumnSections) {
        this.sections = sections;
    }
}

export class FormTypeTabsTabColumnSections implements IFormTypeTabsTabColumnSections {
    section?: FormTypeTabsTabColumnSectionsSection[] | FormTypeTabsTabColumnSectionsSection;

    constructor(section: FormTypeTabsTabColumnSectionsSection[] | FormTypeTabsTabColumnSectionsSection) {
        this.section = section;
    }
}

export class FormTypeTabsTabColumnSectionsSection implements IFormTypeTabsTabColumnSectionsSection {
    '@_id': string;
    '@_name': string;
    '@_columns': string;
    '@_showlabel': boolean;
    '@_showbar': boolean;
    '@_labelid': string;

    labels: {label: FormXmlLabelsTypeLabel | FormXmlLabelsTypeLabel[]};
    rows?: FormTypeTabsTabColumnSectionsSectionRows;

    constructor(id: string, name: string,columns: string, showlabel: boolean,showbar: boolean,labelID: string,labels: FormXmlLabelsTypeLabel[] | FormXmlLabelsTypeLabel,rows: FormTypeTabsTabColumnSectionsSectionRows) {
        this["@_id"] = id;
        this["@_name"] = name;
        this["@_columns"] = columns;
        this["@_showlabel"] = showlabel;
        this["@_showbar"] = showbar;
        this["@_labelid"] = labelID;

        const lbl = <IFormTypeTabsTabColumnSectionsSection> {labels: {label: labels}};
        this.labels = lbl.labels;
        this.rows = rows;
    }
}

export class FormTypeTabsTabColumnSectionsSectionRows implements IFormTypeTabsTabColumnSectionsSectionRows {
    row: FormTypeTabsTabColumnSectionsSectionRowsRow | FormTypeTabsTabColumnSectionsSectionRowsRow[];
    
    constructor(row: FormTypeTabsTabColumnSectionsSectionRowsRow[]) {
        this.row = row;
    }
}

export class FormTypeTabsTabColumnSectionsSectionRowsRow implements IFormTypeTabsTabColumnSectionsSectionRowsRow {
    cell: FormTypeTabsTabColumnSectionsSectionRowsRowCell | FormTypeTabsTabColumnSectionsSectionRowsRowCell[];
    
    constructor(cell: FormTypeTabsTabColumnSectionsSectionRowsRowCell[] | FormTypeTabsTabColumnSectionsSectionRowsRowCell) {
        this.cell = cell;
    }
}

export class FormTypeTabsTabColumnSectionsSectionRowsRowCell implements IFormTypeTabsTabColumnSectionsSectionRowsRowCell {
    '@_id': string;
    '@_labelid': string;
    '@_rowspan': string;
    '@_colspan': string;
    '@_showlabel': boolean;
    control: FormXmlControlType;
    labels: {label: FormXmlLabelsTypeLabel[] | FormXmlLabelsTypeLabel};

    constructor(id: string, labelID: string, rowspan: string, colspan: string, showlabel: boolean,labels: FormXmlLabelsTypeLabel[] | FormXmlLabelsTypeLabel, control: FormXmlControlType) {
        this["@_id"] = id;
        this["@_labelid"] = labelID;
        this["@_rowspan"] = rowspan;
        this["@_colspan"] = colspan;
        this["@_showlabel"] = showlabel;

        this.control = control;

        const lbl = <IFormTypeTabsTabColumnSectionsSectionRowsRowCell> { labels: {label: labels}};
        this.labels = lbl.labels;
    }

}

export class FormXmlLabelsTypeLabel implements IFormXmlLabelsTypeLabel {
    '@_description': string;
    '@_languagecode': string;

    constructor(dscr: string, languagecode: string) {
        this["@_description"] = dscr;
        this["@_languagecode"] = languagecode;
    }
}

export class FormXmlControlType implements IFormXmlControlType {
    '@_id': string;
    '@_classid': string;
    '@_datafieldname'?: string;
    '@_disabled'?: boolean;

    constructor(id: string, classID: string,datafieldname: string, disabled: boolean) {
        this["@_id"] = id;
        this["@_classid"] = classID;
        this["@_datafieldname"] = datafieldname;
        this["@_disabled"] = disabled;
    }
}

export class LocalizedName implements ILocalizedName {
    '@_description': string;
    '@_languagecode': string;

    constructor(dscr: string, languageCode: string) {
        this["@_description"] = dscr;
        this["@_languagecode"] = languageCode;
    }
}