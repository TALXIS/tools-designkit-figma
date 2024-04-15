import { ModelDrivenScreen} from "../../../model/ModelDrivenScreen";
import { findLastX, formatDate, isDate, showIcon } from "../../../util/utils";
import { addArea, addHeader, addHeaderForm, addIconRows, addItem, addMenuItem, addNavigationContent, addTextFromGridRows, addTextRows } from "../importers/driven-importer";
import {hexToRGBA, hexToRgb} from '../../../util/colorUtil';
import { SiteMap, SiteMapTypeAreaGroup } from "../../../model/SiteMap";
import { CustomAttribute, FetchType, SavedQuery, SavedqueryLayoutxmlGrid, savedQuery } from "../../../model/SavedQuery";
import { Grid } from "../../../model/Grid";
import { FormTypeTabsTabColumnSectionsSectionRowsRow, FormTypeTabsTabColumnSectionsSectionRowsRowCell, SystemForm } from "../../../model/SystemForm";


export function parseModelDrivenScreen(modelDrivenScreen: ModelDrivenScreen) {
    const background = hexToRgb("#FFFFFF");
    const textColor = hexToRgb("#000000");
    const topColor = hexToRgb("#6B2C70");
    const menucolor = hexToRgb("#EDEBE9");

    const lastX = findLastX();

    const frame = figma.createFrame();
    frame.x = Number(lastX);
    frame.y = 0;
    frame.name = modelDrivenScreen.appName;
    frame.resize(1920, 1080);
    frame.cornerRadius = 0;
    frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    frame.layoutMode = 'VERTICAL';
    frame.counterAxisAlignItems = 'MIN';
    frame.itemSpacing = 0;

    addNavigationContent(frame,background,textColor,topColor,modelDrivenScreen.appName);
    
    const pageContent = figma.createFrame();
    pageContent.name = "Page Content";
    pageContent.resize(frame.width,frame.height);
    pageContent.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    pageContent.layoutMode = 'HORIZONTAL';
    pageContent.counterAxisAlignItems = 'MIN';

    addSiteMapContent(pageContent,background,textColor,menucolor,modelDrivenScreen.siteMap);
    if(modelDrivenScreen.savedQuery != undefined) addMainContent(pageContent,background,textColor,modelDrivenScreen.savedQuery);
    
    frame.appendChild(pageContent);

    pageContent.layoutSizingHorizontal = "FILL";
    pageContent.layoutSizingVertical = "HUG";

    frame.layoutSizingVertical = "HUG";

    if(modelDrivenScreen.systemForm != undefined) {
        addFormScreen(modelDrivenScreen,background,textColor,topColor,menucolor);
    }
}

export function parseGrid(grid: Grid) {
    const background = hexToRgb("#FFFFFF");
    const textColor = hexToRgb("#000000");

    const contentFrame = figma.createFrame();
    contentFrame.name = "Table Frame";
    contentFrame.x = findLastX();
    contentFrame.y = 0;
    contentFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    contentFrame.layoutMode = 'HORIZONTAL';
    contentFrame.counterAxisAlignItems = 'MIN';
    contentFrame.paddingLeft = 20;
    contentFrame.paddingRight = 20;

    addColumnsFromGrid(contentFrame,background,textColor,grid);

    contentFrame.layoutSizingVertical = "HUG";
    contentFrame.layoutSizingHorizontal = "HUG";
}

