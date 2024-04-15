import { findLastX, formatDate, isDate, isNumber, showIcon } from "../../../util/utils";
import {hexToRGBA, hexToRgb} from '../../../util/colorUtil';
import { Row } from "../../../model/Grid";

export function makeDrivenTemplate() {
    const background = hexToRgb("#FFFFFF");
    const textColor = hexToRgb("#000000");
    const topColor = hexToRgb("#6B2C70");
    const menucolor = hexToRgb("#EDEBE9");

    const lastX = findLastX();

    const frame = figma.createFrame();
    frame.x = Number(lastX);
    frame.y = 0;
    frame.name = "View";
    frame.resize(1920, 1080);
    frame.cornerRadius = 0;
    frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    frame.layoutMode = 'VERTICAL';
    frame.counterAxisAlignItems = 'MIN';
    frame.itemSpacing = 0;

    addNavigationContent(frame,background,textColor,topColor,"md_appname");
    addPageContent(frame,background,textColor,menucolor);

    frame.layoutSizingVertical = "HUG";

    figma.notify("Model Driven Template created");
}

export function addNavigationContent(frame: FrameNode, background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, topColor: { r: number; g: number; b: number; } | null,
    name: string) {
    const searchColor = hexToRgb("#D3C0D4");
    
    const navigation = figma.createFrame();
    navigation.name = "Navigation";
    navigation.resize(frame.width,50);
    navigation.fills = [{ type: 'SOLID', color: { r: Number(topColor?.r), g: Number(topColor?.g), b: Number(topColor?.b) } }];
    navigation.layoutMode = 'HORIZONTAL';
    navigation.counterAxisAlignItems = 'CENTER';
    navigation.itemSpacing = 10;
    navigation.paddingLeft = 5;

    const left = figma.createFrame();
    left.name = "Left";
    left.fills = [{ type: 'SOLID', color: { r: Number(topColor?.r), g: Number(topColor?.g), b: Number(topColor?.b) } }];
    left.layoutMode = 'HORIZONTAL';
    left.counterAxisAlignItems = 'CENTER';
    left.itemSpacing = 16;
    left.paddingLeft = 5;
    left.paddingRight = 16;

    showIcon("waffle","Waffle",0,0,20,20,hexToRGBA("#FFFFFF",1),left,true);

    const appTitle = figma.createText();
    appTitle.characters = "Power Apps";
    appTitle.name = "md_title";
    appTitle.fontSize = 16;
    appTitle.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const divider = figma.createRectangle();
    divider.name = "divider";
    divider.resize(1, 28);
    divider.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    left.appendChild(appTitle);
    left.appendChild(divider);

    const appName = figma.createText();
    appName.characters = name.substring(name.indexOf("_")+1);
    appName.name = name;
    appName.fontSize = 16;
    appName.resize(508,20);
    appName.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const search = figma.createFrame();
    search.name = "Search";
    search.fills = [{ type: 'SOLID', color: { r: Number(searchColor?.r), g: Number(searchColor?.g), b: Number(searchColor?.b) } }];
    search.layoutMode = 'HORIZONTAL';
    search.counterAxisAlignItems = 'CENTER';
    search.itemSpacing = 14;
    search.paddingLeft = 12;
    search.paddingTop = 5;
    search.paddingBottom = 7;

    showIcon("search","Search",0,0,20,20,hexToRGBA("#000000",1),search,true);

    const searchText = figma.createText();
    searchText.characters = "Search";
    searchText.name = "md_search";
    searchText.fontSize = 14;
    searchText.resize(350,20);
    searchText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    search.appendChild(searchText);

    const look = figma.createFrame();
    look.name = "Look";
    look.fills = [{ type: 'SOLID', color: { r: Number(topColor?.r), g: Number(topColor?.g), b: Number(topColor?.b) } }];
    look.layoutMode = 'HORIZONTAL';
    look.counterAxisAlignItems = 'CENTER';
    look.paddingLeft = 398;
    look.itemSpacing = 20;

    const tryText = figma.createText();
    tryText.characters = "Try the new look";
    tryText.name = "md_try";
    tryText.fontSize = 14;
    tryText.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const switcher = figma.createRectangle();
    switcher.name = "md_switcher";
    switcher.resize(40, 15);
    switcher.cornerRadius = 10;
    switcher.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) },opacity: 0 }];
    switcher.strokes = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    
    const fillE = figma.createEllipse();
    fillE.resize(10,10);
    fillE.x = look.width + tryText.width + switcher.width - 15;
    fillE.y = 4;
    fillE.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    look.appendChild(fillE);
    fillE.layoutPositioning = "ABSOLUTE";

    look.appendChild(tryText);
    look.appendChild(switcher);

    const right = figma.createFrame();
    right.name = "Right";
    right.fills = [{ type: 'SOLID', color: { r: Number(topColor?.r), g: Number(topColor?.g), b: Number(topColor?.b) } }];
    right.layoutMode = 'HORIZONTAL';
    right.counterAxisAlignItems = 'CENTER';
    right.paddingLeft = 43;
    right.itemSpacing = 20;

    showIcon("add","Add",0,0,20,20,hexToRGBA("#FFFFFF",1),right,true);
    showIcon("filter","Filter",0,0,20,20,hexToRGBA("#FFFFFF",1),right,true);
    showIcon("settings","Settings",0,0,20,20,hexToRGBA("#FFFFFF",1),right,true);
    showIcon("question","QuestionMark",0,0,20,20,hexToRGBA("#FFFFFF",1),right,true);
    showIcon("person","Person",0,0,20,20,hexToRGBA("#FFFFFF",1),right,true);

    navigation.appendChild(left);
    navigation.appendChild(appName);
    navigation.appendChild(search);
    navigation.appendChild(look);
    navigation.appendChild(right);


    frame.appendChild(navigation);

    left.layoutSizingHorizontal = "HUG";
    left.layoutSizingVertical = "HUG";
    search.layoutSizingHorizontal = "HUG";
    search.layoutSizingVertical = "HUG";
    look.layoutSizingHorizontal = "HUG";
    look.layoutSizingVertical = "HUG";
    right.layoutSizingHorizontal = "HUG";
    right.layoutSizingVertical = "HUG";
    navigation.layoutSizingHorizontal = "FILL";

}
function addPageContent(frame: FrameNode, background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, menucolor: { r: number; g: number; b: number; } | null) {
    const pageContent = figma.createFrame();
    pageContent.name = "Page Content";
    pageContent.resize(frame.width,frame.height);
    pageContent.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    pageContent.layoutMode = 'HORIZONTAL';
    pageContent.counterAxisAlignItems = 'MIN';

    addSiteMap(pageContent,background,textColor,menucolor);
    addMainContent(pageContent,background,textColor);

    frame.appendChild(pageContent);

    pageContent.layoutSizingHorizontal = "FILL";
    pageContent.layoutSizingVertical = "HUG";
}

