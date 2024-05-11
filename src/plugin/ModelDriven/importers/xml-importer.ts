import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { ModelDrivenScreen } from "../../../model/ModelDrivenScreen";
import { AttributeDescription, DescriptionParam, DisplayNameParam, OptionSetLabel, OptionSetType, OptionSets, OptionstypeOption } from "../../../model/OptionSets";
import { SiteMap,SiteMapType,SiteMapTypeArea,SiteMapTypeAreaGroup, SiteMapTypeAreaGroupSubArea, TitleValue, TitlesType_SiteMapTitle } from "../../../model/SiteMap";
import { OptionSetEnumType, TrueFalse01Type } from "../../../model/interfaces/IOptionSets";
import { CustomAttribute, CustomOrder, FetchType, SavedQuery,SavedqueryFetchxml,SavedqueryLayoutxml,SavedqueryLayoutxmlGrid,SavedqueryLayoutxmlGridRow,SavedqueryLayoutxmlGridRowCell,savedQuery } from "../../../model/SavedQuery";
import { FormType, FormTypeTabs, FormTypeTabsTab, FormTypeTabsTabColumn, FormTypeTabsTabColumnSections, FormTypeTabsTabColumnSectionsSection, FormTypeTabsTabColumnSectionsSectionRows, FormTypeTabsTabColumnSectionsSectionRowsRow, FormTypeTabsTabColumnSectionsSectionRowsRowCell, FormXmlControlType, FormXmlLabelsTypeLabel, LocalizedName, SystemForm } from "../../../model/SystemForm";
import { Entity, EntityAttribute, EntityInfoType, EntityInfoTypeEntity } from "../../../model/Entity";
import { Guid } from "typescript-guid";


export function importXMLFiles(file: any) {
    const modelDrivenScreens: ModelDrivenScreen[] = []; 
    var convert = require('xml-js');
    
    const options = {
        ignoreAttributes: false,
        format: true,
        suppressBooleanAttributes: false,
        suppressEmptyNode: true, 
        suppressUnpairedNode: false
    };
    const parser = new XMLParser(options);
    const builder = new XMLBuilder({ignoreAttributes: false,format: true, suppressBooleanAttributes: false, suppressEmptyNode: true, suppressUnpairedNode: false});

    let jObj = parser.parse(file);
    
    const xmlContent = builder.build(jObj);

    var json = convert.xml2json(xmlContent, {compact: true, spaces: 4});
    const output =JSON.parse(json);

    if(output != undefined || output != null) {
        const parentObject = output.ImportExportXml;
        
        if(parentObject != undefined) {
            const optionSets: OptionSets[] = [];

            loadOptionSets(parentObject.optionsets,optionSets);
            
            const siteMap = loadSiteMap(parentObject.AppModuleSiteMaps);
            const entity = loadEntity(parentObject.Entities);
            const savedQuery = loadSavedQuery(parentObject.Entities);
            const form = loadForm(parentObject.Entities);

            if(entity != undefined && siteMap != undefined) {
                const appName = parentObject.AppModules.AppModule.UniqueName._text;
                const modelDrivenScreen = new ModelDrivenScreen(entity,siteMap,savedQuery,optionSets,form,appName);
                modelDrivenScreens.push(modelDrivenScreen);

            } else figma.notify("Imported XML has undefined Entity or SiteMap");

        } else figma.notify("Imported XML does not contain 'ImportExportXml' tag");
    } else figma.notify("Imported XML is undefined");
    return modelDrivenScreens;
}

function loadOptionSets(optionsets: any, options: OptionSets[]) {
    if(optionsets != undefined) {
        const sets = optionsets.optionset;

        if(Array.isArray(sets)) {
            sets.forEach((el: any) => {
                options.push(addOptionValues(el));
            });
        } else {
            options.push(addOptionValues(sets));
        }
        createCollections(options);
    }
}
function addOptionValues(element: any): OptionSets {
    const optionSetTypes: OptionSetType[] = [];
    const atributes = element._attributes;
    const name = atributes.Name;
    const displayName = atributes.localizedName;
    const description = element.Descriptions.Description._attributes.description;
    const display = element.displaynames.displayname._attributes.description;
    
    const optionValues: OptionstypeOption[] = [];
    const opts = element.options.option;

    if(opts != undefined) {
        opts.forEach((el: any) => {
            const value = el._attributes.value;
            const color = el._attributes.Color;
            const label = el.labels.label._attributes.description;

            const optLabel = new OptionSetLabel(new AttributeDescription(label,"1033"));

            const opt = new OptionstypeOption(value,optLabel,undefined,color);
            optionValues.push(opt);
        });
    }
    
    const displayParam = new DisplayNameParam(new AttributeDescription(display, "1033"));
    const descriptionParam = new DescriptionParam(new AttributeDescription(description, "1033"));
    const optionSetType = new OptionSetType(name,displayName, OptionSetEnumType.picklist, TrueFalse01Type.Item1, "1.0.0.0", displayParam, descriptionParam, optionValues);
    
    optionSetTypes.push(optionSetType);
    const option = new OptionSets(optionSetTypes);
    return option;
}