export function parseForm(grid: Grid) {
    const background = hexToRgb("#FFFFFF");
    const dividerColor = hexToRgb("#EDEBE9");

    const columnFrame = figma.createFrame();
    columnFrame.name = "Column";
    columnFrame.x = findLastX();
    columnFrame.y = 0;
    columnFrame.resize(400,100);
    columnFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) },opacity:0 }];
    columnFrame.layoutMode = 'VERTICAL';
    columnFrame.counterAxisAlignItems = 'MIN';
    columnFrame.paddingLeft = 9;
    columnFrame.paddingRight = 9;
    columnFrame.paddingTop = 10;
    columnFrame.paddingBottom = 10;
    columnFrame.itemSpacing = 16;

    for (let index = 0; index < grid.totalLines; index++) {
        
        const contentFrame = figma.createFrame();
        contentFrame.name = "Section Frame";
        contentFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
        contentFrame.layoutMode = 'VERTICAL';
        contentFrame.counterAxisAlignItems = 'MIN';
        contentFrame.minWidth = 400;
        contentFrame.effects = [ {type: "DROP_SHADOW",color: {r: 0, g: 0 , b: 0, a: 0.1},offset: {x: 0, y: 0.3},radius: 0.9,visible: true,blendMode:"NORMAL"},
        {type: "DROP_SHADOW",color: {r: 0, g: 0 , b: 0, a: 0.13},offset: {x: 0, y: 1.6},radius: 3.6,visible: true,blendMode:"NORMAL"}];

        const titleFrame = figma.createFrame();
        titleFrame.name = "Section Name Frame";
        titleFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) },opacity:0 }];
        titleFrame.layoutMode = 'VERTICAL';
        titleFrame.counterAxisAlignItems = 'MIN';
        titleFrame.paddingLeft = 18;
        titleFrame.paddingRight = 18;
        titleFrame.paddingTop = 10;
        titleFrame.paddingBottom = 2;
        titleFrame.itemSpacing = 10;

        const sectionTitle = figma.createText();
        sectionTitle.characters = "Title";
        sectionTitle.name = "Section Name";
        sectionTitle.fontName = { family: "Inter", style: "Bold" };
        sectionTitle.fontSize = 18;

        const divider = figma.createRectangle();
        divider.name = "Divider";
        divider.fills = [{ type: 'SOLID', color: { r: Number(dividerColor?.r), g: Number(dividerColor?.g), b: Number(dividerColor?.b) } }];
        divider.resize(400,1);

        titleFrame.appendChild(sectionTitle);
        titleFrame.appendChild(divider);
        
        contentFrame.appendChild(titleFrame);
        
        titleFrame.layoutSizingVertical = "HUG";
        titleFrame.layoutSizingHorizontal = "FILL";
        
        columnFrame.appendChild(contentFrame);

        addGridToForm(contentFrame,grid,index,background);
        
        contentFrame.layoutSizingVertical = "HUG";
        contentFrame.layoutSizingHorizontal = "HUG";
        
        divider.layoutSizingHorizontal = "FILL";
    }
    columnFrame.layoutSizingVertical = "HUG";
    columnFrame.layoutSizingHorizontal = "HUG";
}

