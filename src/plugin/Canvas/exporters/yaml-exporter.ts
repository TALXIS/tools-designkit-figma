import yaml from 'js-yaml';
import { hexToRGBA, rgbToHex, rgbToShortHex } from '../../../util/colorUtil';
import { findNodeByNameAndParentID } from '../../../util/utils';

export async function parseSelectedFrames() {
    var output = [];
    var names = [];
    for (let g = 0; g < figma.currentPage.selection.length; g++) {
        const selectedNode = figma.currentPage.selection[g];
        var data = [];

        data.push(selectedNode.name.concat(' As screen:'));

        addFillProperty(data,selectedNode);
        data.push(' ');

        var children = (figma.currentPage.findChild(n => n.id === selectedNode.id) as FrameNode).children;
        for (let k = 0; k < children.length; k++) {
            const element = children[k];

            await fillElementToData("","  ",data,element,k,0);
        }
        var jsonText = data.join("\n");
        var json = JSON.stringify(jsonText);
        json = json.replace(/\n/g, "\\n");
        
        var yamlOutput = yaml.dump(JSON.parse(json),{indent: 1,flowLevel: 1});
        output.push(yamlOutput.replace('|-','').replace('\n','').trimStart());
        names.push(selectedNode.name);
    }
    yamlSave(output,names);
}

function addFillProperty(data: string[], selectedNode: SceneNode) {
    const fills = (selectedNode as FrameNode).fills as ReadonlyArray<Paint>;
    setColorProperty("",fills, data,"Fill");
}

async function yamlSave(json: string[],names: string[]) {
    figma.ui.postMessage({ pluginMessage: { yaml: json, type: "yaml", names: names } });    
}