function createCollections(options: OptionSets[]) {
    const collection = figma.variables.createVariableCollection("OptionSets");
    collection.renameMode(collection.modes[0].modeId, "Default");
    const enModeId = collection.modes[0].modeId;
    options.forEach(option => {
        const sets = option.optionsets.optionset;

        if(Array.isArray(sets)) {
            sets.forEach(element => {
                addVariable(element, collection, enModeId);
            });
        } else {
            addVariable(sets, collection, enModeId);
        }
    });
    if(options != undefined && options.length > 0) figma.notify("Local variables added in your Figma file");
}

function addVariable(element: OptionSetType, collection: VariableCollection, enModeId: string) {
    const options = element.options;
    if (options != undefined) {
        if (Array.isArray(options.option)) {
            options.option.forEach(opt => {
                const variable = figma.variables.createVariable(element["@_localizedName"], collection.id, 'STRING');
                variable.name = element["@_localizedName"] + "/" + opt["@_value"];
                const val = Array.isArray(opt.labels.label) ? opt.labels.label[0]["@_description"] : opt.labels.label["@_description"];
                variable.setValueForMode(enModeId, val);
            });
        } else {
            const variable = figma.variables.createVariable(element["@_localizedName"], collection.id, 'STRING');
            variable.name = element["@_localizedName"] + "/" + options.option["@_value"];
            const val = Array.isArray(options.option.labels.label) ? options.option.labels.label[0]["@_description"] : options.option.labels.label["@_description"];
            variable.setValueForMode(enModeId, val);
        }
    }
}

function loadSiteMap(AppModuleSiteMaps: any) {
    if(AppModuleSiteMaps != undefined) {
        const moduleSiteMap = AppModuleSiteMaps.AppModuleSiteMap;

        if(moduleSiteMap != undefined) {
            const uniqueName = moduleSiteMap.SiteMapUniqueName._text;
            const showHome = moduleSiteMap.ShowHome._text == "True" ? true : false;
            const showPinned = moduleSiteMap.ShowPinned._text == "True" ? true : false;
            const showRecents = moduleSiteMap.ShowRecents._text == "True" ? true : false;

            const siteMap = moduleSiteMap.SiteMap;
            if(siteMap != undefined) {
                const areas:  SiteMapTypeArea[] = [];
                const areaName = siteMap.Area.Titles.Title._attributes.Title;
                const areaID = siteMap.Area._attributes.Id;

                const group = siteMap.Area.Group;
                const groups: SiteMapTypeAreaGroup[] = [];

                if(Array.isArray(group)) {
                    group.forEach(element => {
                        fillGroup(element, groups);
                    })
                } else {
                    fillGroup(group,groups);
                }

                const titleAreas: TitlesType_SiteMapTitle[] = [];
                const titleAreaValue = new TitleValue("1033",areaName);
                titleAreas.push(new TitlesType_SiteMapTitle(titleAreaValue));

                const area = new SiteMapTypeArea(areaID,titleAreas,groups);
                areas.push(area);
                const sitemapType = new SiteMapType(areas);
                return new SiteMap(uniqueName,showHome,showPinned,showRecents,sitemapType);
            } 
        }
    }
}

function fillGroup(element: any, groups: SiteMapTypeAreaGroup[]) {
    const id = element._attributes.Id;
    const title = element.Titles.Title._attributes.Title;

    const titleGroup: TitlesType_SiteMapTitle[] = [];
    const titleGroupValue = new TitleValue("1033",title);
    titleGroup.push(new TitlesType_SiteMapTitle(titleGroupValue));

    const subAreas: SiteMapTypeAreaGroupSubArea[] = [];

    const subArea = element.SubArea;
    if (Array.isArray(subArea)) {
        subArea.forEach(elem => {
            const subAreaID = elem._attributes.Id;
            if(elem.Titles != undefined) {
                const subAreaTitle = elem.Titles.Title._attributes.Title;

                const titleSubAreas: TitlesType_SiteMapTitle[] = [];
                const titleSubAreaValue = new TitleValue("1033",subAreaTitle);
                titleSubAreas.push(new TitlesType_SiteMapTitle(titleSubAreaValue));
                const subA = new SiteMapTypeAreaGroupSubArea(subAreaID, titleSubAreas);
                subAreas.push(subA);
            }
        });
    } else {
        const subAreaID = subArea._attributes.Id;
        if(subArea.Titles != undefined) {
            const subAreaTitle = subArea.Titles.Title._attributes.Title;

            const titleSubAreas: TitlesType_SiteMapTitle[] = [];
            const titleSubAreaValue = new TitleValue("1033",subAreaTitle);
            titleSubAreas.push(new TitlesType_SiteMapTitle(titleSubAreaValue));

            const subA = new SiteMapTypeAreaGroupSubArea(subAreaID, titleSubAreas);
            subAreas.push(subA);
        }
    }

    const group = new SiteMapTypeAreaGroup(id, titleGroup, subAreas);
    groups.push(group);
}