function addSiteMapContent(pageContent: FrameNode, background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, menucolor: { r: number; g: number; b: number; } | null, siteMap: SiteMap) {
    const strokeColor = hexToRgb("#DCDBDB");
    const primaryColor = hexToRgb("#0078D7");

    const sitemap = figma.createFrame();
    sitemap.name = "SiteMap";
    sitemap.fills = [{ type: 'SOLID', color: { r: Number(menucolor?.r), g: Number(menucolor?.g), b: Number(menucolor?.b) } }];
    sitemap.layoutMode = 'VERTICAL';
    sitemap.counterAxisAlignItems = 'MIN';
    sitemap.paddingLeft = 0;
    sitemap.paddingTop = 10;
    sitemap.itemSpacing = 21;
    sitemap.resize(210,1030);

    const hamburger = figma.createFrame();
    hamburger.name = "Hamburger";
    hamburger.fills = [{ type: 'SOLID', color: { r: Number(menucolor?.r), g: Number(menucolor?.g), b: Number(menucolor?.b) } }];
    hamburger.layoutMode = 'HORIZONTAL';
    hamburger.counterAxisAlignItems = 'MIN';
    hamburger.paddingLeft = 15;

    showIcon("hamburger","Hamburger",0,0,20,20,hexToRGBA("#000000",1),hamburger,true);

    const topItems = figma.createFrame();
    topItems.name = "Top Items";
    topItems.fills = [{ type: 'SOLID', color: { r: Number(menucolor?.r), g: Number(menucolor?.g), b: Number(menucolor?.b) } }];
    topItems.layoutMode = 'VERTICAL';
    topItems.counterAxisAlignItems = 'MIN';
    topItems.paddingTop = 7.5;
    topItems.paddingBottom = 7.5;
    topItems.itemSpacing = 0;

    const item = addMenuItem(menucolor,textColor,"Home","Home",false,false,siteMap.AppModuleSiteMap.ShowHome);
    const item2 = addMenuItem(menucolor,textColor,"History","Recent",true,false,siteMap.AppModuleSiteMap.ShowRecents);
    const item3 = addMenuItem(menucolor,textColor,"Pin","Pinned",true,false,siteMap.AppModuleSiteMap.ShowPinned);

    topItems.appendChild(item);
    topItems.appendChild(item2);
    topItems.appendChild(item3);

    sitemap.appendChild(hamburger);
    sitemap.appendChild(topItems);

    addGroups(sitemap,menucolor,textColor,siteMap.AppModuleSiteMap.SiteMap.Area[0].Group);

    const area = addArea(menucolor, strokeColor, primaryColor, background, textColor);
    
    sitemap.appendChild(area);

    pageContent.appendChild(sitemap);

    sitemap.layoutSizingHorizontal = "FIXED";
    sitemap.layoutSizingVertical = "FIXED";

    hamburger.layoutSizingVertical = "HUG";

    topItems.layoutSizingVertical = "HUG";
    topItems.layoutSizingHorizontal = "HUG";

    area.layoutSizingVertical = "HUG";
    area.layoutSizingHorizontal = "FILL";

    item.layoutSizingVertical = "HUG";
    item2.layoutSizingVertical = "HUG";
    item3.layoutSizingVertical = "HUG";
}
function addGroups(sitemap: FrameNode, menucolor: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, groups: SiteMapTypeAreaGroup[]) {
    for (let i = 0; i < groups.length; i++) {
        const gr = groups[i];

        const group = figma.createFrame();
        group.name = "Group";
        group.fills = [{ type: 'SOLID', color: { r: Number(menucolor?.r), g: Number(menucolor?.g), b: Number(menucolor?.b) } }];
        group.layoutMode = 'VERTICAL';
        group.counterAxisAlignItems = 'MIN';
        group.paddingTop = 7.5;
        group.paddingBottom = 7.5;
        group.itemSpacing = 0;


        const groupHeader = figma.createFrame();
        groupHeader.name = "Group Header";
        groupHeader.fills = [{ type: 'SOLID', color: { r: Number(menucolor?.r), g: Number(menucolor?.g), b: Number(menucolor?.b) } }];
        groupHeader.layoutMode = 'VERTICAL';
        groupHeader.counterAxisAlignItems = 'MIN';
        groupHeader.paddingTop = 7.5;
        groupHeader.paddingBottom = 7.5;
        groupHeader.paddingLeft = 16;
        groupHeader.itemSpacing = 0;

        const groupText = figma.createText();
        groupText.characters = gr.Titles[0].Title["@_Title"];
        groupText.name = "md_group";
        groupText.textAlignHorizontal = "CENTER";
        groupText.fontSize = 14;
        groupText.fontName = { family: "Inter", style: "Bold" };
        groupText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

        groupHeader.appendChild(groupText);
        group.appendChild(groupHeader);

        groupHeader.layoutSizingHorizontal = "FILL";


        const selected = i == 0 ? true : false;

        for (let index = 0; index < gr.SubArea.length; index++) {
            const sub = gr.SubArea[index];

            const groupItem = addMenuItem(menucolor,textColor,"Folder",sub.Titles[0].Title["@_Title"],false,selected,true);
            group.appendChild(groupItem);

            groupItem.layoutSizingVertical = "HUG";
            groupItem.layoutSizingHorizontal = "FILL";
        }

        sitemap.appendChild(group);

        group.layoutSizingVertical = (i+1) == groups.length ? "FILL" : "HUG";
        group.layoutSizingHorizontal = "FILL";
    }
}