function addSiteMap(pageContent: FrameNode, background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, menucolor: { r: number; g: number; b: number; } | null) {
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

    const item = addMenuItem(menucolor,textColor,"Home","Home",false,false,true);
    const item2 = addMenuItem(menucolor,textColor,"History","Recent",true,false,true);
    const item3 = addMenuItem(menucolor,textColor,"Pin","Pinned",true,false,true);

    topItems.appendChild(item);
    topItems.appendChild(item2);
    topItems.appendChild(item3);

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
    groupText.characters = "Group 1";
    groupText.name = "md_group";
    groupText.textAlignHorizontal = "CENTER";
    groupText.fontSize = 14;
    groupText.fontName = { family: "Inter", style: "Bold" };
    groupText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const groupItem = addMenuItem(menucolor,textColor,"Home","Label",false,true,true);
    const groupItem2 = addMenuItem(menucolor,textColor,"History","Label",false,false,true);
    const groupItem3 = addMenuItem(menucolor,textColor,"Pin","Label",false,false,true);

    groupHeader.appendChild(groupText);
    group.appendChild(groupHeader);
    groupHeader.layoutSizingHorizontal = "FILL";
    
    group.appendChild(groupItem);
    group.appendChild(groupItem2);
    group.appendChild(groupItem3);

    const area = addArea(menucolor, strokeColor, primaryColor, background, textColor);

    sitemap.appendChild(hamburger);
    sitemap.appendChild(topItems);
    sitemap.appendChild(group);
    sitemap.appendChild(area);

    pageContent.appendChild(sitemap);

    sitemap.layoutSizingHorizontal = "FIXED";
    sitemap.layoutSizingVertical = "FIXED";

    hamburger.layoutSizingVertical = "HUG";

    topItems.layoutSizingVertical = "HUG";
    topItems.layoutSizingHorizontal = "HUG";
    group.layoutSizingVertical = "FILL";
    group.layoutSizingHorizontal = "FILL";
    area.layoutSizingVertical = "HUG";
    area.layoutSizingHorizontal = "FILL";

    item.layoutSizingVertical = "HUG";
    item2.layoutSizingVertical = "HUG";
    item3.layoutSizingVertical = "HUG";
    groupItem.layoutSizingVertical = "HUG";
    groupItem.layoutSizingHorizontal = "FILL";
    groupItem2.layoutSizingVertical = "HUG";
    groupItem2.layoutSizingHorizontal = "FILL";
    groupItem3.layoutSizingVertical = "HUG";
    groupItem3.layoutSizingHorizontal = "FILL";
}

