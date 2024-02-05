import { findNodeByNameAndParentID, findNodesByNameAndParentID, getPropertyValue } from "./util";
import { SiteMap,SiteMapType, SiteMapTypeArea, SiteMapTypeAreaGroup, SiteMapTypeAreaGroupSubArea, TitleValue, TitlesType_SiteMapTitle } from "../model/SiteMap";
import { FormType, FormTypeTabs, FormTypeTabsTab, FormTypeTabsTabColumn, FormTypeTabsTabColumnSections, FormTypeTabsTabColumnSectionsSection, FormTypeTabsTabColumnSectionsSectionRows, FormTypeTabsTabColumnSectionsSectionRowsRow, FormTypeTabsTabColumnSectionsSectionRowsRowCell, FormXmlControlType, FormXmlLabelsTypeLabel, SystemForm } from "../model/SystemForm";
import { CustomAttribute, CustomOrder, FetchType, LocalizedName, SavedQuery, SavedqueryFetchxml, SavedqueryLayoutxml, SavedqueryLayoutxmlGrid, SavedqueryLayoutxmlGridRow, SavedqueryLayoutxmlGridRowCell, savedQuery } from "../model/SavedQuery";
import { ControlTypes } from "../model/types/ControlTypes";

import { Guid } from "typescript-guid";