function addMainContent(pageContent: FrameNode, background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, savedQuery: SavedQuery) {
    const strokeColor = hexToRgb("#DCDBDB");
    const darkText = hexToRgb("#595959");

    const mainContent = figma.createFrame();
    mainContent.name = "Main Content";
    mainContent.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    mainContent.layoutMode = 'VERTICAL';
    mainContent.counterAxisAlignItems = 'MIN';

    const bar = addBarContent(background, strokeColor, textColor,false); 
    
    mainContent.appendChild(bar);

    const sq = savedQuery.savedqueries.savedquery;
    const headerName = sq.LocalizedNames.LocalizedName.length > 0 ? sq.LocalizedNames.LocalizedName[0]["@_description"] : "View Name";

    addHeader(mainContent,background,textColor,darkText,headerName);
    addContentFrame(mainContent,background,textColor,savedQuery.savedqueries.savedquery);

    pageContent.appendChild(mainContent);

    mainContent.layoutSizingHorizontal = "FILL";
    mainContent.layoutSizingVertical = "FILL";

    bar.layoutSizingHorizontal = "FILL";
    bar.layoutSizingVertical = "HUG";
}

function addBarContent(background: { r: number; g: number; b: number; } | null, strokeColor: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null,isForm: boolean) {
    const bar = figma.createFrame();
    bar.name = "Bar";
    bar.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    bar.strokes = [{ type: 'SOLID', color: { r: Number(strokeColor?.r), g: Number(strokeColor?.g), b: Number(strokeColor?.b) } }];
    bar.layoutMode = 'HORIZONTAL';
    bar.counterAxisAlignItems = 'MIN';
    bar.paddingLeft = 12;
    bar.paddingRight = 12;
    bar.itemSpacing = 7.5;
    bar.paddingTop = 12;
    bar.paddingBottom = 12;
    bar.strokeBottomWeight = 1;

    if(isForm) {
        showIcon("Right", "Right", 0, 0, 22, 22, hexToRGBA("#000000", 1), bar, true);
        showIcon("Separator", "Separator", 0, 0, 22, 22, hexToRGBA("#D6D6D6", 1), bar, true);
        showIcon("OpenInNewWindow", "OpenInNewWindow", 0, 0, 22, 22, hexToRGBA("#000000", 1), bar, true);
        showIcon("Separator", "Separator", 0, 0, 22, 22, hexToRGBA("#D6D6D6", 1), bar, true);

        addItem(bar, textColor, "Add", "Font", "#000000");
        addItem(bar, textColor, "Deactivate", "Deactivate", "#000000");
        addItem(bar, textColor, "Trash", "Trash", "#000000");
        addItem(bar, textColor, "Reload", "Reload", "#000000");
    } else {
        addItem(bar, textColor, "View", "Create View", "#000000");
        addItem(bar, textColor, "Save", "Save as", "#000000");
        addItem(bar, textColor, "Image", "Show chart", "#000000");
        addItem(bar, textColor, "Add", "Font", "#000000");
        addItem(bar, textColor, "Trash", "Trash", "#000000");
        addItem(bar, textColor, "Reload", "Reload", "#000000");
    }
    showIcon("more", "MoreDown", 0, 0, 20, 20, hexToRGBA("#000000", 1), bar, true);
    return bar;
}

function addContentFrame(mainContent: FrameNode, background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null,savedQueries: savedQuery) {
    const strokeColor = hexToRgb("#BEBBB8");

        const contentFrame = figma.createFrame();
        contentFrame.name = "Table Frame";
        contentFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
        contentFrame.layoutMode = 'HORIZONTAL';
        contentFrame.counterAxisAlignItems = 'MIN';
        contentFrame.paddingLeft = 20;
        contentFrame.paddingRight = 20;

        addColumnsContent(background,textColor, strokeColor, contentFrame,savedQueries.layoutxml.grid,savedQueries.fetchxml.fetch);

        mainContent.appendChild(contentFrame);

        contentFrame.layoutSizingVertical = "FILL";
        contentFrame.layoutSizingHorizontal = "FILL";
}