export function addArea(menucolor: { r: number; g: number; b: number; } | null, strokeColor: { r: number; g: number; b: number; } | null, primaryColor: { r: number; g: number; b: number; } | null, background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null) {
    const area = figma.createFrame();
    area.name = "Area";
    area.fills = [{ type: 'SOLID', color: { r: Number(menucolor?.r), g: Number(menucolor?.g), b: Number(menucolor?.b) } }];
    area.strokes = [{ type: 'SOLID', color: { r: Number(strokeColor?.r), g: Number(strokeColor?.g), b: Number(strokeColor?.b) } }];
    area.layoutMode = 'HORIZONTAL';
    area.counterAxisAlignItems = 'CENTER';
    area.strokeTopWeight = 1;
    area.paddingLeft = 11;
    area.paddingRight = 10;
    area.paddingTop = 5;
    area.paddingBottom = 5;
    area.itemSpacing = 11;

    const inicials = figma.createFrame();
    inicials.name = "Inicials";
    inicials.fills = [{ type: 'SOLID', color: { r: Number(primaryColor?.r), g: Number(primaryColor?.g), b: Number(primaryColor?.b) } }];
    inicials.layoutMode = 'HORIZONTAL';
    inicials.resize(28, 28);
    inicials.counterAxisAlignItems = 'CENTER';
    inicials.primaryAxisAlignItems = 'CENTER';

    const inicialsText = figma.createText();
    inicialsText.characters = "P";
    inicialsText.name = "md_inicials";
    inicialsText.textAlignHorizontal = "CENTER";
    inicialsText.fontSize = 16;
    inicialsText.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    inicials.appendChild(inicialsText);

    const areaLabel = figma.createText();
    areaLabel.characters = "Label";
    areaLabel.name = "label";
    areaLabel.textAlignHorizontal = "CENTER";
    areaLabel.fontSize = 16;
    areaLabel.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    area.appendChild(inicials);
    area.appendChild(areaLabel);

    showIcon("updown","UpDown", 0, 0, 20, 20, hexToRGBA("#000000", 1), area, true);
    return area;
}

export function addMenuItem(menucolor: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null,iconName: string,name: string,showSub: boolean,selectedItem: boolean,showVisibility:boolean) {
    const selectedColor = hexToRgb("#FAF9F8");

    const item = figma.createFrame();
    item.name = "md_item";
    if(selectedItem) {
        item.fills = [{ type: 'SOLID', color: { r: Number(selectedColor?.r), g: Number(selectedColor?.g), b: Number(selectedColor?.b) } }];
    } else {
        item.fills = [{ type: 'SOLID', color: { r: Number(menucolor?.r), g: Number(menucolor?.g), b: Number(menucolor?.b) } }];
    }
    item.layoutMode = 'HORIZONTAL';
    item.counterAxisAlignItems = 'MIN';
    item.itemSpacing = 20;
    item.paddingLeft = 15;
    item.paddingRight = 20;
    item.paddingTop = 10;
    item.paddingBottom = 10;
    item.visible = showVisibility;

    showIcon(iconName,iconName,0,0,20,20,hexToRGBA("#000000",1),item,true);
    
    const text = figma.createText();
    text.characters = name;
    text.name = "md_" + name;
    text.fontSize = 14;
    text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];
    
    item.appendChild(text);

    if(showSub) {
        showIcon("down","Down",0,0,20,20,hexToRGBA("#000000",1),item,true);
    }

    return item;
}