export function nodeToXML(node: SceneNode,componentName: string) {
    switch (componentName) {
        case "SiteMap": {
            const areas:  SiteMapTypeArea[] = [];
            const componentProperties = (node as InstanceNode).componentProperties;
            var name = undefined;
            if(componentProperties != undefined) {
                name = getPropertyValue(componentProperties,"Unique name");
            }
            const uniqueName = name != undefined ? name : "ntg_sitemap";

            var areaNode = findNodeByNameAndParentID("Area",node.id);
            if(areaNode != null) {
                const titleAreas: TitlesType_SiteMapTitle[] = [];
                
                const areaTitle = (findNodeByNameAndParentID("Title",areaNode.id)as TextNode).characters;
                const areaid = areaTitle.toLowerCase().replaceAll(" ","");
                const titleAreaValue = new TitleValue("1033",areaTitle);
                titleAreas.push(new TitlesType_SiteMapTitle(titleAreaValue));
                
                const groups: SiteMapTypeAreaGroup[] = [];
                const groupNodes = findNodesByNameAndParentID("[Group]",node.id);
                
                groupNodes.forEach(node => {
                    const titleGroups: TitlesType_SiteMapTitle[] = [];
                    const groupTitle = (findNodeByNameAndParentID("Title",node.id)as TextNode).characters;
                    const idGroup = groupTitle.toLowerCase().replaceAll(" ","");
                    const titleGroupValue = new TitleValue("1033",groupTitle);
                    const subAreas: SiteMapTypeAreaGroupSubArea[] = [];
                    
                    const subAreaNodes = findNodesByNameAndParentID("[SubArea]",node.id);
                    subAreaNodes.forEach(node => {
                        const titleSubAreas: TitlesType_SiteMapTitle[] = [];
                        if(node != null) {
                            const subAreaTitle = (findNodeByNameAndParentID("Title",node.id)as TextNode).characters;
                            const idSubArea = subAreaTitle.toLowerCase().replaceAll(" ","");
                            const titleSubAreaValue = new TitleValue("1033",subAreaTitle);
                            
                            var entityIDValue = undefined;
                            const entityIDNode = findNodeByNameAndParentID("[AttributeEntityID]",node.id);
                            if(entityIDNode != undefined) {
                                const entityID = (entityIDNode as TextNode).characters;

                                if(entityID != "ntg_id_entity") {
                                    entityIDValue = entityID;
                                }
                            }
                            titleSubAreas.push(new TitlesType_SiteMapTitle(titleSubAreaValue));

                            const subArea = new SiteMapTypeAreaGroupSubArea(idSubArea,titleSubAreas,entityIDValue);
                            subAreas.push(subArea);
                        }
                    });
                    titleGroups.push(new TitlesType_SiteMapTitle(titleGroupValue));

                    groups.push(new SiteMapTypeAreaGroup(idGroup,titleGroups,subAreas));
                    
                });
                areas.push(new SiteMapTypeArea(areaid,titleAreas,groups));
            }
            const outputSiteMap = new SiteMap(uniqueName,true,true,true,new SiteMapType(areas));
            console.info(outputSiteMap);
            return outputSiteMap;
        }
        case "Form": {
            const columns: FormTypeTabsTabColumn[] = [];
            const columnLabels: FormXmlLabelsTypeLabel[] = [];
            let form;
            let headerName;

            const headerNode = findNodeByNameAndParentID("[Header]",node.id);
            if(headerNode != undefined) {
                const titlesNode = findNodeByNameAndParentID("[Titles]",headerNode.id);
                if(titlesNode != undefined) {
                    const headerNameNode = findNodeByNameAndParentID("[HeaderName]",titlesNode.id);
                    if(headerNameNode != undefined) {
                        headerName = (headerNameNode as TextNode).characters;
                    }
                }
            }

            const columnsNode = findNodeByNameAndParentID("[Columns]",node.id);
            if(columnsNode != null) {
                const columnNodes = findNodesByNameAndParentID("[Column]",columnsNode.id);
                var colNum = 0;
                columnNodes.forEach(node => {
                    if(node != null) {
                        const visible = (node as FrameNode).visible;
                        if(visible == false) return;
                        columnLabels.push(new FormXmlLabelsTypeLabel(node.name,"1033"));
                        
                        const sectionNodes = findNodesByNameAndParentID("[Section]",node.id);
                        const sections: FormTypeTabsTabColumnSectionsSection[] = [];
                        if(sectionNodes != null) {
                            sectionNodes.forEach(section => {
                                const visible = (section as FrameNode).visible;
                                if(visible == false) return;
                                const rowsNode = findNodeByNameAndParentID("[Rows]",section.id);
                                const rowsNodes = (rowsNode as InstanceNode).children;
                                
                                const rows: FormTypeTabsTabColumnSectionsSectionRowsRow[] = [];
                                var rowNum = 0;
                                if(rowsNodes != null) {
                                    rowsNodes.forEach(row => {
                                        //var objects = (row as InstanceNode).componentProperties;

                                        const cell = getCellbyFieldName(row.name,row.id,colNum,rowNum);
                                        if(cell != undefined) {
                                            const rowCell = new FormTypeTabsTabColumnSectionsSectionRowsRow(cell);
                                            rows.push(rowCell);
                                        }
                                        rowNum = rowNum + 1;
                                    });
                                    const sectionNameNode = findNodeByNameAndParentID("[SectionName]",section.id);
                                    if(sectionNameNode != null) {
                                        const sectionName = (findNodeByNameAndParentID("[name]",sectionNameNode.id)as TextNode).characters;
                                        const name = sectionName.replace(' ','_');
                                        const label = new FormXmlLabelsTypeLabel(sectionName,"1033");
                                        const sectionRows = new FormTypeTabsTabColumnSectionsSectionRows(rows);
                                        const section = new FormTypeTabsTabColumnSectionsSection(Guid.create().toString(),name,String(1),true,false,Guid.create().toString(),label,sectionRows);
                                        sections.push(section);
                                    }
                                }
                            });
                        }
                        const columnSections = new FormTypeTabsTabColumnSections(sections);
                        const column = new FormTypeTabsTabColumn(columnSections);
                        columns.push(column);
                    }
                    colNum = colNum + 1;
                });
                var tabTitle = "";
                const tabsNode = findNodeByNameAndParentID("[Tabs]",node.id);
                if(tabsNode != null) {
                    const tabNodes = findNodesByNameAndParentID("[Tab]",tabsNode.id);
                    tabNodes.forEach(node => {
                        if(node != null) {
                            var selectedTabNode = findNodeByNameAndParentID("[Select]",node.id);
                            if(selectedTabNode != null) {
                                tabTitle = (findNodeByNameAndParentID("Label",selectedTabNode.id)as TextNode).characters;
                                const tabName = tabTitle.toUpperCase() + "_TAB";
                                const label = new FormXmlLabelsTypeLabel(tabTitle,"1033");
                                const tab = new FormTypeTabsTab(Guid.create().toString(),tabName,Guid.create().toString(),label,columns);
                                
                                const formTab = new FormTypeTabs(tab);
                                form = new FormType(formTab,true);
                                return;
                            }
                        }
                    });
                    if(form != undefined) {
                        const localizatedNameValue = headerName != null || headerName != undefined ? headerName : "";
                        const localizatedName = new LocalizedName(localizatedNameValue,"1033");

                        const localizatedNames: LocalizedName[] = [localizatedName];
                        const systemForm = new SystemForm(form,"{"+Guid.create().toString()+"}",localizatedNames);
                        console.info(systemForm);
                        return systemForm;
                    }
                }
            }
            break;
        } 
        case "SavedQuery": {
            const headerNode = findNodeByNameAndParentID("[Header]",node.id);

            const headerCompProperties = (headerNode as InstanceNode).componentProperties;
            const rowID = getPropertyValue(headerCompProperties,"Row id");

            const gridNode = findNodeByNameAndParentID("[Grid]",node.id);

            if(headerNode != undefined) {
                const headerNameNode = findNodeByNameAndParentID("[SavedQueryHeader]",headerNode.id);
                if(headerNameNode != undefined) {
                    const localizatedNameNode = findNodeByNameAndParentID("[Title]",headerNameNode.id);
                    
                    const localizatedNames: LocalizedName[] = [];

                    const localizatedName = (localizatedNameNode as TextNode).characters;
                    if(localizatedName != undefined) {
                        const locName = new LocalizedName(localizatedName,"1033");
                        localizatedNames.push(locName);
                    }
                    const savedQueryID = "{" + Guid.create() + "}";

                    if(gridNode != undefined) {
                        const columnNodes = findNodesByNameAndParentID("[Column]",gridNode.id);
                        const cells: SavedqueryLayoutxmlGridRowCell[] = [];
                        const attributes: CustomAttribute[] = [];
                        
                        if(columnNodes != undefined) {
                            columnNodes.forEach(columnNode => {
                                const headerColumnNode = (columnNode as InstanceNode).children;
                                const componentProperties = (headerColumnNode[0] as InstanceNode).componentProperties;

                                const logicalName = getPropertyValue(componentProperties,"Logical name");
                                if(logicalName != undefined) {
                                    const cell = new SavedqueryLayoutxmlGridRowCell(logicalName,"100");
                                    const attribute = new CustomAttribute(logicalName);

                                    cells.push(cell);
                                    attributes.push(attribute);
                                }
                            });
                        }
                        const rowIDValue = rowID != undefined ? rowID : "ntg_entityid";
                        const entityValue = rowIDValue.substring(0,rowIDValue.length - 2);
                        const row = new SavedqueryLayoutxmlGridRow(rowIDValue,"result",cells);

                        const grid = new SavedqueryLayoutxmlGrid("resultset","1","1","1",cells[0]["@_name"],row);
                        const layoutxml = new SavedqueryLayoutxml(grid);

                        const order = new CustomOrder(attributes[0]["@_name"],"false");
                        const fetchType = new FetchType("1.0",entityValue,attributes,order);
                        const fetchXML = new SavedqueryFetchxml(fetchType);

                        const query = new savedQuery(savedQueryID.toString(),0,layoutxml,fetchXML,"1","0","1.0.0","0","0","0",localizatedNames);
                        const output = new SavedQuery(query);
                        console.info(output);

                        return output;
                    }
                }
            }
        }   
    }
}