function addColumnsContent(background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, strokeColor: { r: number; g: number; b: number; } | null, contentFrame: FrameNode, grid: SavedqueryLayoutxmlGrid,fetch: FetchType) {
    const columnFrame1 = figma.createFrame();
    columnFrame1.name = "Column Frame";
    columnFrame1.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    columnFrame1.layoutMode = 'VERTICAL';
    columnFrame1.counterAxisAlignItems = 'CENTER';

    addIconRows(columnFrame1, 5, background, strokeColor, "#000000", "Check");

    const columnFrame2 = figma.createFrame();
    columnFrame2.name = "Column Frame";
    columnFrame2.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    columnFrame2.layoutMode = 'VERTICAL';
    columnFrame2.counterAxisAlignItems = 'CENTER';

    addIconRows(columnFrame2, 5, background, strokeColor, "#000000", "Organization");

    contentFrame.appendChild(columnFrame1);
    contentFrame.appendChild(columnFrame2);

    const cells = grid.row.cell;

    for (let index = 0; index < cells.length; index++) {
        const cell = cells[index];
        const name = getName(cell["@_name"],fetch.entity.attribute);

        const colName = name != undefined ? name : "Column Header";

        const color = index == 0 ? "#0078D7" : "#000000";
        const valueName = index == 0 ? "Link Value" : "Cell Value";
        const layoutSizingHor = (index+1) == cells.length ? "FILL" : "HUG";

        addTextRows(contentFrame,4,background,textColor,strokeColor,valueName,color,colName,layoutSizingHor);
    }

    columnFrame1.layoutSizingHorizontal = "HUG";
    columnFrame1.layoutSizingVertical = "HUG";
    columnFrame2.layoutSizingHorizontal = "HUG";
    columnFrame2.layoutSizingVertical = "HUG";
}

function getName(name: string, attributes: CustomAttribute[] | CustomAttribute) {
    if(Array.isArray(attributes)) {
        return attributes.find(value=> value["@_name"].toLowerCase() == name.toLowerCase())?.["@_name"];
    } else {
        return attributes["@_name"].toLowerCase() == name.toLowerCase() ? attributes["@_name"] : "";
    }
}

function addColumnsFromGrid(contentFrame: FrameNode, background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, grid: Grid) {
    const strokeColor = hexToRgb("#BEBBB8");

    const columnFrame1 = figma.createFrame();
    columnFrame1.name = "Column Frame";
    columnFrame1.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    columnFrame1.layoutMode = 'VERTICAL';
    columnFrame1.counterAxisAlignItems = 'CENTER';

    addIconRows(columnFrame1, grid.totalLines+1, background, strokeColor, "#000000", "Check");

    const columnFrame2 = figma.createFrame();
    columnFrame2.name = "Column Frame";
    columnFrame2.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    columnFrame2.layoutMode = 'VERTICAL';
    columnFrame2.counterAxisAlignItems = 'CENTER';

    addIconRows(columnFrame2, grid.totalLines+1, background, strokeColor, "#000000", "Organization");

    contentFrame.appendChild(columnFrame1);
    contentFrame.appendChild(columnFrame2);

    for (let index = 0; index < grid.columns.length; index++) {
        const column = grid.columns[index];
        const name = column.name;
        const color = index == 0 ? "#0078D7" : "#000000";
        const layoutSizingHor = (index+1) == grid.columns.length ? "FILL" : "HUG";

        addTextFromGridRows(contentFrame,background,textColor,strokeColor,column.rows,grid.language,color,name,layoutSizingHor);
    }
    columnFrame1.layoutSizingHorizontal = "HUG";
    columnFrame1.layoutSizingVertical = "HUG";
    columnFrame2.layoutSizingHorizontal = "HUG";
    columnFrame2.layoutSizingVertical = "HUG";
}
function addGridToForm(contentFrame: FrameNode,grid: Grid,i: number, background: { r: number; g: number; b: number; } | null) {
    const mandatoryColor = hexToRgb("#A4262C");

    const rowsFrame = figma.createFrame();
    rowsFrame.name = "Rows";
    rowsFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) },opacity:0 }];
    rowsFrame.layoutMode = 'VERTICAL';
    rowsFrame.counterAxisAlignItems = 'MIN';
    rowsFrame.minWidth = 601;
    rowsFrame.paddingLeft = 20;
    rowsFrame.paddingRight = 20;
    rowsFrame.paddingTop = 20;
    rowsFrame.paddingBottom = 20;
    rowsFrame.itemSpacing = 20;
    
    for (let index = 0; index < grid.columns.length; index++) {
        const element = grid.columns[index];
        
        const fieldFrame = figma.createFrame();
        fieldFrame.name = "Field";
        fieldFrame.layoutMode = 'HORIZONTAL';
        fieldFrame.counterAxisAlignItems = 'MIN';
        fieldFrame.layoutWrap = 'WRAP';
        fieldFrame.itemSpacing = 5;
        fieldFrame.minWidth = 561;
        
        const labelFrame = figma.createFrame();
        labelFrame.name = "Labels";
        labelFrame.layoutMode = 'HORIZONTAL';
        labelFrame.counterAxisAlignItems = 'MIN';
        labelFrame.layoutWrap = 'WRAP';
        labelFrame.itemSpacing = 5;
        labelFrame.minWidth = 150;
        
        const valueTitle = figma.createText();
        valueTitle.characters = element.name;
        valueTitle.name = "Value";
        valueTitle.fontSize = 14;
        
        const mandatory = figma.createText();
        mandatory.characters = "*";
        mandatory.name = "Mandatory";
        mandatory.fontSize = 14;
        mandatory.fills = [{ type: 'SOLID', color: { r: Number(mandatoryColor?.r), g: Number(mandatoryColor?.g), b: Number(mandatoryColor?.b) } }];
        mandatory.visible = false;
        
        labelFrame.appendChild(valueTitle);
        labelFrame.appendChild(mandatory);

        const fieldValueFrame = figma.createFrame();
        fieldValueFrame.name = "Field";
        fieldValueFrame.layoutMode = 'HORIZONTAL';
        fieldValueFrame.counterAxisAlignItems = 'MIN';
        fieldValueFrame.layoutPositioning = "AUTO";

        const placeholder = figma.createText();
        const val = isDate(element.rows[i].value) && grid.language != "none" ? formatDate(grid.language) : "" + element.rows[i].value;
        placeholder.characters = val;
        placeholder.name = "Placeholder";
        placeholder.fontSize = 14;

        fieldValueFrame.appendChild(placeholder);

        fieldFrame.appendChild(labelFrame);
        fieldFrame.appendChild(fieldValueFrame);

        rowsFrame.appendChild(fieldFrame);

        placeholder.layoutSizingHorizontal = "HUG";
        valueTitle.layoutSizingHorizontal = "HUG";
        labelFrame.layoutSizingVertical = "HUG";

        labelFrame.layoutSizingHorizontal = "HUG";
        labelFrame.layoutSizingVertical = "HUG";

        fieldValueFrame.layoutSizingHorizontal = "FILL";
        fieldValueFrame.layoutSizingVertical = "HUG";
        
        fieldFrame.layoutSizingHorizontal = "FILL";
        fieldFrame.layoutSizingVertical = "HUG";
    }
    
    contentFrame.appendChild(rowsFrame);

    rowsFrame.layoutSizingHorizontal = "FILL";
    rowsFrame.layoutSizingVertical = "HUG";
}