function addMainContent(pageContent: FrameNode, background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null) {
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
    
    bar.layoutSizingHorizontal = "FILL";
    bar.layoutSizingVertical = "HUG";

    addHeader(mainContent,background, textColor, darkText,"View Name");
    addContentFrame(mainContent,background,textColor);

    pageContent.appendChild(mainContent);

    mainContent.layoutSizingHorizontal = "FILL";
    mainContent.layoutSizingVertical = "FILL";
}

export function addHeader(mainContent: FrameNode,background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, darkText: { r: number; g: number; b: number; } | null,headerName: string) {
    const header = figma.createFrame();
    header.name = "Header";
    header.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    header.layoutMode = 'HORIZONTAL';
    header.counterAxisAlignItems = 'CENTER';
    header.paddingLeft = 24;
    header.paddingRight = 32;
    header.paddingTop = 15;
    header.paddingBottom = 15;
    header.itemSpacing = 5;

    const headerFrame = figma.createFrame();
    headerFrame.name = "Header Frame";
    headerFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    headerFrame.layoutMode = 'HORIZONTAL';
    headerFrame.counterAxisAlignItems = 'CENTER';

    const headerText = figma.createText();
    headerText.characters = headerName;
    headerText.name = "label";
    headerText.fontSize = 20;
    headerText.fontName = { family: "Inter", style: "Bold" };
    headerText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    headerFrame.appendChild(headerText);
    showIcon("down","Down", 0, 0, 20, 20, hexToRGBA("#000000", 1), headerFrame, true);

    header.appendChild(headerFrame);

    addItem(header, textColor, "Columns", "Edit columns", "#0078D7");
    addItem(header, textColor, "Filter", "Edit filters", "#0078D7");

    const searchFrame = figma.createFrame();
    searchFrame.name = "Search Frame";
    searchFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    searchFrame.strokes = [{ type: 'SOLID', color: { r: Number(darkText?.r), g: Number(darkText?.g), b: Number(darkText?.b) } }];
    searchFrame.layoutMode = 'HORIZONTAL';
    searchFrame.counterAxisAlignItems = 'CENTER';
    searchFrame.strokeWeight = 1;
    searchFrame.paddingLeft = 14;
    searchFrame.paddingRight = 11;
    searchFrame.paddingTop = 5;
    searchFrame.paddingBottom = 7;
    searchFrame.itemSpacing = 25;

    const searchText = figma.createText();
    searchText.characters = "Search views";
    searchText.name = "md_search_text";
    searchText.fontSize = 14;
    searchText.fills = [{ type: 'SOLID', color: { r: Number(darkText?.r), g: Number(darkText?.g), b: Number(darkText?.b) } }];

    searchFrame.appendChild(searchText);
    showIcon("search","Search", 0, 0, 20, 20, hexToRGBA("#595959", 1), searchFrame, true);

    header.appendChild(searchFrame);

    headerFrame.layoutSizingHorizontal = "FILL";
    headerFrame.layoutSizingVertical = "HUG";
    searchFrame.layoutSizingVertical = "HUG";

    mainContent.appendChild(header);

    header.layoutSizingVertical = "HUG";
    header.layoutSizingHorizontal = "FILL";
}

