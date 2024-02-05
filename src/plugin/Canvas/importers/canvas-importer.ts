import { findLastX, showIcon } from "../../../util/utils";
import {hexToRGBA, hexToRgb} from '../../../util/colorUtil';

export function makeCanvasTemplate() {
    const background = hexToRgb("#FFFFFF");
    const textColor = hexToRgb("#34306D");
    const mainColor = hexToRgb("#B04B6F");
    const menucolor = hexToRgb("#231F20");

    createDashboard(background,textColor,mainColor,menucolor);
    createCalendar(background,textColor,mainColor,menucolor);
    createSearch(background,textColor,mainColor,menucolor);
    createHistory(background,textColor,mainColor,menucolor);

    figma.notify("Canvas Template created");
}

function createDashboard(background: {r: number,g:number,b:number} | null,textColor: {r: number,g:number,b:number}| null,mainColor: {r: number,g:number,b:number}| null,menucolor: {r: number,g:number,b:number}| null) {
    var lastX = findLastX();
    var lastY = 0;

    const boxSecondColor = hexToRgb("#64B9DE");
    const boxThirdColor = hexToRgb("#7FD1AE");
    const boxMiddleColor = hexToRgb("#929DAF");
    const boxTextColor = hexToRgb("#FFFFFF");

    const frame = figma.createFrame();
    frame.x = Number(lastX);
    frame.y = Number(lastY);
    frame.name = "Dashboard";
    frame.resize(640, 1136);
    frame.cornerRadius = 10;
    frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const title = figma.createText();
    title.fontName = { family: "Poppins", style: "Bold" };
    title.characters = "John Doe";
    title.name = "lbl_dashtitle";
    title.x = 50;
    title.y = 40;
    title.fontSize = 25;
    title.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const dscr = figma.createText();
    dscr.fontName = { family: "Poppins", style: "Regular" };
    dscr.characters = "project manager";
    dscr.name = "lbl_dashdscr";
    dscr.x = title.x;
    dscr.y = title.y + title.height + 10;
    dscr.fontSize = 20;
    dscr.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const rectangleLeft = figma.createRectangle();
    rectangleLeft.x = dscr.x;
    rectangleLeft.y = dscr.y + dscr.height + 30;
    rectangleLeft.name = "html_dashleft";
    rectangleLeft.resize(250, 222);
    rectangleLeft.fills = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];
    rectangleLeft.cornerRadius = 10;

    const titleLeft = figma.createText();
    titleLeft.fontName = { family: "Poppins", style: "Bold" };
    titleLeft.characters = "10";
    titleLeft.name = "lbl_dashtitleleft";
    titleLeft.x = rectangleLeft.x + rectangleLeft.width / 2 - 18;
    titleLeft.y = rectangleLeft.y + rectangleLeft.height / 5;
    titleLeft.fontSize = 35;
    titleLeft.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];

    const subTitleLeft = figma.createText();
    subTitleLeft.fontName = { family: "Poppins", style: "Regular" };
    subTitleLeft.characters = "total fund [h]";
    subTitleLeft.name = "lbl_dashsubtitleleft";
    subTitleLeft.x = rectangleLeft.x + 30;
    subTitleLeft.y = titleLeft.y + titleLeft.height + 5;
    subTitleLeft.fontSize = 30;
    subTitleLeft.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];

    const rectangleRight = figma.createRectangle();
    rectangleRight.x = rectangleLeft.x + rectangleLeft.width + 40;
    rectangleRight.y = rectangleLeft.y;
    rectangleRight.name = "html_dashright";
    rectangleRight.resize(rectangleLeft.width + 20, 130);
    rectangleRight.fills = [{ type: 'SOLID', color: { r: Number(boxSecondColor?.r), g: Number(boxSecondColor?.g), b: Number(boxSecondColor?.b) } }];
    rectangleRight.cornerRadius = 10;

    const titleRight = figma.createText();
    titleRight.fontName = { family: "Poppins", style: "Bold" };
    titleRight.characters = "10";
    titleRight.name = "lbl_dashtitleright";
    titleRight.x = rectangleRight.x + rectangleRight.width / 3 + 28;
    titleRight.y = rectangleRight.y + rectangleRight.height / 3 - 20;
    titleRight.fontSize = 35;
    titleRight.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];

    const subTitleRight = figma.createText();
    subTitleRight.fontName = { family: "Poppins", style: "Regular" };
    subTitleRight.characters = "sick days [h]";
    subTitleRight.name = "lbl_dashsubtitleright";
    subTitleRight.x = rectangleRight.x + 50;
    subTitleRight.y = titleRight.y + titleRight.height;
    subTitleRight.fontSize = 30;
    subTitleRight.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];

    const rectangleBottom = figma.createRectangle();
    rectangleBottom.x = rectangleRight.x;
    rectangleBottom.y = rectangleRight.y + rectangleRight.height + 20;
    rectangleBottom.name = "html_dashbottom";
    rectangleBottom.resize(rectangleLeft.width + 20, 130);
    rectangleBottom.fills = [{ type: 'SOLID', color: { r: Number(boxThirdColor?.r), g: Number(boxThirdColor?.g), b: Number(boxThirdColor?.b) } }];
    rectangleBottom.cornerRadius = 10;

    const titleBottom = figma.createText();
    titleBottom.fontName = { family: "Poppins", style: "Bold" };
    titleBottom.characters = "10";
    titleBottom.name = "lbl_dashtitlebottom";
    titleBottom.x = rectangleBottom.x + rectangleBottom.width / 3 + 28;
    titleBottom.y = rectangleBottom.y + rectangleBottom.height / 3 - 20;
    titleBottom.fontSize = 35;
    titleBottom.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];

    const subTitleBottom = figma.createText();
    subTitleBottom.fontName = { family: "Poppins", style: "Regular" };
    subTitleBottom.characters = "Approved HO [h]";
    subTitleBottom.name = "lbl_dashsubtitlebottom";
    subTitleBottom.x = rectangleBottom.x + 10;
    subTitleBottom.y = titleBottom.y + titleBottom.height;
    subTitleBottom.fontSize = 30;
    subTitleBottom.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];

    const rectangleMiddle = figma.createRectangle();
    rectangleMiddle.x = rectangleLeft.x;
    rectangleMiddle.y = rectangleBottom.y + rectangleBottom.height + 30;
    rectangleMiddle.name = "html_dashmiddle";
    rectangleMiddle.resize(rectangleLeft.width*2 + 60, 130);
    rectangleMiddle.fills = [{ type: 'SOLID', color: { r: Number(boxMiddleColor?.r), g: Number(boxMiddleColor?.g), b: Number(boxMiddleColor?.b) } }];
    rectangleMiddle.cornerRadius = 10;

    const textMiddleHour = figma.createText();
    textMiddleHour.fontName = { family: "Poppins", style: "Bold" };
    textMiddleHour.characters = "Working Hours";
    textMiddleHour.name = "lbl_dashhourtext";
    textMiddleHour.x = rectangleMiddle.x + 30;
    textMiddleHour.y = rectangleMiddle.y + 20;
    textMiddleHour.fontSize = 25;
    textMiddleHour.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];

    const textMiddleHourValue = figma.createText();
    textMiddleHourValue.fontName = { family: "Poppins", style: "Bold" };
    textMiddleHourValue.characters = "8 h";
    textMiddleHourValue.name = "lbl_dashhourvalue";
    textMiddleHourValue.x = rectangleMiddle.x + textMiddleHour.width/2;
    textMiddleHourValue.y = textMiddleHour.y + textMiddleHour.height + 10;
    textMiddleHourValue.fontSize = 25;
    textMiddleHourValue.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];

    const textMiddleApprover = figma.createText();
    textMiddleApprover.fontName = { family: "Poppins", style: "Bold" };
    textMiddleApprover.characters = "Approver";
    textMiddleApprover.name = "lbl_dashapprovertext";
    textMiddleApprover.x = textMiddleHour.x + textMiddleHour.width*2 - 50;
    textMiddleApprover.y = textMiddleHour.y;
    textMiddleApprover.fontSize = 25;
    textMiddleApprover.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];

    const textMiddleApproverValue = figma.createText();
    textMiddleApproverValue.fontName = { family: "Poppins", style: "Bold" };
    textMiddleApproverValue.characters = "Mike Doe";
    textMiddleApproverValue.name = "lbl_dashapprover";
    textMiddleApproverValue.x = textMiddleApprover.x + textMiddleApprover.width/2 - 10;
    textMiddleApproverValue.y = textMiddleApprover.y + textMiddleApprover.height + 10;
    textMiddleApproverValue.fontSize = 25;
    textMiddleApproverValue.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];

    const textUpcomming = figma.createText();
    textUpcomming.fontName = { family: "Poppins", style: "Regular" };
    textUpcomming.characters = "Upcoming Vacation";
    textUpcomming.name = "lbl_dashupcomingtext";
    textUpcomming.x = rectangleMiddle.x;
    textUpcomming.y = rectangleMiddle.y + rectangleMiddle.height + 20;
    textUpcomming.fontSize = 25;
    textUpcomming.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const rectangleUpcoming = figma.createRectangle();
    rectangleUpcoming.x = textUpcomming.x;
    rectangleUpcoming.y = textUpcomming.y + textUpcomming.height + 20;
    rectangleUpcoming.name = "html_dashupcoming";
    rectangleUpcoming.resize(rectangleLeft.width*2 + 60, 130);
    rectangleUpcoming.fills = [{ type: 'SOLID', color: { r: Number(boxThirdColor?.r), g: Number(boxThirdColor?.g), b: Number(boxThirdColor?.b) } }];
    rectangleUpcoming.cornerRadius = 10;

    const textVacation = figma.createText();
    textVacation.fontName = { family: "Poppins", style: "Regular" };
    textVacation.characters = "Vacation";
    textVacation.name = "lbl_dashvacation";
    textVacation.x = rectangleUpcoming.x + 20;
    textVacation.y = rectangleUpcoming.y + 20;
    textVacation.fontSize = 25;
    textVacation.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];

    const textDate = figma.createText();
    textDate.fontName = { family: "Poppins", style: "Regular" };
    textDate.characters = "01.12.2023 - 02.12.2023";
    textDate.name = "lbl_dashdate";
    textDate.x = textVacation.x;
    textDate.y = textVacation.y + textVacation.height * 2 - 10;
    textDate.fontSize = 25;
    textDate.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b)  } }];

    const buttonFrame = figma.createFrame();
    buttonFrame.name = "btn_dashadd";
    buttonFrame.cornerRadius = 10;
    buttonFrame.resize(190,60);
    buttonFrame.x = rectangleUpcoming.x + rectangleUpcoming.width - 190;
    buttonFrame.y = rectangleUpcoming.y + rectangleUpcoming.height*2;
    buttonFrame.fills = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];
    
    const text = figma.createText();
    text.textAlignHorizontal = "CENTER";
    text.textAlignVertical = "CENTER";
    text.characters = "Add Absence";
    text.fontSize = 25;
    text.resize(190,60);
    text.fills = [{ type: 'SOLID', color: { r: Number(boxTextColor?.r), g: Number(boxTextColor?.g), b: Number(boxTextColor?.b) } }];
    
    buttonFrame.layoutMode = 'HORIZONTAL';
    buttonFrame.counterAxisAlignItems = 'CENTER';

    buttonFrame.appendChild(text);

    const rectangleMenu = figma.createRectangle();
    rectangleMenu.x = 0;
    rectangleMenu.y = 1036;
    rectangleMenu.name = "rect_dashmenu";
    rectangleMenu.resize(640, 100);
    rectangleMenu.fills = [{ type: 'SOLID', color: { r: Number(menucolor?.r), g: Number(menucolor?.g), b: Number(menucolor?.b) } }];
    rectangleMenu.cornerRadius = 10;

    const rectangleSel = figma.createRectangle();
    rectangleSel.x = rectangleMenu.x + 45;
    rectangleSel.y = rectangleMenu.y + rectangleMenu.height - 15;
    rectangleSel.name = "html_dashsel";
    rectangleSel.resize(60, 10);
    rectangleSel.fills = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];
    rectangleSel.cornerRadius = 10;

    frame.appendChild(title);
    frame.appendChild(dscr);

    frame.appendChild(rectangleLeft);
    frame.appendChild(titleLeft);
    frame.appendChild(subTitleLeft);

    frame.appendChild(rectangleRight);
    frame.appendChild(titleRight);
    frame.appendChild(subTitleRight);

    frame.appendChild(rectangleBottom);
    frame.appendChild(titleBottom);
    frame.appendChild(subTitleBottom);

    frame.appendChild(rectangleMiddle);
    frame.appendChild(textMiddleHour);
    frame.appendChild(textMiddleHourValue);
    frame.appendChild(textMiddleApprover);
    frame.appendChild(textMiddleApproverValue);

    frame.appendChild(textUpcomming);
    frame.appendChild(rectangleUpcoming);
    frame.appendChild(textVacation);
    frame.appendChild(textDate);
    
    showIcon("dashright2","Right",rectangleUpcoming.x + rectangleUpcoming.width - 60,rectangleUpcoming.y + rectangleUpcoming.height/2 - 20,45,45,hexToRGBA("#FFFFFF",1),frame,true);
    
    frame.appendChild(buttonFrame);
    frame.appendChild(rectangleMenu);
    
    showIcon("dashhome","Home",rectangleMenu.x + 50,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("dashcalendar","CalendarBlank",rectangleMenu.x + 210,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("dashsearch","Search",rectangleMenu.x + 380,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("dashhistory","History",rectangleMenu.x + 550,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);

    frame.appendChild(rectangleSel);
}

function createCalendar(background: {r: number,g:number,b:number} | null,textColor: {r: number,g:number,b:number}| null,mainColor: {r: number,g:number,b:number}| null,menucolor: {r: number,g:number,b:number}| null) {
    var lastX = findLastX();
    var lastY = 0;

    const disabledColor = hexToRgb("#BABABA");
    const calendarColor = hexToRgb("#F9FAFA");
    const waitingColor = hexToRgb("#FFAB5E");

    const frame = figma.createFrame();
    frame.x = Number(lastX);
    frame.y = Number(lastY);
    frame.name = "Calendar";
    frame.resize(640, 1136);
    frame.cornerRadius = 10;
    frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const title = figma.createText();
    title.fontName = { family: "Poppins", style: "Bold" };
    title.characters = "John Doe";
    title.name = "lbl_caltitle";
    title.x = 50;
    title.y = 40;
    title.fontSize = 25;
    title.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const dscr = figma.createText();
    dscr.fontName = { family: "Poppins", style: "Regular" };
    dscr.characters = "project manager";
    dscr.name = "lbl_caldscr";
    dscr.x = title.x;
    dscr.y = title.y + title.height + 10;
    dscr.fontSize = 20;
    dscr.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const calendarFrame = figma.createFrame();
    calendarFrame.name = "cal_calvacation";
    calendarFrame.cornerRadius = 10;
    calendarFrame.resize(frame.width - 100,390);
    calendarFrame.x = dscr.x;
    calendarFrame.y = dscr.y + dscr.height + 30;
    calendarFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) } }];
    
    const topFrame = figma.createFrame();
    topFrame.name = "top";
    topFrame.cornerRadius = 10;
    topFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) },opacity: 0 }];
    topFrame.resize(calendarFrame.width,90);

    const topText = figma.createText();
    topText.fontName = { family: "Poppins", style: "Bold" };
    topText.characters = "December 2023";
    topText.name = "lbl_calmonth";
    topText.fontSize = 21;
    topText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];
    
    topFrame.layoutMode = 'HORIZONTAL';
    topFrame.counterAxisAlignItems = 'CENTER';
    topFrame.primaryAxisAlignItems = 'CENTER';
    topFrame.itemSpacing = 10;
    
    showIcon("calprev","Left",0,0,45,45,hexToRGBA("#34306D",1),topFrame,true);
    topFrame.appendChild(topText);
    showIcon("calnext","Right",0,0,45,45,hexToRGBA("#34306D",1),topFrame,true);
    
    const bottomFrame = figma.createFrame();
    bottomFrame.name = "bottom";
    bottomFrame.cornerRadius = 10;
    bottomFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) },opacity: 0 }];
    bottomFrame.resize(calendarFrame.width,300);

    const sundayFrame = figma.createFrame();
    sundayFrame.name = "sunday";
    sundayFrame.cornerRadius = 10;
    sundayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) },opacity: 0 }];
    sundayFrame.resize(55,bottomFrame.height);

    const sundayText = figma.createText();
    sundayText.fontName = { family: "Poppins", style: "Bold" };
    sundayText.characters = "Su";
    sundayText.name = "su_caltext";
    sundayText.fontSize = 21;
    sundayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1Text = figma.createText();
    w1Text.fontName = { family: "Poppins", style: "Regular" };
    w1Text.characters = "26";
    w1Text.name = "w1_caltext";
    w1Text.fontSize = 21;
    w1Text.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];

    const w2Text = figma.createText();
    w2Text.fontName = { family: "Poppins", style: "Regular" };
    w2Text.characters = "3";
    w2Text.name = "w2_caltext";
    w2Text.fontSize = 21;
    w2Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3Text = figma.createText();
    w3Text.fontName = { family: "Poppins", style: "Regular" };
    w3Text.characters = "10";
    w3Text.name = "w3_caltext";
    w3Text.fontSize = 21;
    w3Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4Text = figma.createText();
    w4Text.fontName = { family: "Poppins", style: "Regular" };
    w4Text.characters = "17";
    w4Text.name = "w4_caltext";
    w4Text.fontSize = 21;
    w4Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5Text = figma.createText();
    w5Text.fontName = { family: "Poppins", style: "Regular" };
    w5Text.characters = "24";
    w5Text.name = "w5_caltext";
    w5Text.fontSize = 21;
    w5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w6Text = figma.createText();
    w6Text.fontName = { family: "Poppins", style: "Regular" };
    w6Text.characters = "31";
    w6Text.name = "w6_caltext";
    w6Text.fontSize = 21;
    w6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    sundayFrame.layoutMode = 'VERTICAL';
    sundayFrame.counterAxisAlignItems = 'CENTER';
    sundayFrame.itemSpacing = 10;

    sundayFrame.appendChild(sundayText);
    sundayFrame.appendChild(w1Text);
    sundayFrame.appendChild(w2Text);
    sundayFrame.appendChild(w3Text);
    sundayFrame.appendChild(w4Text);
    sundayFrame.appendChild(w5Text);
    sundayFrame.appendChild(w6Text);

    const mondayFrame = figma.createFrame();
    mondayFrame.name = "monday";
    mondayFrame.cornerRadius = 10;
    mondayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) },opacity: 0 }];
    mondayFrame.resize(55,bottomFrame.height);

    const mondayText = figma.createText();
    mondayText.fontName = { family: "Poppins", style: "Bold" };
    mondayText.characters = "Mo";
    mondayText.name = "mo_caltext";
    mondayText.fontSize = 21;
    mondayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_1Text = figma.createText();
    w1_1Text.fontName = { family: "Poppins", style: "Regular" };
    w1_1Text.characters = "27";
    w1_1Text.name = "w1_1caltext";
    w1_1Text.fontSize = 21;
    w1_1Text.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];

    const w2_1Text = figma.createText();
    w2_1Text.fontName = { family: "Poppins", style: "Regular" };
    w2_1Text.characters = "4";
    w2_1Text.name = "w2_1caltext";
    w2_1Text.fontSize = 21;
    w2_1Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_1Text = figma.createText();
    w3_1Text.fontName = { family: "Poppins", style: "Regular" };
    w3_1Text.characters = "11";
    w3_1Text.name = "w3_1caltext";
    w3_1Text.fontSize = 21;
    w3_1Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_1Text = figma.createText();
    w4_1Text.fontName = { family: "Poppins", style: "Regular" };
    w4_1Text.characters = "18";
    w4_1Text.name = "w4_1caltext";
    w4_1Text.fontSize = 21;
    w4_1Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_1Text = figma.createText();
    w5_1Text.fontName = { family: "Poppins", style: "Regular" };
    w5_1Text.characters = "25";
    w5_1Text.name = "w5_1caltext";
    w5_1Text.fontSize = 21;
    w5_1Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    mondayFrame.layoutMode = 'VERTICAL';
    mondayFrame.counterAxisAlignItems = 'CENTER';
    mondayFrame.itemSpacing = 10;

    mondayFrame.appendChild(mondayText);
    mondayFrame.appendChild(w1_1Text);
    mondayFrame.appendChild(w2_1Text);
    mondayFrame.appendChild(w3_1Text);
    mondayFrame.appendChild(w4_1Text);
    mondayFrame.appendChild(w5_1Text);

    const tuesdayFrame = figma.createFrame();
    tuesdayFrame.name = "tuesday";
    tuesdayFrame.cornerRadius = 10;
    tuesdayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) },opacity: 0 }];
    tuesdayFrame.resize(55,bottomFrame.height);

    const tuesdayText = figma.createText();
    tuesdayText.fontName = { family: "Poppins", style: "Bold" };
    tuesdayText.characters = "Tu";
    tuesdayText.name = "tu_caltext";
    tuesdayText.fontSize = 21;
    tuesdayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_2Text = figma.createText();
    w1_2Text.fontName = { family: "Poppins", style: "Regular" };
    w1_2Text.characters = "28";
    w1_2Text.name = "w2_2caltext";
    w1_2Text.fontSize = 21;
    w1_2Text.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];

    const w2_2Text = figma.createText();
    w2_2Text.fontName = { family: "Poppins", style: "Regular" };
    w2_2Text.characters = "5";
    w2_2Text.name = "w2_2caltext";
    w2_2Text.fontSize = 21;
    w2_2Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_2Text = figma.createText();
    w3_2Text.fontName = { family: "Poppins", style: "Regular" };
    w3_2Text.characters = "12";
    w3_2Text.name = "w3_2caltext";
    w3_2Text.fontSize = 21;
    w3_2Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_2Text = figma.createText();
    w4_2Text.fontName = { family: "Poppins", style: "Regular" };
    w4_2Text.characters = "19";
    w4_2Text.name = "w4_2caltext";
    w4_2Text.fontSize = 21;
    w4_2Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_2Text = figma.createText();
    w5_2Text.fontName = { family: "Poppins", style: "Regular" };
    w5_2Text.characters = "26";
    w5_2Text.name = "w5_2caltext";
    w5_2Text.fontSize = 21;
    w5_2Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    tuesdayFrame.layoutMode = 'VERTICAL';
    tuesdayFrame.counterAxisAlignItems = 'CENTER';
    tuesdayFrame.itemSpacing = 10;

    tuesdayFrame.appendChild(tuesdayText);
    tuesdayFrame.appendChild(w1_2Text);
    tuesdayFrame.appendChild(w2_2Text);
    tuesdayFrame.appendChild(w3_2Text);
    tuesdayFrame.appendChild(w4_2Text);
    tuesdayFrame.appendChild(w5_2Text);

    const wednesdayFrame = figma.createFrame();
    wednesdayFrame.name = "wednesday";
    wednesdayFrame.cornerRadius = 10;
    wednesdayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) },opacity: 0 }];
    wednesdayFrame.resize(55,bottomFrame.height);

    const wednesdayText = figma.createText();
    wednesdayText.fontName = { family: "Poppins", style: "Bold" };
    wednesdayText.characters = "We";
    wednesdayText.name = "we_caltext";
    wednesdayText.fontSize = 21;
    wednesdayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_3Text = figma.createText();
    w1_3Text.fontName = { family: "Poppins", style: "Regular" };
    w1_3Text.characters = "29";
    w1_3Text.name = "w2_3caltext";
    w1_3Text.fontSize = 21;
    w1_3Text.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];

    const w2_3Text = figma.createText();
    w2_3Text.fontName = { family: "Poppins", style: "Regular" };
    w2_3Text.characters = "6";
    w2_3Text.name = "w2_3calText";
    w2_3Text.fontSize = 21;
    w2_3Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_3Text = figma.createText();
    w3_3Text.fontName = { family: "Poppins", style: "Regular" };
    w3_3Text.characters = "13";
    w3_3Text.name = "w3_3calText";
    w3_3Text.fontSize = 21;
    w3_3Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_3Text = figma.createText();
    w4_3Text.fontName = { family: "Poppins", style: "Regular" };
    w4_3Text.characters = "20";
    w4_3Text.name = "w4_3calText";
    w4_3Text.fontSize = 21;
    w4_3Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_3Text = figma.createText();
    w5_3Text.fontName = { family: "Poppins", style: "Regular" };
    w5_3Text.characters = "27";
    w5_3Text.name = "w5_3caltext";
    w5_3Text.fontSize = 21;
    w5_3Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    wednesdayFrame.layoutMode = 'VERTICAL';
    wednesdayFrame.counterAxisAlignItems = 'CENTER';
    wednesdayFrame.itemSpacing = 10;

    wednesdayFrame.appendChild(wednesdayText);
    wednesdayFrame.appendChild(w1_3Text);
    wednesdayFrame.appendChild(w2_3Text);
    wednesdayFrame.appendChild(w3_3Text);
    wednesdayFrame.appendChild(w4_3Text);
    wednesdayFrame.appendChild(w5_3Text);

    const thursdayFrame = figma.createFrame();
    thursdayFrame.name = "thursday";
    thursdayFrame.cornerRadius = 10;
    thursdayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) },opacity: 0 }];
    thursdayFrame.resize(55,bottomFrame.height);

    const thursdayText = figma.createText();
    thursdayText.fontName = { family: "Poppins", style: "Bold" };
    thursdayText.characters = "Th";
    thursdayText.name = "th_caltext";
    thursdayText.fontSize = 21;
    thursdayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_4Text = figma.createText();
    w1_4Text.fontName = { family: "Poppins", style: "Regular" };
    w1_4Text.characters = "30";
    w1_4Text.name = "w1_4calText";
    w1_4Text.fontSize = 21;
    w1_4Text.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];

    const w2_4Text = figma.createText();
    w2_4Text.fontName = { family: "Poppins", style: "Regular" };
    w2_4Text.characters = "7";
    w2_4Text.name = "w2_4calText";
    w2_4Text.fontSize = 21;
    w2_4Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_4Text = figma.createText();
    w3_4Text.fontName = { family: "Poppins", style: "Regular" };
    w3_4Text.characters = "14";
    w3_4Text.name = "w3_4calText";
    w3_4Text.fontSize = 21;
    w3_4Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_4Text = figma.createText();
    w4_4Text.fontName = { family: "Poppins", style: "Regular" };
    w4_4Text.characters = "21";
    w4_4Text.name = "w4_4calText";
    w4_4Text.fontSize = 21;
    w4_4Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_4Text = figma.createText();
    w5_4Text.fontName = { family: "Poppins", style: "Regular" };
    w5_4Text.characters = "28";
    w5_4Text.name = "w5_4caltext";
    w5_4Text.fontSize = 21;
    w5_4Text.fills = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];
    w5_4Text.strokes = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];

    thursdayFrame.layoutMode = 'VERTICAL';
    thursdayFrame.counterAxisAlignItems = 'CENTER';
    thursdayFrame.itemSpacing = 10;

    thursdayFrame.appendChild(thursdayText);
    thursdayFrame.appendChild(w1_4Text);
    thursdayFrame.appendChild(w2_4Text);
    thursdayFrame.appendChild(w3_4Text);
    thursdayFrame.appendChild(w4_4Text);
    thursdayFrame.appendChild(w5_4Text);

    const fridayFrame = figma.createFrame();
    fridayFrame.name = "friday";
    fridayFrame.cornerRadius = 10;
    fridayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) },opacity: 0 }];
    fridayFrame.resize(55,bottomFrame.height);

    const fridayText = figma.createText();
    fridayText.fontName = { family: "Poppins", style: "Bold" };
    fridayText.characters = "Fr";
    fridayText.name = "fr_caltext";
    fridayText.fontSize = 21;
    fridayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_5Text = figma.createText();
    w1_5Text.fontName = { family: "Poppins", style: "Regular" };
    w1_5Text.characters = "1";
    w1_5Text.name = "w1_5calText";
    w1_5Text.fontSize = 21;
    w1_5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w2_5Text = figma.createText();
    w2_5Text.fontName = { family: "Poppins", style: "Regular" };
    w2_5Text.characters = "8";
    w2_5Text.name = "w2_5calText";
    w2_5Text.fontSize = 21;
    w2_5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_5Text = figma.createText();
    w3_5Text.fontName = { family: "Poppins", style: "Regular" };
    w3_5Text.characters = "15";
    w3_5Text.name = "w3_5calText";
    w3_5Text.fontSize = 21;
    w3_5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_5Text = figma.createText();
    w4_5Text.fontName = { family: "Poppins", style: "Regular" };
    w4_5Text.characters = "22";
    w4_5Text.name = "w4_5calText";
    w4_5Text.fontSize = 21;
    w4_5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_5Text = figma.createText();
    w5_5Text.fontName = { family: "Poppins", style: "Regular" };
    w5_5Text.characters = "29";
    w5_5Text.name = "w5_5caltext";
    w5_5Text.fontSize = 21;
    w5_5Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    fridayFrame.layoutMode = 'VERTICAL';
    fridayFrame.counterAxisAlignItems = 'CENTER';
    fridayFrame.itemSpacing = 10;

    fridayFrame.appendChild(fridayText);
    fridayFrame.appendChild(w1_5Text);
    fridayFrame.appendChild(w2_5Text);
    fridayFrame.appendChild(w3_5Text);
    fridayFrame.appendChild(w4_5Text);
    fridayFrame.appendChild(w5_5Text);

    const saturdayFrame = figma.createFrame();
    saturdayFrame.name = "saturday";
    saturdayFrame.cornerRadius = 10;
    saturdayFrame.fills = [{ type: 'SOLID', color: { r: Number(calendarColor?.r), g: Number(calendarColor?.g), b: Number(calendarColor?.b) },opacity: 0 }];
    saturdayFrame.resize(55,bottomFrame.height);

    const saturdayText = figma.createText();
    saturdayText.fontName = { family: "Poppins", style: "Bold" };
    saturdayText.characters = "Sa";
    saturdayText.name = "sa_caltext";
    saturdayText.fontSize = 21;
    saturdayText.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w1_6Text = figma.createText();
    w1_6Text.fontName = { family: "Poppins", style: "Regular" };
    w1_6Text.characters = "2";
    w1_6Text.name = "w1_6calText";
    w1_6Text.fontSize = 21;
    w1_6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w2_6Text = figma.createText();
    w2_6Text.fontName = { family: "Poppins", style: "Regular" };
    w2_6Text.characters = "9";
    w2_6Text.name = "w2_6calText";
    w2_6Text.fontSize = 21;
    w2_6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w3_6Text = figma.createText();
    w3_6Text.fontName = { family: "Poppins", style: "Regular" };
    w3_6Text.characters = "16";
    w3_6Text.name = "w3_6calText";
    w3_6Text.fontSize = 21;
    w3_6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w4_6Text = figma.createText();
    w4_6Text.fontName = { family: "Poppins", style: "Regular" };
    w4_6Text.characters = "23";
    w4_6Text.name = "w4_6calText";
    w4_6Text.fontSize = 21;
    w4_6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const w5_6Text = figma.createText();
    w5_6Text.fontName = { family: "Poppins", style: "Regular" };
    w5_6Text.characters = "30";
    w5_6Text.name = "w5_6caltext";
    w5_6Text.fontSize = 21;
    w5_6Text.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    saturdayFrame.layoutMode = 'VERTICAL';
    saturdayFrame.counterAxisAlignItems = 'CENTER';
    saturdayFrame.itemSpacing = 10;

    saturdayFrame.appendChild(saturdayText);
    saturdayFrame.appendChild(w1_6Text);
    saturdayFrame.appendChild(w2_6Text);
    saturdayFrame.appendChild(w3_6Text);
    saturdayFrame.appendChild(w4_6Text);
    saturdayFrame.appendChild(w5_6Text);

    bottomFrame.layoutMode = 'HORIZONTAL';
    bottomFrame.counterAxisAlignItems = 'MIN';
    bottomFrame.itemSpacing = 15;

    bottomFrame.appendChild(sundayFrame);
    bottomFrame.appendChild(mondayFrame);
    bottomFrame.appendChild(tuesdayFrame);
    bottomFrame.appendChild(wednesdayFrame);
    bottomFrame.appendChild(thursdayFrame);
    bottomFrame.appendChild(fridayFrame);
    bottomFrame.appendChild(saturdayFrame);

    calendarFrame.layoutMode = 'VERTICAL';
    calendarFrame.counterAxisAlignItems = 'CENTER';

    calendarFrame.appendChild(topFrame);
    calendarFrame.appendChild(bottomFrame);

    topFrame.layoutSizingHorizontal = "FILL";

    const rectangleUpcoming = figma.createRectangle();
    rectangleUpcoming.x = calendarFrame.x;
    rectangleUpcoming.y = calendarFrame.y + calendarFrame.height + 40;
    rectangleUpcoming.name = "html_calupcoming";
    rectangleUpcoming.resize(calendarFrame.width, 130);
    rectangleUpcoming.fills = [{ type: 'SOLID', color: { r: Number(waitingColor?.r), g: Number(waitingColor?.g), b: Number(waitingColor?.b) } }];
    rectangleUpcoming.cornerRadius = 10;

    const textVacation = figma.createText();
    textVacation.fontName = { family: "Poppins", style: "Regular" };
    textVacation.characters = "Vacation";
    textVacation.name = "lbl_calvacationtext";
    textVacation.x = rectangleUpcoming.x + 20;
    textVacation.y = rectangleUpcoming.y + 20;
    textVacation.fontSize = 25;
    textVacation.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const textDate = figma.createText();
    textDate.fontName = { family: "Poppins", style: "Regular" };
    textDate.characters = "28.12.2023 - 29.12.2023";
    textDate.name = "lbl_caldate";
    textDate.x = textVacation.x;
    textDate.y = textVacation.y + textVacation.height * 2 - 10;
    textDate.fontSize = 25;
    textDate.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b)  } }];

    const buttonFrame = figma.createFrame();
    buttonFrame.name = "btn_caladd";
    buttonFrame.cornerRadius = 10;
    buttonFrame.resize(190,60);
    buttonFrame.x = rectangleUpcoming.x + rectangleUpcoming.width - 190;
    buttonFrame.y = rectangleUpcoming.y + rectangleUpcoming.height*3 - 42;
    buttonFrame.fills = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];
    
    const text = figma.createText();
    text.textAlignHorizontal = "CENTER";
    text.textAlignVertical = "CENTER";
    text.characters = "Add Absence";
    text.fontSize = 25;
    text.resize(190,60);
    text.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    
    buttonFrame.layoutMode = 'HORIZONTAL';
    buttonFrame.counterAxisAlignItems = 'CENTER';

    buttonFrame.appendChild(text);

    const rectangleMenu = figma.createRectangle();
    rectangleMenu.x = 0;
    rectangleMenu.y = 1036;
    rectangleMenu.name = "rect_calmenu";
    rectangleMenu.resize(640, 100);
    rectangleMenu.fills = [{ type: 'SOLID', color: { r: Number(menucolor?.r), g: Number(menucolor?.g), b: Number(menucolor?.b) } }];
    rectangleMenu.cornerRadius = 10;

    const rectangleSel = figma.createRectangle();
    rectangleSel.x = rectangleMenu.x + 205;
    rectangleSel.y = rectangleMenu.y + rectangleMenu.height - 15;
    rectangleSel.name = "html_calsel";
    rectangleSel.resize(60, 10);
    rectangleSel.fills = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];
    rectangleSel.cornerRadius = 10;

    frame.appendChild(title);
    frame.appendChild(dscr);
    frame.appendChild(calendarFrame);

    frame.appendChild(rectangleUpcoming);
    frame.appendChild(textVacation);
    frame.appendChild(textDate);
    frame.appendChild(buttonFrame);

    showIcon("calright","Right",rectangleUpcoming.x + rectangleUpcoming.width - 60,rectangleUpcoming.y + rectangleUpcoming.height/2 - 20,45,45,hexToRGBA("#FFFFFF",1),frame,true);

    frame.appendChild(rectangleMenu);
    frame.appendChild(rectangleSel);

    showIcon("calhome","Home",rectangleMenu.x + 50,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("calcalendar","CalendarBlank",rectangleMenu.x + 210,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("calsearch","Search",rectangleMenu.x + 380,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("calhistory","History",rectangleMenu.x + 550,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);

}

function createSearch(background: {r: number,g:number,b:number} | null,textColor: {r: number,g:number,b:number}| null,mainColor: {r: number,g:number,b:number}| null,menucolor: {r: number,g:number,b:number}| null) {
    var lastX = findLastX();
    var lastY = 0;

    const searchColor = hexToRgb("#929DAF");
    const boxApprovedColor = hexToRgb("#7FD1AE");
    const waitingColor = hexToRgb("#FFAB5E");

    const frame = figma.createFrame();
    frame.x = Number(lastX);
    frame.y = Number(lastY);
    frame.name = "Search";
    frame.resize(640, 1136);
    frame.cornerRadius = 10;
    frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const title = figma.createText();
    title.fontName = { family: "Poppins", style: "Bold" };
    title.characters = "John Doe";
    title.name = "lbl_srchtitle";
    title.x = 50;
    title.y = 40;
    title.fontSize = 25;
    title.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const dscr = figma.createText();
    dscr.fontName = { family: "Poppins", style: "Regular" };
    dscr.characters = "project manager";
    dscr.name = "lbl_srchdscr";
    dscr.x = title.x;
    dscr.y = title.y + title.height + 10;
    dscr.fontSize = 20;
    dscr.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const searchRect = figma.createRectangle();
    searchRect.name = "html_srchsearch";
    searchRect.cornerRadius = 10;
    searchRect.resize(frame.width - 100,100);
    searchRect.x = dscr.x;
    searchRect.y = dscr.y + dscr.height + 30;
    searchRect.fills = [{ type: 'SOLID', color: { r: Number(searchColor?.r), g: Number(searchColor?.g), b: Number(searchColor?.b) } }];
    
    const search = figma.createText();
    search.fontName = { family: "Poppins", style: "Regular" };
    search.characters = "search team member";
    search.name = "txt_srchsearchteam";
    search.x = searchRect.x + 100;
    search.y = searchRect.y + 36;
    search.fontSize = 21;
    search.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const rectangleUpcoming = figma.createRectangle();
    rectangleUpcoming.x = searchRect.x;
    rectangleUpcoming.y = searchRect.y + searchRect.height + 40;
    rectangleUpcoming.name = "html_srchapproved";
    rectangleUpcoming.resize(searchRect.width, 130);
    rectangleUpcoming.fills = [{ type: 'SOLID', color: { r: Number(boxApprovedColor?.r), g: Number(boxApprovedColor?.g), b: Number(boxApprovedColor?.b) } }];
    rectangleUpcoming.cornerRadius = 10;

    const textVacation = figma.createText();
    textVacation.fontName = { family: "Poppins", style: "Regular" };
    textVacation.characters = "Mark Hamilton";
    textVacation.name = "lbl_srchvacation";
    textVacation.x = rectangleUpcoming.x + 20;
    textVacation.y = rectangleUpcoming.y + 20;
    textVacation.fontSize = 25;
    textVacation.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const textDate = figma.createText();
    textDate.fontName = { family: "Poppins", style: "Regular" };
    textDate.characters = "20.12.2023 - 31.12.2023";
    textDate.name = "lbl_srchdate";
    textDate.x = textVacation.x;
    textDate.y = textVacation.y + textVacation.height * 2 - 10;
    textDate.fontSize = 25;
    textDate.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b)  } }];

    const rectangleUpcoming2 = figma.createRectangle();
    rectangleUpcoming2.x = rectangleUpcoming.x;
    rectangleUpcoming2.y = rectangleUpcoming.y + rectangleUpcoming.height + 40;
    rectangleUpcoming2.name = "html_srchwaiting";
    rectangleUpcoming2.resize(rectangleUpcoming.width, 130);
    rectangleUpcoming2.fills = [{ type: 'SOLID', color: { r: Number(waitingColor?.r), g: Number(waitingColor?.g), b: Number(waitingColor?.b) } }];
    rectangleUpcoming2.cornerRadius = 10;

    const textVacation2 = figma.createText();
    textVacation2.fontName = { family: "Poppins", style: "Regular" };
    textVacation2.characters = "Andrea Halls";
    textVacation2.name = "lbl_srchwaitingname";
    textVacation2.x = rectangleUpcoming2.x + 20;
    textVacation2.y = rectangleUpcoming2.y + 20;
    textVacation2.fontSize = 25;
    textVacation2.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const textDate2 = figma.createText();
    textDate2.fontName = { family: "Poppins", style: "Regular" };
    textDate2.characters = "27.12.2023 - 30.12.2023";
    textDate2.name = "lbl_srchdate2";
    textDate2.x = textVacation2.x;
    textDate2.y = textVacation2.y + textVacation2.height * 2 - 10;
    textDate2.fontSize = 25;
    textDate2.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b)  } }];

    const rectangleMenu = figma.createRectangle();
    rectangleMenu.x = 0;
    rectangleMenu.y = 1036;
    rectangleMenu.name = "rect_srchmenu";
    rectangleMenu.resize(640, 100);
    rectangleMenu.fills = [{ type: 'SOLID', color: { r: Number(menucolor?.r), g: Number(menucolor?.g), b: Number(menucolor?.b) } }];
    rectangleMenu.cornerRadius = 10;

    const rectangleSel = figma.createRectangle();
    rectangleSel.x = rectangleMenu.x + 378;
    rectangleSel.y = rectangleMenu.y + rectangleMenu.height - 15;
    rectangleSel.name = "html_srchsel";
    rectangleSel.resize(60, 10);
    rectangleSel.fills = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];
    rectangleSel.cornerRadius = 10;

    frame.appendChild(title);
    frame.appendChild(dscr);
    frame.appendChild(searchRect);
    frame.appendChild(search);
    
    showIcon("srchrectsearch","Search",searchRect.x + 30,searchRect.y + 30,45,45,hexToRGBA("#FFFFFF",1),frame,true);
    
    frame.appendChild(rectangleUpcoming);
    frame.appendChild(textVacation);
    frame.appendChild(textDate);

    showIcon("srchupcright","Right",rectangleUpcoming.x + rectangleUpcoming.width - 60,rectangleUpcoming.y + rectangleUpcoming.height/2 - 20,45,45,hexToRGBA("#FFFFFF",1),frame,true);
    
    frame.appendChild(rectangleUpcoming2);
    frame.appendChild(textVacation2);
    frame.appendChild(textDate2);

    showIcon("srchupcright2","Right",rectangleUpcoming2.x + rectangleUpcoming2.width - 60,rectangleUpcoming2.y + rectangleUpcoming2.height/2 - 20,45,45,hexToRGBA("#FFFFFF",1),frame,true);

    frame.appendChild(rectangleMenu);
    frame.appendChild(rectangleSel);

    showIcon("srchhome","Home",rectangleMenu.x + 50,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("srchcalendar","CalendarBlank",rectangleMenu.x + 210,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("srchsearch2","Search",rectangleMenu.x + 380,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("srchhistory","History",rectangleMenu.x + 550,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
}

function createHistory(background: {r: number,g:number,b:number} | null,textColor: {r: number,g:number,b:number}| null,mainColor: {r: number,g:number,b:number}| null,menucolor: {r: number,g:number,b:number}| null) {
    var lastX = findLastX();
    var lastY = 0;

    const boxApprovedColor = hexToRgb("#7FD1AE");
    const waitingColor = hexToRgb("#FFAB5E");
    const disabledColor = hexToRgb("#BABABA");

    const frame = figma.createFrame();
    frame.x = Number(lastX);
    frame.y = Number(lastY);
    frame.name = "History";
    frame.resize(640, 1136);
    frame.cornerRadius = 10;
    frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const title = figma.createText();
    title.fontName = { family: "Poppins", style: "Bold" };
    title.characters = "John Doe";
    title.name = "lbl_histitle";
    title.x = 50;
    title.y = 40;
    title.fontSize = 25;
    title.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const dscr = figma.createText();
    dscr.fontName = { family: "Poppins", style: "Regular" };
    dscr.characters = "project manager";
    dscr.name = "lbl_hisdscr";
    dscr.x = title.x;
    dscr.y = title.y + title.height + 10;
    dscr.fontSize = 20;
    dscr.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];
    
    const allFrame = figma.createFrame();
    allFrame.name = "btn_hisall";
    allFrame.cornerRadius = 10;
    allFrame.x = dscr.x;
    allFrame.y = dscr.y + dscr.height + 30;
    allFrame.resize(120,80);
    allFrame.fills = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];
    
    const textAll = figma.createText();
    textAll.fontName = { family: "Poppins", style: "Regular" };
    textAll.characters = "All";
    textAll.fontSize = 20;
    textAll.resize(allFrame.width,allFrame.height);
    textAll.textAlignHorizontal = "CENTER";
    textAll.textAlignVertical = "CENTER";
    textAll.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    
    allFrame.layoutMode = 'HORIZONTAL';
    allFrame.counterAxisAlignItems = 'CENTER';
    allFrame.appendChild(textAll);

    const thisMonthFrame = figma.createFrame();
    thisMonthFrame.name = "btn_histhismonth";
    thisMonthFrame.cornerRadius = 10;
    thisMonthFrame.x = allFrame.x + allFrame.width + 20;
    thisMonthFrame.y = dscr.y + dscr.height + 30;
    thisMonthFrame.resize(190,80);
    thisMonthFrame.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];
    
    const textThisMonth = figma.createText();
    textThisMonth.fontName = { family: "Poppins", style: "Regular" };
    textThisMonth.characters = "This Month";
    textThisMonth.fontSize = 20;
    textThisMonth.resize(thisMonthFrame.width,thisMonthFrame.height);
    textThisMonth.textAlignHorizontal = "CENTER";
    textThisMonth.textAlignVertical = "CENTER";
    textThisMonth.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    
    thisMonthFrame.layoutMode = 'HORIZONTAL';
    thisMonthFrame.counterAxisAlignItems = 'CENTER';
    thisMonthFrame.appendChild(textThisMonth);

    const lastMonthFrame = figma.createFrame();
    lastMonthFrame.name = "btn_hislastmonth";
    lastMonthFrame.cornerRadius = 10;
    lastMonthFrame.x = thisMonthFrame.x + thisMonthFrame.width + 20;
    lastMonthFrame.y = dscr.y + dscr.height + 30;
    lastMonthFrame.resize(190,80);
    lastMonthFrame.fills = [{ type: 'SOLID', color: { r: Number(disabledColor?.r), g: Number(disabledColor?.g), b: Number(disabledColor?.b) } }];
    
    const textLastMonth = figma.createText();
    textLastMonth.fontName = { family: "Poppins", style: "Regular" };
    textLastMonth.characters = "Last Month";
    textLastMonth.fontSize = 20;
    textLastMonth.resize(lastMonthFrame.width,lastMonthFrame.height);
    textLastMonth.textAlignHorizontal = "CENTER";
    textLastMonth.textAlignVertical = "CENTER";
    textLastMonth.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    
    lastMonthFrame.layoutMode = 'HORIZONTAL';
    lastMonthFrame.counterAxisAlignItems = 'CENTER';
    lastMonthFrame.appendChild(textLastMonth);

    const rectangleUpcoming = figma.createRectangle();
    rectangleUpcoming.x = allFrame.x;
    rectangleUpcoming.y = allFrame.y + allFrame.height + 40;
    rectangleUpcoming.name = "html_hisapproved";
    rectangleUpcoming.resize(frame.width - 100, 130);
    rectangleUpcoming.fills = [{ type: 'SOLID', color: { r: Number(boxApprovedColor?.r), g: Number(boxApprovedColor?.g), b: Number(boxApprovedColor?.b) } }];
    rectangleUpcoming.cornerRadius = 10;

    const textVacation = figma.createText();
    textVacation.fontName = { family: "Poppins", style: "Regular" };
    textVacation.characters = "Mark Hamilton";
    textVacation.name = "lbl_hisvacation";
    textVacation.x = rectangleUpcoming.x + 20;
    textVacation.y = rectangleUpcoming.y + 20;
    textVacation.fontSize = 25;
    textVacation.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const textDate = figma.createText();
    textDate.fontName = { family: "Poppins", style: "Regular" };
    textDate.characters = "20.12.2023 - 31.12.2023";
    textDate.name = "lbl_hisdate";
    textDate.x = textVacation.x;
    textDate.y = textVacation.y + textVacation.height * 2 - 10;
    textDate.fontSize = 25;
    textDate.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b)  } }];

    const rectangleUpcoming2 = figma.createRectangle();
    rectangleUpcoming2.x = rectangleUpcoming.x;
    rectangleUpcoming2.y = rectangleUpcoming.y + rectangleUpcoming.height + 40;
    rectangleUpcoming2.name = "html_hiswaiting";
    rectangleUpcoming2.resize(rectangleUpcoming.width, 130);
    rectangleUpcoming2.fills = [{ type: 'SOLID', color: { r: Number(waitingColor?.r), g: Number(waitingColor?.g), b: Number(waitingColor?.b) } }];
    rectangleUpcoming2.cornerRadius = 10;

    const textVacation2 = figma.createText();
    textVacation2.fontName = { family: "Poppins", style: "Regular" };
    textVacation2.characters = "Andrea Halls";
    textVacation2.name = "lbl_hiswaitingname";
    textVacation2.x = rectangleUpcoming2.x + 20;
    textVacation2.y = rectangleUpcoming2.y + 20;
    textVacation2.fontSize = 25;
    textVacation2.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];

    const textDate2 = figma.createText();
    textDate2.fontName = { family: "Poppins", style: "Regular" };
    textDate2.characters = "27.12.2023 - 30.12.2023";
    textDate2.name = "lbl_hisdate2";
    textDate2.x = textVacation2.x;
    textDate2.y = textVacation2.y + textVacation2.height * 2 - 10;
    textDate2.fontSize = 25;
    textDate2.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b)  } }];

    const rectangleMenu = figma.createRectangle();
    rectangleMenu.x = 0;
    rectangleMenu.y = 1036;
    rectangleMenu.name = "rect_hismenu";
    rectangleMenu.resize(640, 100);
    rectangleMenu.fills = [{ type: 'SOLID', color: { r: Number(menucolor?.r), g: Number(menucolor?.g), b: Number(menucolor?.b) } }];
    rectangleMenu.cornerRadius = 10;

    const rectangleSel = figma.createRectangle();
    rectangleSel.x = rectangleMenu.x + 545;
    rectangleSel.y = rectangleMenu.y + rectangleMenu.height - 15;
    rectangleSel.name = "html_hissel";
    rectangleSel.resize(60, 10);
    rectangleSel.fills = [{ type: 'SOLID', color: { r: Number(mainColor?.r), g: Number(mainColor?.g), b: Number(mainColor?.b) } }];
    rectangleSel.cornerRadius = 10;

    frame.appendChild(title);
    frame.appendChild(dscr);
    frame.appendChild(allFrame);
    frame.appendChild(thisMonthFrame);
    frame.appendChild(lastMonthFrame);
    
    frame.appendChild(rectangleUpcoming);
    frame.appendChild(textVacation);
    frame.appendChild(textDate);

    showIcon("hisupcright","Right",rectangleUpcoming.x + rectangleUpcoming.width - 60,rectangleUpcoming.y + rectangleUpcoming.height/2 - 20,45,45,hexToRGBA("#FFFFFF",1),frame,true);
    
    frame.appendChild(rectangleUpcoming2);
    frame.appendChild(textVacation2);
    frame.appendChild(textDate2);

    showIcon("hisupcright2","Right",rectangleUpcoming2.x + rectangleUpcoming2.width - 60,rectangleUpcoming2.y + rectangleUpcoming2.height/2 - 20,45,45,hexToRGBA("#FFFFFF",1),frame,true);

    frame.appendChild(rectangleMenu);
    frame.appendChild(rectangleSel);

    showIcon("hishome","Home",rectangleMenu.x + 50,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("hiscalendar","CalendarBlank",rectangleMenu.x + 210,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("hissearch","Search",rectangleMenu.x + 380,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
    showIcon("hishistory","History",rectangleMenu.x + 550,rectangleMenu.y + rectangleMenu.height/3 - 5,50,50,hexToRGBA("#FFFFFF",1),frame,true);
}