function addFormScreen(modelDrivenScreen: ModelDrivenScreen, background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, topColor: { r: number; g: number; b: number; } | null, menucolor: { r: number; g: number; b: number; } | null) {
    const strokeColor = hexToRgb("#DCDBDB");

    const frame = figma.createFrame();
    frame.x = findLastX();
    frame.y = 0;
    frame.name = modelDrivenScreen.appName;
    frame.resize(1920, 1080);
    frame.cornerRadius = 0;
    frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    frame.layoutMode = 'VERTICAL';
    frame.counterAxisAlignItems = 'MIN';
    frame.itemSpacing = 0;

    addNavigationContent(frame,background,textColor,topColor,modelDrivenScreen.appName);

    const pageContent = figma.createFrame();
    pageContent.name = "Page Content";
    pageContent.resize(frame.width,frame.height);
    pageContent.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    pageContent.layoutMode = 'HORIZONTAL';
    pageContent.counterAxisAlignItems = 'MIN';

    addSiteMapContent(pageContent,background,textColor,menucolor,modelDrivenScreen.siteMap);

    const mainContent = figma.createFrame();
    mainContent.name = "Main Content";
    mainContent.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    mainContent.layoutMode = 'VERTICAL';
    mainContent.counterAxisAlignItems = 'MIN';

    const bar = addBarContent(background, strokeColor, textColor,true); 
    mainContent.appendChild(bar);

    const names = modelDrivenScreen.systemForm?.forms.systemform.LocalizedNames.LocalizedName;
    const headerName = Array.isArray(names) ? names[0]["@_description"] : names?.["@_description"];
    const header = headerName != undefined ? headerName : "Main Form";

    addHeaderForm(mainContent,background,textColor,header);

    if(modelDrivenScreen.systemForm != undefined) addFormContent(mainContent,modelDrivenScreen.systemForm,background);

    pageContent.appendChild(mainContent);
    frame.appendChild(pageContent);

    bar.layoutSizingHorizontal = "FILL";
    bar.layoutSizingVertical = "HUG";

    mainContent.layoutSizingHorizontal = "FILL";
    mainContent.layoutSizingVertical = "FILL";

    pageContent.layoutSizingHorizontal = "FILL";
    pageContent.layoutSizingVertical = "HUG";

    frame.layoutSizingVertical = "HUG";
}