export function addHeaderForm(mainContent: FrameNode,background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null,headerName: string) {
    const blueColor = hexToRgb("#0078D7");

    const header = figma.createFrame();
    header.name = "Header";
    header.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    header.layoutMode = 'HORIZONTAL';
    header.counterAxisAlignItems = 'CENTER';
    header.paddingLeft = 24;
    header.paddingRight = 32;
    header.paddingTop = 15;
    header.paddingBottom = 15;
    header.itemSpacing = 5;

    const headerFrame = figma.createFrame();
    headerFrame.name = "Header Frame";
    headerFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    headerFrame.layoutMode = 'VERTICAL';
    headerFrame.counterAxisAlignItems = 'MIN';
    headerFrame.itemSpacing = 11;

    const headerText = figma.createText();
    headerText.characters = headerName;
    headerText.name = "label";
    headerText.fontSize = 20;
    headerText.fontName = { family: "Inter", style: "Bold" };
    headerText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const tabText = figma.createText();
    tabText.characters = "General";
    tabText.name = "label";
    tabText.fontSize = 14;
    tabText.fontName = { family: "Inter", style: "Bold" };
    tabText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const divider = figma.createRectangle();
    divider.name = "selection";
    divider.resize(51, 3);
    divider.fills = [{ type: 'SOLID', color: { r: Number(blueColor?.r), g: Number(blueColor?.g), b: Number(blueColor?.b) } }];

    headerFrame.appendChild(headerText);
    headerFrame.appendChild(tabText);
    headerFrame.appendChild(divider);

    header.appendChild(headerFrame);


    headerFrame.layoutSizingHorizontal = "FILL";
    headerFrame.layoutSizingVertical = "HUG";

    mainContent.appendChild(header);

    header.layoutSizingVertical = "HUG";
    header.layoutSizingHorizontal = "FILL";
}

export function addItem(bar: FrameNode, textColor: { r: number; g: number; b: number; } | null,iconName: string,value: string,hex: string) {
    showIcon(iconName,iconName, 0, 0, 20, 20, hexToRGBA(hex, 1), bar,true);

    const text = figma.createText();
    text.characters = value;
    text.name = "icon";
    text.fontSize = 14;
    text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    bar.appendChild(text);
}

function addContentFrame(mainContent: FrameNode, background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null) {
    const strokeColor = hexToRgb("#BEBBB8");

    const contentFrame = figma.createFrame();
    contentFrame.name = "Table Frame";
    contentFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    contentFrame.layoutMode = 'HORIZONTAL';
    contentFrame.counterAxisAlignItems = 'MIN';
    contentFrame.paddingLeft = 20;
    contentFrame.paddingRight = 20;

    addColumns(background,textColor, strokeColor, contentFrame);

    mainContent.appendChild(contentFrame);

    contentFrame.layoutSizingVertical = "FILL";
    contentFrame.layoutSizingHorizontal = "FILL";
}

function addColumns(background: { r: number; g: number; b: number; } | null,textColor: { r: number; g: number; b: number; } | null, strokeColor: { r: number; g: number; b: number; } | null, contentFrame: FrameNode) {
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

    addTextRows(contentFrame,4,background,textColor,strokeColor,"Link Value","#0078D7","Column Header","HUG");
    addTextRows(contentFrame,4,background,textColor,strokeColor,"Cell Value","#000000","Column Header","HUG");
    addTextRows(contentFrame,4,background,textColor,strokeColor,"Cell Value","#000000","Column Header","HUG");
    addTextRows(contentFrame,4,background,textColor,strokeColor,"Cell Value","#000000","Column Header","HUG");
    addTextRows(contentFrame,4,background,textColor,strokeColor,"Cell Value","#000000","Column Header","HUG");
    addTextRows(contentFrame,4,background,textColor,strokeColor,"Cell Value","#000000","Column Header","HUG");
    addTextRows(contentFrame,4,background,textColor,strokeColor,"Cell Value","#000000","Column Header","HUG");
    addTextRows(contentFrame,4,background,textColor,strokeColor,"Cell Value","#000000","Column Header","HUG");

    columnFrame1.layoutSizingHorizontal = "HUG";
    columnFrame1.layoutSizingVertical = "HUG";
    columnFrame2.layoutSizingHorizontal = "HUG";
    columnFrame2.layoutSizingVertical = "HUG";
}