function loadEntity(Entities: any) {
    if(Entities != undefined) {
        const entity = Entities.Entity;
        if(entity != undefined) {
            const entityInfo = entity.EntityInfo.entity;
            
            const name = entityInfo.EntitySetName._text;
            const localizedName = entityInfo.LocalizedNames.LocalizedName._attributes.description;
            const dscr = entityInfo.Descriptions.Description._attributes.description;

            const attributes: EntityAttribute[] = [];
            addAttributes(entityInfo.attributes,attributes);

            const info = new EntityInfoTypeEntity(name,dscr,localizedName,attributes);
            const entityInfoType = new EntityInfoType(info);
            return new Entity(name,entityInfoType);
        }
    }
}

function loadSavedQuery(Entities: any) {
    if(Entities != undefined) {
        const entity = Entities.Entity;
        if(entity != undefined) {
            const savedQuery = addSavedQuery(entity.SavedQueries);
            return savedQuery;
        }
    }
}

function loadForm(Entities: any) {
    if(Entities != undefined) {
        const entity = Entities.Entity;
        if(entity != undefined) {
            const forms = entity.FormXml.forms;
            const formXML: SystemForm[] = [];
            if (Array.isArray(forms)) {
                forms.forEach(form => {
                    addForm(form, formXML);
                })
            } else {
                    addForm(forms, formXML);
            }
            return formXML[0];
        }
    }
}

function addForm(form: any, formXML: SystemForm[]) {
    const type = form._attributes.type;
    if (type == "main") {
        const formID = form.systemform.formid._text;
        const name = form.systemform.LocalizedNames.LocalizedName._attributes.description;
        const frm = form.systemform.form;
        if (frm != undefined) {
            const tabs = frm.tabs;

            const tbs = addTab(tabs);
            const formTab = new FormTypeTabs(tbs);
            const formType = new FormType(formTab,true);

            const localizatedName = new LocalizedName(name,"1033");
            const localizatedNames: LocalizedName[] = [localizatedName];
            
            const form = new SystemForm(formType,formID,localizatedNames);
            formXML.push(form);
        }
    }
}

function addTab(tabs: any) {
    const tab = tabs.tab;
    const id = tab._attributes.id;
    const name = tab._attributes.name;
    const labelName = tab.labels.label._attributes.description;

    const columns = tab.columns.column;
    const colmns: FormTypeTabsTabColumn[] = [];
    if (Array.isArray(columns)) {
        columns.forEach(element => {
            addColumn(element, colmns);
        });
    } else {
        addColumn(columns, colmns);
    }
    const label = new FormXmlLabelsTypeLabel(labelName,"1033");
    return new FormTypeTabsTab(id, name,Guid.create().toString(),label, colmns);
}

function addColumn(columns: any, colmns: FormTypeTabsTabColumn[]) {
    const sections = columns.sections.section;

    const sctions: FormTypeTabsTabColumnSectionsSection[] = [];
    if (Array.isArray(sections)) {
        sections.forEach(element => {
            addSection(element, sctions);
        });
    } else {
        addSection(sections, sctions);
    }
    const columnSections = new FormTypeTabsTabColumnSections(sctions);
    const column = new FormTypeTabsTabColumn(columnSections);
    colmns.push(column);
}

function addSection(sections: any, sctions: FormTypeTabsTabColumnSectionsSection[]) {
    const id = sections._attributes.id;
    const label = sections.labels.label._attributes.description;
    const rows = sections.rows.row;

    const rws: FormTypeTabsTabColumnSectionsSectionRowsRow[] = [];
    if (Array.isArray(rows)) {
        rows.forEach(element => {
            addRow(element, rws);
        });
    } else {
        addRow(rows, rws);
    }
    const labels = new FormXmlLabelsTypeLabel(label,"1033");
    const sectionRows = new FormTypeTabsTabColumnSectionsSectionRows(rws);
    const section = new FormTypeTabsTabColumnSectionsSection(id,label,String(1),true,false,Guid.create().toString(),labels, sectionRows);
    sctions.push(section);
}