function addFormContent(pageContent: FrameNode, systemForm: SystemForm, background: { r: number; g: number; b: number; } | null) {
    const dividerColor = hexToRgb("#EDEBE9");
    const columnBackground = hexToRgb("#FAF9F8");

    const columnFrame = figma.createFrame();
    columnFrame.name = "Column";
    columnFrame.fills = [{ type: 'SOLID', color: { r: Number(columnBackground?.r), g: Number(columnBackground?.g), b: Number(columnBackground?.b) } }];
    columnFrame.layoutMode = 'VERTICAL';
    columnFrame.counterAxisAlignItems = 'MIN';
    columnFrame.paddingLeft = 9;
    columnFrame.paddingRight = 9;
    columnFrame.paddingTop = 10;
    columnFrame.paddingBottom = 10;
    columnFrame.itemSpacing = 16;

    const tabs = Array.isArray(systemForm?.forms.systemform.form.tabs.tab) ? systemForm?.forms.systemform.form.tabs.tab[0] : systemForm?.forms.systemform.form.tabs.tab;
    const sections = Array.isArray(tabs.columns?.column) ? tabs.columns?.column[0].sections.section : tabs.columns?.column.sections.section;

    if(Array.isArray(sections)) {
        for (let index = 0; index < sections.length; index++) {
            const element = sections[index];
            
            const contentFrame = figma.createFrame();
            contentFrame.name = "Section Frame";
            contentFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
            contentFrame.layoutMode = 'VERTICAL';
            contentFrame.counterAxisAlignItems = 'MIN';
            contentFrame.minWidth = 400;
            contentFrame.effects = [ {type: "DROP_SHADOW",color: {r: 0, g: 0 , b: 0, a: 0.1},offset: {x: 0, y: 0.3},radius: 0.9,visible: true,blendMode:"NORMAL"},
            {type: "DROP_SHADOW",color: {r: 0, g: 0 , b: 0, a: 0.13},offset: {x: 0, y: 1.6},radius: 3.6,visible: true,blendMode:"NORMAL"}];
        
            const titleFrame = figma.createFrame();
            titleFrame.name = "Section Name Frame";
            titleFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) },opacity:0 }];
            titleFrame.layoutMode = 'VERTICAL';
            titleFrame.counterAxisAlignItems = 'MIN';
            titleFrame.paddingLeft = 18;
            titleFrame.paddingRight = 18;
            titleFrame.paddingTop = 10;
            titleFrame.paddingBottom = 2;
            titleFrame.itemSpacing = 10;
        
            const sectionTitle = figma.createText();
            sectionTitle.characters = element["@_name"];
            sectionTitle.name = "Section Name";
            sectionTitle.fontName = { family: "Inter", style: "Bold" };
            sectionTitle.fontSize = 18;
        
            const divider = figma.createRectangle();
            divider.name = "Divider";
            divider.fills = [{ type: 'SOLID', color: { r: Number(dividerColor?.r), g: Number(dividerColor?.g), b: Number(dividerColor?.b) } }];
            divider.resize(400,1);
        
            titleFrame.appendChild(sectionTitle);
            titleFrame.appendChild(divider);
            
            contentFrame.appendChild(titleFrame);
            
            titleFrame.layoutSizingVertical = "HUG";
            titleFrame.layoutSizingHorizontal = "FILL";
            
            columnFrame.appendChild(contentFrame);

            addRowsForm(contentFrame,background,element.rows?.row);
            
            contentFrame.layoutSizingVertical = "HUG";
            contentFrame.layoutSizingHorizontal = "HUG";

            divider.layoutSizingHorizontal = "FILL";
        }
    }

    pageContent.appendChild(columnFrame);

    columnFrame.layoutSizingVertical = "FILL";
    columnFrame.layoutSizingHorizontal = "FILL";
}