export function addIconRows(tableFrame: FrameNode, count: number, background: { r: number; g: number; b: number; } | null, strokeColor: { r: number; g: number; b: number; } | null, hex: string, iconName: string) {
    
    for (let index = 0; index < count; index++) {
        const cellFrame = figma.createFrame();
        cellFrame.name = "Cells";
        cellFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
        cellFrame.strokes = [{ type: 'SOLID', color: { r: Number(strokeColor?.r), g: Number(strokeColor?.g), b: Number(strokeColor?.b) } }];
        cellFrame.layoutMode = 'VERTICAL';
        cellFrame.resize(40,35);
        cellFrame.counterAxisAlignItems = 'CENTER';
        cellFrame.paddingTop = 10;
        cellFrame.paddingBottom = 5;
        cellFrame.strokeBottomWeight = 1;
        cellFrame.itemSpacing = 15;

        if(index == 0) showIcon(iconName,iconName, 0, 0, 20, 20, hexToRGBA(hex, 1), cellFrame,true);
        else showIcon(iconName,iconName, 0, 0, 20, 20, hexToRGBA(hex, 1), cellFrame,false);
        
        tableFrame.appendChild(cellFrame);
    
        cellFrame.layoutSizingVertical = "HUG";
    }

    
}

export function addTextRows(contentFrame: FrameNode, count: number, background: { r: number; g: number; b: number; } | null,textColor: { r: number; g: number; b: number; } | null, strokeColor: { r: number; g: number; b: number; } | null, value: string,textHex: string,headerName: string,horizontal: LayoutMixin["layoutSizingHorizontal"]) {
    const textRGB = hexToRgb(textHex);

    const columnFrame = figma.createFrame();
    columnFrame.name = "Column Frame";
    columnFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    columnFrame.layoutMode = 'VERTICAL';
    columnFrame.resize(40,35);
    columnFrame.counterAxisAlignItems = 'CENTER';
    columnFrame.paddingTop = 10;
    columnFrame.paddingBottom = 8;
    
    const headerFrame = figma.createFrame();
    headerFrame.name = "Column Header";
    headerFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    headerFrame.strokes = [{ type: 'SOLID', color: { r: Number(strokeColor?.r), g: Number(strokeColor?.g), b: Number(strokeColor?.b) } }];
    headerFrame.layoutMode = 'HORIZONTAL';
    headerFrame.counterAxisAlignItems = 'MIN';
    headerFrame.paddingLeft = 10;
    headerFrame.paddingBottom = 8;
    headerFrame.itemSpacing = 5;
    headerFrame.strokeBottomWeight = 1;

    const text = figma.createText();
    text.characters = headerName;
    text.name = "Label";
    text.fontSize = 14;
    text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    headerFrame.appendChild(text);
    showIcon("up","ArrowUp", 0, 0, 16, 16, hexToRGBA("#000000", 1), headerFrame,true);
    showIcon("down","Down", 0, 0, 16, 16, hexToRGBA("#000000", 1), headerFrame,true);
    showIcon("arrowdown","ArrowDown", 0, 0, 16, 16, hexToRGBA("#000000", 1), headerFrame,true);
    showIcon("filter","Filter", 0, 0, 16, 16, hexToRGBA("#000000", 1), headerFrame,true);

    columnFrame.appendChild(headerFrame);
    
    for (let index = 0; index < count; index++) {
        const cellFrame = figma.createFrame();
        cellFrame.name = "Cells";
        cellFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
        cellFrame.strokes = [{ type: 'SOLID', color: { r: Number(strokeColor?.r), g: Number(strokeColor?.g), b: Number(strokeColor?.b) } }];
        cellFrame.layoutMode = 'VERTICAL';
        cellFrame.resize(40,35);
        cellFrame.counterAxisAlignItems = 'MIN';
        cellFrame.paddingTop = 10;
        cellFrame.paddingLeft = 10;
        cellFrame.paddingBottom = 8;
        cellFrame.strokeBottomWeight = 1;
        cellFrame.itemSpacing = 15;

        const cellText = figma.createText();
        cellText.characters = value;
        cellText.name = "Value";
        cellText.fontSize = 14;
        cellText.fills = [{ type: 'SOLID', color: { r: Number(textRGB?.r), g: Number(textRGB?.g), b: Number(textRGB?.b) } }];

        cellFrame.appendChild(cellText);

        columnFrame.appendChild(cellFrame);

        cellFrame.layoutSizingVertical = "HUG";
        cellFrame.layoutSizingHorizontal = "FILL";
    }

    contentFrame.appendChild(columnFrame);

    columnFrame.layoutSizingVertical = "HUG";
    columnFrame.layoutSizingHorizontal = horizontal;
    headerFrame.layoutSizingVertical = "HUG";
    headerFrame.layoutSizingHorizontal = horizontal;
}   