function addRow(element: any, rws: FormTypeTabsTabColumnSectionsSectionRowsRow[]) {
    const cell = element.cell;
    const id = cell._attributes.id;
    const rowSpan = cell._attributes.rowspan;
    const colSpan = cell._attributes.colspan;
    const label = cell.labels.label._attributes.description;

    const control = cell.control;
    const controlID = control._attributes.id;
    const controlClass = control._attributes.classid;
    const controlFieldName = control._attributes.datafieldname;

    const cntrl = new FormXmlControlType(controlID, controlClass, controlFieldName,false);
    
    const cellLabels: FormXmlLabelsTypeLabel[] = [];

    const cellLabel = new FormXmlLabelsTypeLabel(label,"1033");
    cellLabels.push(cellLabel);
    const cll = new FormTypeTabsTabColumnSectionsSectionRowsRowCell(id,Guid.create().toString(),rowSpan,colSpan,true, cellLabels, cntrl);

    const rowCell = new FormTypeTabsTabColumnSectionsSectionRowsRow(cll);

    rws.push(rowCell);
}

function addSavedQuery(SavedQueries: any) {
    let result;
    if(SavedQueries != undefined) {
        const queries = SavedQueries.savedqueries;
        const savedQ = queries.savedquery;
        if(savedQ != undefined) {
            if(Array.isArray(savedQ)) {
                savedQ.forEach(query=> {
                    const isDefault = query.isdefault._text;
                    const queryType = query.querytype._text;
                    if(isDefault == "1" && queryType == "0") {
                        const queryID = query.savedqueryid._text;
                        const queryName = query.LocalizedNames.LocalizedName._attributes.description;
                        const grid = query.layoutxml.grid;
                        const fetch = query.fetchxml.fetch;
                        
                        if(grid != undefined && fetch != undefined) {
                            const entityName = fetch.entity._attributes.name;
                            const order = fetch.entity.order;
                            const customorder = new CustomOrder(order._attributes.attribute,"false");
                            
                            const attributes: CustomAttribute[] = [];
                            
                            const attrs = fetch.entity.attribute;
                            if(Array.isArray(attrs)) {
                                attrs.forEach(val=> {
                                    const attribute = new CustomAttribute(val._attributes.name);
                                    attributes.push(attribute);
                                });
                            }
                            
                            const row = grid.row;
                            if(row != undefined) {
                                const rowID = row._attributes.id;
                                const rowName = row._attributes.name;
                                const cell = row.cell;
                                
                                const cells: SavedqueryLayoutxmlGridRowCell[] = [];
                                
                                if(Array.isArray(cell)) {
                                    cell.forEach(val=> {
                                        const name = val._attributes.name;
                                        const width = val._attributes.width;
                                        
                                        const cell = new SavedqueryLayoutxmlGridRowCell(name,width);
                                        cells.push(cell);
                                    });
                                }
                                
                                const gridRow = new SavedqueryLayoutxmlGridRow(rowID,rowName,cells);
                                const grd = new SavedqueryLayoutxmlGrid("resultset","1","1","1",cells[0]["@_name"],gridRow);
                                
                                const fetchType = new FetchType("1.0",entityName,attributes,customorder);
                                const fetchXML = new SavedqueryFetchxml(fetchType);
                                const layoutXML = new SavedqueryLayoutxml(grd);
                                
                                const localizatedNames: LocalizedName[] = [];
                                const locName = new LocalizedName(queryName,"1033");
                                localizatedNames.push(locName);
                                
                                const query = new savedQuery(queryID,0,layoutXML,fetchXML,"1","0","1.0.0","0","0","0",localizatedNames);
                                result = new SavedQuery(query);
                            }
                        }
                    }
                });
            }
        }
    }
    return result;
}

function addAttributes(attr: any, attributes: EntityAttribute[]) {
    if(attr != undefined) {
        const attribute = attr.attribute;

        if(Array.isArray(attribute)) {
            attribute.forEach(element => {
                const physicalName = element._attributes.PhysicalName;
                const displayName = element.displaynames.displayname._attributes.description;
                const logicalName = element.LogicalName;

                const attributeValue = new EntityAttribute(physicalName,displayName,logicalName,"none",undefined,new DisplayNameParam(new AttributeDescription(displayName,"1033")));
                attributes.push(attributeValue);
            });
        }
    }
}