function addRowsForm(contentFrame: FrameNode, background: { r: number; g: number; b: number; } | null,row: FormTypeTabsTabColumnSectionsSectionRowsRow | FormTypeTabsTabColumnSectionsSectionRowsRow[] | undefined) {
    const mandatoryColor = hexToRgb("#A4262C");

    const rowsFrame = figma.createFrame();
    rowsFrame.name = "Rows";
    rowsFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) },opacity:0 }];
    rowsFrame.layoutMode = 'VERTICAL';
    rowsFrame.counterAxisAlignItems = 'MIN';
    rowsFrame.minWidth = 601;
    rowsFrame.paddingLeft = 20;
    rowsFrame.paddingRight = 20;
    rowsFrame.paddingTop = 20;
    rowsFrame.paddingBottom = 20;
    rowsFrame.itemSpacing = 20;

    if(row != undefined) {
        if(Array.isArray(row)) {
            for (let index = 0; index < row.length; index++) {
                const element = row[index];
                const cell = element.cell as FormTypeTabsTabColumnSectionsSectionRowsRowCell;

                const fieldFrame = figma.createFrame();
                fieldFrame.name = "Field";
                fieldFrame.layoutMode = 'HORIZONTAL';
                fieldFrame.counterAxisAlignItems = 'MIN';
                fieldFrame.layoutWrap = 'WRAP';
                fieldFrame.itemSpacing = 5;
                fieldFrame.minWidth = 561;
                
                const labelFrame = figma.createFrame();
                labelFrame.name = "Labels";
                labelFrame.layoutMode = 'HORIZONTAL';
                labelFrame.counterAxisAlignItems = 'MIN';
                labelFrame.layoutWrap = 'WRAP';
                labelFrame.itemSpacing = 5;
                labelFrame.minWidth = 150;
                
                const valueTitle = figma.createText();
                const value = Array.isArray(cell.labels.label) ? cell.labels.label[0] : cell.labels.label;
                valueTitle.characters = value["@_description"];
                valueTitle.name = "Value";
                valueTitle.fontSize = 14;
                
                const mandatory = figma.createText();
                mandatory.characters = "*";
                mandatory.name = "Mandatory";
                mandatory.fontSize = 14;
                mandatory.fills = [{ type: 'SOLID', color: { r: Number(mandatoryColor?.r), g: Number(mandatoryColor?.g), b: Number(mandatoryColor?.b) } }];
                mandatory.visible = false;
                
                labelFrame.appendChild(valueTitle);
                labelFrame.appendChild(mandatory);

                const fieldValueFrame = figma.createFrame();
                fieldValueFrame.name = "Field";
                fieldValueFrame.layoutMode = 'HORIZONTAL';
                fieldValueFrame.counterAxisAlignItems = 'MIN';
                fieldValueFrame.layoutPositioning = "AUTO";

                const placeholder = figma.createText();
                placeholder.characters = "---";
                placeholder.name = "Placeholder";
                placeholder.fontSize = 14;

                fieldValueFrame.appendChild(placeholder);

                fieldFrame.appendChild(labelFrame);
                fieldFrame.appendChild(fieldValueFrame);

                rowsFrame.appendChild(fieldFrame);

                placeholder.layoutSizingHorizontal = "HUG";
                valueTitle.layoutSizingHorizontal = "HUG";
                labelFrame.layoutSizingVertical = "HUG";

                labelFrame.layoutSizingHorizontal = "HUG";
                labelFrame.layoutSizingVertical = "HUG";

                fieldValueFrame.layoutSizingHorizontal = "FILL";
                fieldValueFrame.layoutSizingVertical = "HUG";
                
                fieldFrame.layoutSizingHorizontal = "FILL";
                fieldFrame.layoutSizingVertical = "HUG";
            }
        }
    }
    contentFrame.appendChild(rowsFrame);

    rowsFrame.layoutSizingHorizontal = "FILL";
    rowsFrame.layoutSizingVertical = "HUG";
}