async function fillElementToData(fieldSpace:string,childSpace:string,data: string[],element: SceneNode,index: number,extraYValue: number) {
    if(!element.name.includes("_")) return;

    const splitName = element.name.split('_');
    const elType = splitName[0];
    const name = element.name.substring(element.name.indexOf("_")+1);

    const fills = (element as RectangleNode).fills as ReadonlyArray<Paint>;
    const strokes = (element as RectangleNode).strokes as ReadonlyArray<Paint>;
 
    switch(elType) {
        case "rect":
        case "rectangle": {
            data.push(fieldSpace.concat(name.concat(' As rectangle:')));
            
            setColorProperty(childSpace,fills, data,"Fill");
            setColorProperty(childSpace,strokes, data,"BorderColor");
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "txt":
        case "text": {
            data.push(fieldSpace.concat(name.concat(' As text:')));
            
            setColorProperty(childSpace,fills, data,"Color");
            setColorProperty(childSpace,strokes, data,"BorderColor");

            addTextProperty(data,childSpace,element as FrameNode,"Default");
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "lbl":
        case "label": {
            data.push(fieldSpace.concat(name.concat(' As label:')));
            var textNode = (element as TextNode);
            data.push(childSpace+"Text: =".concat('"',textNode.characters,'"'));
            
            setColorProperty(childSpace,fills, data,"Color");

            const align = textNode.textAlignHorizontal;
            const alignR = align.toLowerCase().charAt(0).toUpperCase() + align.toLowerCase().slice(1);
            
            const font = textNode.fontName as FontName;
            const size = Number(textNode.fontSize) - 4;
            const newWidth = (element.width * 150/100) - element.width;
            
            data.push(childSpace+'Font: ='.concat('"',font.family,'"'));
            data.push(childSpace+'Size: ='.concat(size.toString()));
            data.push(childSpace+'Align: =Align.'.concat(alignR));
            fillDataProperties(childSpace,data,element,index,Math.round(newWidth),5,extraYValue);
            break;
        }
        case "btn":
        case "button": {
            data.push(fieldSpace.concat(name.concat(' As button:')));
            const children = (element as FrameNode).children;
            const newWidth = (element.width * 110/100) - element.width;
            if(children != undefined) {
                const textNode = (children[0] as TextNode);
                const colorNode = textNode.fills as ReadonlyArray<Paint>;
                const size = Number(textNode.fontSize) - 3;
                data.push(childSpace +"Text: =".concat('"',textNode.characters,'"'));
                data.push(childSpace + 'Size: ='.concat(size.toString()));
                setColorProperty(childSpace,colorNode, data,"Color");
            }
            setColorProperty(childSpace,fills, data,"Fill");
            setColorProperty(childSpace,strokes, data,"BorderColor");
            fillDataProperties(childSpace,data,element,index,Math.round(newWidth),0,extraYValue);
            break;
        }
        case "img": {            
            data.push(fieldSpace.concat(name.concat(' As image:')));
            
            const linkNode = findNodeByNameAndParentID("img_link",element.id);
            if(linkNode != undefined) {
                const link = (linkNode as TextNode).characters;
                data.push(childSpace+'Image: |- \n   ="'+link+'"');
                data.push(childSpace+'ImagePosition: =ImagePosition.Fit');
            }
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "svg": {
            data.push(fieldSpace.concat(name.concat(' As image:')));
            const svg = await element.exportAsync({ format: 'SVG_STRING' });
            const singleQuote = svg.replace(/"/g, '\'');
            const finalSVG = singleQuote.replace(/\n/g, " ").trim();
            data.push(childSpace+'Image: |- \n '+childSpace+'="data:image/svg+xml;utf8, " &EncodeUrl("'+finalSVG+'")');
            data.push(childSpace+'ImagePosition: =ImagePosition.Fit');
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "html": {
            data.push(fieldSpace.concat(name.concat(' As htmlViewer:')));
            const radius = (element as RectangleNode).cornerRadius;
            var hex = "";
            var backText = "background-color";
            
            if(fills[0].type === "SOLID") {
                hex = rgbToHex(Math.round(fills[0].color.r*255),Math.round(fills[0].color.g*255),Math.round(fills[0].color.b*255));
            }
            if(fills[0].type === "GRADIENT_LINEAR") {
                backText = "background";
                hex = getBackgroundFromGradient(fills[0].gradientStops); 
            }
            const backcolor = hex == "" ? "#ffffff" : hex;
            data.push(childSpace+'HtmlText: |- \n '+childSpace+'=" <div style=' + "'border-radius:"+radius.toString()+"px;"+backText+":"+ backcolor +";width:"+ String(Math.round(element.width)) +"px;height:"+String(Math.round(element.height))+"px;'></div>" + '"');
            fillDataProperties(childSpace,data,element,index,25,15,extraYValue);
            break;
        }
        case "cal":
        case "calendar": {
            await addCalendar(fieldSpace,childSpace,data, name, element as FrameNode,index);
            break;
        }
        case "circle": {
            data.push(fieldSpace.concat(name.concat(' As circle:')));

            setColorProperty(childSpace,fills, data,"Fill");
            setColorProperty(childSpace,strokes, data,"BorderColor");
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "tr":
        case "triangle": {
            data.push(fieldSpace.concat(name.concat(' As triangle:')));

            setColorProperty(childSpace,fills, data,"Fill");
            setColorProperty(childSpace,strokes, data,"BorderColor");
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "star": {
            const starNode = element as StarNode;
            const starType = starNode.pointCount == 5 ? fieldSpace.concat(name.concat(' As star:')) : fieldSpace.concat(name.concat(' As star.star'+starNode.pointCount+':'))
            data.push(starType);

            setColorProperty(childSpace,fills, data,"Fill");
            setColorProperty(childSpace,strokes, data,"BorderColor");
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "oc":
        case "octagon": {
            data.push(fieldSpace.concat(name.concat(' As octagon:')));

            setColorProperty(childSpace,fills, data,"Fill");
            setColorProperty(childSpace,strokes, data,"BorderColor");
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "pe":
        case "pentagon": {
            data.push(fieldSpace.concat(name.concat(' As pentagon:')));

            setColorProperty(childSpace,fills, data,"Fill");
            setColorProperty(childSpace,strokes, data,"BorderColor");
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "combo":
        case "combobox": {
            data.push(fieldSpace.concat(name.concat(' As combobox:')));
            data.push(childSpace + 'Items: =ComboBoxSample');

            setColorProperty(childSpace,strokes, data,"BorderColor");
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "list": {
            data.push(fieldSpace.concat(name.concat(' As listbox:')));
            data.push(childSpace + 'Items: =ListboxSample');
            
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "radio": {
            data.push(fieldSpace.concat(name.concat(' As radio:')));
            setColorProperty(childSpace,strokes, data,"BorderColor");
            addItemsProperty(data,childSpace,element as FrameNode);
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "toggle": {
            data.push(fieldSpace.concat(name.concat(' As toggleSwitch:')));
            data.push(childSpace + 'FalseText: ="No"');
            data.push(childSpace + 'TrueText: ="Yes"');

            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "check":
        case "checkbox": {
            data.push(fieldSpace.concat(name.concat(' As checkbox:')));

            addTextProperty(data,childSpace,element as FrameNode,"Text");
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "dropdwn":
        case "dropdown": {
            data.push(fieldSpace.concat(name.concat(' As dropdown:')));
            data.push(childSpace + 'Items: =DropDownSample');

            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "datepickr":
        case "datepicker": {
            data.push(fieldSpace.concat(name.concat(' As datepicker:')));
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "richtxt":
        case "richtext":  {
            data.push(fieldSpace.concat(name.concat(' As richTextEditor:')));
            data.push(childSpace+'Default: ="Enter some <strong>rich text</strong> here."');
        
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "slider": {
            data.push(fieldSpace.concat(name.concat(' As slider:')));
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "timer": {
            data.push(fieldSpace.concat(name.concat(' As timer:')));
            setColorProperty(childSpace,strokes, data,"BorderColor");
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);
            break;
        }
        case "gallery": {
            await addGallery(fieldSpace,childSpace,data, name, element as FrameNode,index);
            break;
        }
        case "form":
        case "formViewer": {
            data.push(fieldSpace.concat(name.concat(' As formViewer:')));
            data.push(childSpace+ 'Fill: =RGBA(0, 0, 0, 0)');
            fillDataProperties(childSpace,data,element,index,0,0,extraYValue);

            await addFormChildren(childSpace,data, element as FrameNode);
            break;
        }
        default: {
            break;
        }
    }
    
}

async function addCalendar(fieldSpace:string,childSpace:string,data: string[], name: string, element: FrameNode, index: number) {
    data.push(fieldSpace.concat(name.concat(' As htmlViewer:')));
    
    const radius = element.cornerRadius;
    const fill = element.fills as ReadonlyArray<Paint>;
    var hex = "";
    if (fill[0].type === "SOLID") {
        var hex = rgbToHex(Math.round(fill[0].color.r * 255), Math.round(fill[0].color.g * 255), Math.round(fill[0].color.b * 255));
    }
    const backcolor = hex == "" ? "#ffffff" : hex;
    
    data.push(childSpace + 'HtmlText: |- \n   =" <div style=' + "'border-radius:" + radius.toString() + "px;background-color:" + backcolor + ";width:" + String(Math.round(element.width)) + "px;height:" + String(Math.round(element.height+10)) + "px;'></div>" + '"');
    fillDataProperties("  ",data, element, index, 25, 25,0);

    const topNode = findNodeByNameAndParentID("top",element.id);

    if(topNode != undefined) {
        const topNodes = (topNode as FrameNode).children;
        
        for (let i = 0; i < topNodes.length; i++) {
            const el = topNodes[i];
            await fillElementToData("","  ",data,el,index,element.y);
        }
    }
    
    const bottomNode = findNodeByNameAndParentID("bottom",element.id);
    if(bottomNode != undefined) {
        data.push(fieldSpace.concat('WeekGallery As gallery.WeekGallery:'));
        data.push(childSpace + 'Items: =["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]');
        data.push(childSpace + 'ShowScrollbar: =false');
        data.push(childSpace + 'TemplatePadding: =0');
        data.push(childSpace + 'TemplateSize: =76');
        data.push(childSpace + "Height: =45");
        data.push(childSpace + "Width: =".concat(String(Math.round(element.width))));
        data.push(childSpace + "X: =".concat(String(Math.round(element.x))));
        data.push(childSpace + "Y: =".concat(String(Math.round(bottomNode.y) + element.y)));
        data.push(childSpace + "ZIndex: =".concat(String(index+1)));
        data.push(' ');
        
        data.push(childSpace + 'Title_gallery_lbl As label:');
        data.push(childSpace + '  Align: =Align.Center');
        data.push(childSpace + '  Height: =WeekGallery.TemplateHeight');
        data.push(childSpace + '  Wrap: =false');
        data.push(childSpace + '  X: =WeekGallery.TemplateWidth / 2 - Self.Width / 2')
        data.push(childSpace + '  Y: =WeekGallery.TemplateHeight / 2 - Self.Height / 2')
        data.push(childSpace + '  OnSelect: =Select(Parent)');
        data.push(childSpace + '  Text: =ThisItem.Value');
        data.push(childSpace + '  ZIndex: =1');
        data.push(' ');
        
        data.push(fieldSpace.concat('MonthGallery As gallery.MonthGallery:'));
        data.push(childSpace + 'Items: =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19, 20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,]');
        data.push(childSpace + 'ShowScrollbar: =false');
        data.push(childSpace + 'TemplatePadding: =0');
        data.push(childSpace + 'TemplateSize: =55');
        data.push(childSpace + 'WrapCount: =7');
        data.push(childSpace + 'Layout: =Layout.Vertical');
        data.push(childSpace + "Height: =345");
        data.push(childSpace + "Width: =".concat(String(Math.round(element.width))));
        data.push(childSpace + "X: =".concat(String(Math.round(element.x))));
        data.push(childSpace + "Y: =".concat(String(Math.round(bottomNode.y) + element.y + 50)));
        data.push(childSpace + "ZIndex: =".concat(String(index+1)));
        data.push(' ');
        
        data.push(childSpace + 'Title_month_lbl As label:');
        data.push(childSpace + '  Align: =Align.Center');
        data.push(childSpace + '  Wrap: =false');
        data.push(childSpace + '  BorderColor: =RGBA(0, 0, 0, 0)');
        data.push(childSpace + '  Color: =RGBA(28, 39, 76, 1)');
        data.push(childSpace + '  Height: =MonthGallery.TemplateHeight');
        data.push(childSpace + '  Width: =MonthGallery.TemplateWidth');
        data.push(childSpace + '  Text: =Day(DateAdd(DateAdd( DateAdd( Today(), 1 - Day( Today() ), TimeUnit.Days ), -( Weekday( DateAdd( Today(), 1 - Day( Today() ), TimeUnit.Days )) - 2 + 1 ), TimeUnit.Days ),ThisItem.Value,TimeUnit.Days))');
        data.push(childSpace + '  Size: =17 * MonthGallery.TemplateWidth / 91');
        data.push(childSpace + "  ZIndex: =1");
        data.push(' ');
    }
}

function setColorProperty(childSpace:string,fills: readonly Paint[], data: string[],propName: string) {
    if (fills != undefined && fills.length >0 && fills[0].type === "SOLID") {
        var hex = rgbToHex(Math.round(fills[0].color.r * 255), Math.round(fills[0].color.g * 255), Math.round(fills[0].color.b * 255));
        var rgba = hexToRGBA(hex, 1);
        data.push(childSpace+propName+": =".concat(rgba));
    }
}

function fillDataProperties(childSpace:string,data: any[], element: SceneNode, index: number,increaseWidth: number,increaseHeight: number,extraYValue: number) {
    const xValue = Math.round(element.width + increaseWidth) > 640 ? 640 : Math.round(element.width + increaseWidth);
    data.push(childSpace + "Height: =".concat(String(Math.round(element.height) + increaseHeight)));
    data.push(childSpace +"Width: =".concat(String(xValue)));
    data.push(childSpace +"X: =".concat(String(Math.round(element.x))));
    data.push(childSpace +"Y: =".concat(String(Math.round(element.y) + extraYValue)));
    data.push(childSpace +"ZIndex: =".concat(String(index+1)));
    data.push(childSpace +"Visible: =".concat(String(element.visible)));
    data.push(' ');
  }


async function addGallery(fieldSpace:string,childSpace:string,data: string[], name: string, parentFrame: FrameNode, index: number) {
    data.push(fieldSpace.concat(''+name+' As gallery.'+name+':'));
    data.push(childSpace+ 'TemplatePadding: =0');
    data.push(childSpace+ 'Layout: =Layout.Vertical');
    fillDataProperties(childSpace,data,parentFrame,index,0,0,0);

    const childrenNodes = parentFrame.children;

    if(childrenNodes != undefined) {
        for (let k = 0; k < childrenNodes.length; k++) {
            const element = childrenNodes[k];
            await fillElementToData(childSpace,childSpace + "  ",data,element,k,0);
        }
    }
}

async function addFormChildren(childSpace: string, data: string[], parentFrame: FrameNode) {
    const childrenNodes = parentFrame.children;

    data.push(childSpace + 'DataCard1 As typedDataCard.blankCard:');
    data.push(childSpace+ '  Fill: =RGBA(0, 0, 0, 0)');
    data.push(childSpace+ '  DisplayMode: =DisplayMode.Edit');
    data.push(childSpace+ '  X: =0');
    data.push(childSpace+ '  Y: =0');
    data.push(childSpace+ '  ZIndex: =1');
    data.push(' ');

    if(childrenNodes != undefined) {
        for (let k = 0; k < childrenNodes.length; k++) {
            const element = childrenNodes[k];
            await fillElementToData(childSpace + "  ",childSpace + "    ",data,element,k,0);
        }
    }
}
function addItemsProperty(data: string[], childSpace: string, parentFrame: FrameNode) {
    const childrenNodes = parentFrame.children;

    const items: string[] = [];

    if(childrenNodes != undefined) {
        for (let k = 0; k < childrenNodes.length; k++) {
            const element = childrenNodes[k];
            const name = element.name.substring(element.name.indexOf('_')+1);
            items.push('"' + name + '"');
        }
    }
    data.push(childSpace+ 'Items: =['+items.toString() + ']');
}

function addTextProperty(data: string[], childSpace: string, parentFrame: FrameNode,param: string) {
    const childrenNodes = parentFrame.children;

    if(childrenNodes != undefined) {
        for (let k = 0; k < childrenNodes.length; k++) {
            const element = childrenNodes[k];
            const textNode = (element as TextNode).characters;

            if(textNode != undefined) {
                console.info(element.name);
                data.push(childSpace + param+': ="' + (element as TextNode).characters + '"');
                return;
            }
        }
    }
}

function getBackgroundFromGradient(gradientStops: readonly ColorStop[]) {
    const colors: string[] = [];
    const grStops = gradientStops;

    grStops.forEach(stop => {
        const color = rgbToShortHex(Math.round(stop.color.r*255),Math.round(stop.color.g*255),Math.round(stop.color.b*255));
        colors.push(color);
    });

    return "linear-gradient(" + colors.toString() + ")";
}