export function addTextFromGridRows(contentFrame: FrameNode, background: { r: number; g: number; b: number; } | null,textColor: { r: number; g: number; b: number; } | null, 
    strokeColor: { r: number; g: number; b: number; } | null, rows: Row[],language: string,textHex: string,headerName: string,horizontal: LayoutMixin["layoutSizingHorizontal"]) {
    const textRGB = hexToRgb(textHex);

    const columnFrame = figma.createFrame();
    columnFrame.name = "Column Frame";
    columnFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    columnFrame.layoutMode = 'VERTICAL';
    columnFrame.resize(40,35);
    columnFrame.counterAxisAlignItems = 'CENTER';
    columnFrame.paddingTop = 10;
    columnFrame.paddingBottom = 8;
    
    const headerFrame = figma.createFrame();
    headerFrame.name = "Column Header";
    headerFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    headerFrame.strokes = [{ type: 'SOLID', color: { r: Number(strokeColor?.r), g: Number(strokeColor?.g), b: Number(strokeColor?.b) } }];
    headerFrame.layoutMode = 'HORIZONTAL';
    headerFrame.counterAxisAlignItems = 'MIN';
    headerFrame.paddingLeft = 10;
    headerFrame.paddingBottom = 8;
    headerFrame.itemSpacing = 5;
    headerFrame.strokeBottomWeight = 1;

    const text = figma.createText();
    text.characters = headerName;
    text.name = "Label";
    text.fontSize = 14;
    text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    headerFrame.appendChild(text);
    showIcon("up","ArrowUp", 0, 0, 16, 16, hexToRGBA("#000000", 1), headerFrame,true);
    showIcon("down","Down", 0, 0, 16, 16, hexToRGBA("#000000", 1), headerFrame,true);
    showIcon("arrowdown","ArrowDown", 0, 0, 16, 16, hexToRGBA("#000000", 1), headerFrame,true);
    showIcon("filter","Filter", 0, 0, 16, 16, hexToRGBA("#000000", 1), headerFrame,true);

    columnFrame.appendChild(headerFrame);
    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];

        const cellFrame = figma.createFrame();
        cellFrame.name = "Cells";
        cellFrame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
        cellFrame.strokes = [{ type: 'SOLID', color: { r: Number(strokeColor?.r), g: Number(strokeColor?.g), b: Number(strokeColor?.b) } }];
        cellFrame.layoutMode = 'VERTICAL';
        cellFrame.resize(40,35);

        if(isNumber(row.value) || isDate(row.value)) {
            cellFrame.counterAxisAlignItems = 'MAX';
        } else cellFrame.counterAxisAlignItems = 'MIN';

        cellFrame.paddingTop = 10;
        cellFrame.paddingLeft = 10;
        cellFrame.paddingBottom = 8;
        cellFrame.strokeBottomWeight = 1;
        cellFrame.itemSpacing = 15;

        const val = isDate(row.value) && language != "none" ? formatDate(language) : "" + row.value;
        const cellText = figma.createText();
        cellText.characters = val;
        cellText.name = "Value";
        cellText.fontSize = 14;
        cellText.fills = [{ type: 'SOLID', color: { r: Number(textRGB?.r), g: Number(textRGB?.g), b: Number(textRGB?.b) } }];

        cellFrame.appendChild(cellText);

        columnFrame.appendChild(cellFrame);

        cellFrame.layoutSizingVertical = "HUG";
        cellFrame.layoutSizingHorizontal = "FILL";
    }

    contentFrame.appendChild(columnFrame);

    columnFrame.layoutSizingVertical = "HUG";
    columnFrame.layoutSizingHorizontal = horizontal;
    headerFrame.layoutSizingVertical = "HUG";
    headerFrame.layoutSizingHorizontal = "FILL";
}  