function getCellbyFieldName(name: string, nodeID: string,colNum: number, rowNum: number) {
    const labelsNode = findNodeByNameAndParentID("[Labels]",nodeID);
    if(labelsNode != null) {
        const cellLabel = (findNodeByNameAndParentID("[Label]",labelsNode.id)as TextNode).characters;
        var classID = "";
        
        const type = name.substring(name.indexOf("["),name.indexOf("]")).substring(1);
        switch(type) {
            case "Text": {
                classID = ControlTypes.SingleText;
                break;
            }
            case "Number": {
                classID = ControlTypes.Number;
                break
            }
            case "DateTime": {
                classID = ControlTypes.Date;
                break
            }
            case "Choice": {
                classID = ControlTypes.OptionSet;
                break;
            }
            case "Autonumber": {
                classID = ControlTypes.UniqueID;
                break;
            }
            case "Lookup": {
                classID = ControlTypes.Lookup;
                break;
            }
        }
        const controlID = cellLabel.replace(' ','').toLowerCase();
        const control = new FormXmlControlType(controlID,classID,controlID,false);
        const label = new FormXmlLabelsTypeLabel(cellLabel,"1033");
        
        return new FormTypeTabsTabColumnSectionsSectionRowsRowCell(Guid.create().toString(),Guid.create().toString(),rowNum.toString(),colNum.toString(),true,label,control);
    }
    return undefined;
}