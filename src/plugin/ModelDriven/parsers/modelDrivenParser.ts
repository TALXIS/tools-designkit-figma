import { ModelDrivenScreen} from "../../../model/ModelDrivenScreen";
import { findLastX, showIcon } from "../../../util/utils";
import { addArea, addHeader, addIconRows, addItem, addMenuItem, addNavigationContent, addTextRows } from "../importers/driven-importer";
import {hexToRGBA, hexToRgb} from '../../../util/colorUtil';
import { SiteMap, SiteMapTypeAreaGroup } from "../../../model/SiteMap";
import { CustomAttribute, FetchType, SavedQuery, SavedqueryLayoutxmlGrid, savedQuery } from "../../../model/SavedQuery";

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
    addMainContent(pageContent,background,textColor,modelDrivenScreen.savedQuery);
    
    frame.appendChild(pageContent);

    pageContent.layoutSizingHorizontal = "FILL";
    pageContent.layoutSizingVertical = "HUG";

    frame.layoutSizingVertical = "HUG";
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
    
    addItem(bar, textColor,"View","Create View","#000000");
    addItem(bar, textColor,"Save","Save as","#000000");
    addItem(bar, textColor,"Image","Show chart","#000000");
    addItem(bar, textColor,"Add","Font","#000000");
    addItem(bar, textColor,"Trash","Delete","#000000");
    addItem(bar, textColor,"Reset","Refresh","#000000");
    
    showIcon("more","MoreDown", 0, 0, 20, 20, hexToRGBA("#000000", 1), bar,true); 
    
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

