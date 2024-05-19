import { Screen } from "../model/Canvas/Screen";
import { ScreenSaver } from "../model/Canvas/ScreenSaver";
import { rgbToHex, rgbaToRgb } from "./colorUtil";
import { loadIcon } from "./svgUtil";

/**
 * Find a last X position of the created frame
 * @date 22/12/2023 - 08:04:50
 *
 * @export
 * @returns {number} - X position
 */
export function findLastX() {
  const children = figma.currentPage.children;
  var lastX = 0;
  children.forEach(element => {
    var actualPos = element.x + element.width + 80;
    if (actualPos > lastX) lastX = actualPos;
  });

  return lastX;
}

/**
 * Find a property value by the field and property name
 * @date 22/12/2023 - 08:05:54
 *
 * @param {Screen} screen - input screen with all fields and properties
 * @param {string} fieldName - name of the searched field
 * @param {string} propName - name of the searched property
 * @returns {string} - value of the searche property
 */
export function findPropertyValuebyName(screen: Screen, fieldName: string, propName: string): string {
  var propv = "";
  screen.fields.forEach(field => {
    if (fieldName.includes(field.name)) {
      field.properties.forEach(prop => {
        if (propName.includes(prop.key)) {
          propv = prop.value;
          return propv;
        }
      })
    }
  });
  if (screen.forms != undefined) {
    screen.forms.forEach(form => {
      form.fields.forEach(field => {
        if (fieldName.includes(field.name)) {
          field.properties.forEach(prop => {
            if (propName.includes(prop.key)) {
              propv = prop.value;
              return propv;
            }
          });
        }
      });
    });
  }
  return propv;
}

export function findPropertyValueFromScreens(saver: ScreenSaver, fieldName: string, propName: string): string {
  var propv = "";
  
  saver.screens.forEach(screen => {
    screen.fields.forEach(field => {
      if (fieldName.includes(field.name)) {
        field.properties.forEach(prop => {
          if (propName.includes(prop.key)) {
            propv = prop.value;
            return propv;
          }
        })
      }
    });
    if (screen.forms != undefined) {
      screen.forms.forEach(form => {
        form.fields.forEach(field => {
          if (fieldName.includes(field.name)) {
            field.properties.forEach(prop => {
              if (propName.includes(prop.key)) {
                propv = prop.value;
                return propv;
              }
            });
          }
        });
      });
    }
  });
  return propv;
}

/**
 * Get a value of the input equation
 * @date 22/12/2023 - 08:05:59
 *
 * @export
 * @param {Screen} screen - input screen with all fields and properties
 * @param {string} value - input equation (Title.x + Title.Height)
 * @returns {*} - value of the parsed field properties
 */
export function getValue(screen: Screen, value: string) {
  if (!value.includes('+') && !value.includes('-') && !value.includes('*') && !value.includes('/')) {
    var fieldName = value.split('.')[0];
    var propName = value.split('.')[1];
    const propV = findPropertyValuebyName(screen, fieldName, propName);
    return propV.replace("=", "");
  } else {
    if (value.includes('+')) {
      return parseValue(screen, "+", value);
    }
    if (value.includes('-')) {
      return parseValue(screen, "-", value);
    }
    if (value.includes('*')) {
      return parseValue(screen, "*", value);
    }
    if (value.includes('/')) {
      return parseValue(screen, "/", value);
    }
  }
  return "";
}

export function getMaxWidthHeight(screen: Screen) {
  let maxWidth = 0;
  let maxHeight = 0;
  screen.fields.forEach(field => {
    let x = 0;
    let y = 0;
    let w = 0;
    let h = 0;
    field.properties.forEach(prop => {
      if (prop.key.includes("X")) {
        const val = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        x = Number(val);
      }
      if (prop.key.includes("Y")) {
        const val = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        y = Number(val);
      }
      if (prop.key.includes("Width")) {
        const val = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        w = Number(val);
      }
      if (prop.key.includes("Height")) {
        const val = prop.value.includes("=") ? prop.value.split("=")[1].replace("'",""): prop.value;
        h = Number(val);
      }
    });
    const wVal = x+ w;
    const hVal = y+ h;
    if(maxWidth < wVal) {
      maxWidth = wVal;
    } 
    if(maxHeight < hVal) {
      maxHeight = hVal;
    }
  });
  return {w: maxWidth+50,h: maxHeight+50};
}
/**
 * Append a svg icon to the frame
 * @date 22/12/2023 - 08:06:04
 *
 * @export
 * @param {string} name - name of the icon
 * @param {number} posX - x position
 * @param {number} posY - y position
 * @param {number} width - width
 * @param {number} height - height
 * @param {string} rgba - RGBA code
 * @param {FrameNode} frame - input frame
 */
export function showIcon(frameName:string,name: string, posX: number, posY: number, width: number, height: number, rgba: string, frame: FrameNode,visibility: boolean) {
  const { r, g, b } = rgbaToRgb(rgba);
  const hex = rgbToHex(r * 255, g * 255, b * 255);
  const svg = loadIcon(name, hex);
  if (svg == "") return;

  var node = figma.createNodeFromSvg(svg);
  node.name = "svg_" + frameName;
  node.x = Number(posX);
  node.y = Number(posY);
  node.visible = visibility;
  if (width == 0 && height == 0) {
    node.resize(48, 48);
  } else node.resize(width, height);

  frame.appendChild(node);
}

/**
 * Parse input equation to the particular number value
 * @date 22/12/2023 - 08:06:19
 *
 * @param {Screen} screen - input screen with all fields and properties
 * @param {string} mark - mark in the equation
 * @param {string} value - input equation part
 * @returns {number} - calculated value
 */
function parseValue(screen: Screen, mark: string, value: string) {
  var concatVal = 0;
  if (value.includes(mark)) {
    const splitVal = value.split(mark);
    for (let index = 0; index < splitVal.length; index++) {
      const element = splitVal[index];

      if (!Number.isNaN(Number(element))) {
        if (mark == '+') concatVal = concatVal + Number(element);
        if (mark == '-') concatVal = concatVal - Number(element);
        if (mark == '*') concatVal = concatVal * Number(element);
        if (mark == '/') concatVal = concatVal / Number(element);
        continue;
      } else {

        var fieldName = element.split('.')[0];
        var propName = element.split('.')[1];
        const propV = findPropertyValuebyName(screen, fieldName, propName);
        concatVal = concatVal + Number(propV.replace("=", ""));
      }
    }
    return concatVal;
  }
}

/*
Function for parsing input node and searching appropriate component name

inputNode: input node
name: name of a component

Example: 
search SiteMap = getComponent(inputNode,"SiteMap")
*/
export function getComponent(inputNode : SceneNode[],name: string) {
  for (let index = 0; index < inputNode.length; index++) {
    const element = inputNode[index];
    
    const children = (element as InstanceNode).children;
    if(children != null && children.length > 0) {
      var toNode = children as SceneNode[];
      for (let index = 0; index < children.length; index++) {
        const element = children[index];

        if(element.name.includes(name)) {
            return element;
        } 
        if(element.type == "FRAME") {
          const repe = figma.currentPage.findAll(n => n.id === element.id);
          return getComponent(repe,name);
        }
      }
      return getComponent(toNode,name);
    }
  }
return null;
}

export function getParent(componentNode: SceneNode,parentID: any) {
if(componentNode.parent == null) {
  return false;
}
const parent = componentNode.parent;

if(parent.id == parentID) {
  return true;
}

const parentNode = figma.currentPage.findOne(n => n.id === parent.id);
if(parentNode != null) {
  return getParent(parentNode,parentID);
}
return false;
}
/*
Function for parsing input node and searching appropriate NODE inside the component

inputNode: input node
name: name of the searched node
type: type of the searched node
wrongNodes: list of nodes, where the searched nodes is not located

Example: 
search Area label = getNodeInsideComponent(inputNode,"Label","INSTANCE",arr)
*/
export function getNodeInsideComponent(inputNode : SceneNode[],name: string,type: string,wrongNodes: string[]) {
for (let index = 0; index < inputNode.length; index++) {
  const parElement = inputNode[index];
  const children = (parElement as InstanceNode).children;

  if(children != null && children.length > 0) {
    par: for (let index = 0; index < children.length; index++) {
      const element = children[index];

      for (let i = 0; i < wrongNodes.length; i++) {
        const object = wrongNodes[i];
        if(object == element.name) continue par;
      }

      if(element.name.includes(name)) {
        return element;
      } 
      
      if(element.type == type) {
        const repe = figma.currentPage.findAll(n => n.id === element.id);
        return getNodeInsideComponent(repe,name,type,wrongNodes);
      }

      if(index == children.length -1) {
        var ch = (parElement.parent?.parent as FrameNode).children;
        var parentNode = ch as SceneNode[];

        if(parElement.parent != null) {
          wrongNodes.push(parElement.name);
        }
        return getNodeInsideComponent(parentNode,name,type,wrongNodes);
      }
    }
  }
}
return null;
}

/*
Function for parsing variation name and saving into MAP

variation: input variation of a component
names: a name under variation

Example:
search Group in SiteMap = splitVariationNameIntoMap(inputVariation,"Group");
*/
export function splitVariationNameIntoMap(variation: any,name: string) {
  if (variation != null) {
      var mp = new Map();
      var split = variation.Variation.toString().split("-");

      for (var i = 0; i < split.length; i++) {
        if(split[i].includes(name)) {
          var numName = split[i].split(" ")[0];
          mp.set(name,numName);
        }
      }
      return mp;
  }
  return new Map();
}
/*
Function for looking for Node by name

name: name of the node
*/
export function findNodeByName(name: string) {
  return figma.currentPage.findOne(n => n.name.includes(name));
}

/*
Function for looking for Node by name and parent ID

name: name of the node
parentID: id of the parent node
*/
export function findNodeByNameAndParentID(name: string,parentID:any) {
  return figma.currentPage.findOne(n => n.name.includes(name) && n.parent?.id == parentID);
}

/*
Function for looking for all Nodes by name and parent ID

name: name of the node
parentID: id of the parent node
*/
export function findNodesByNameAndParentID(name: string, parentID: any) {
return figma.currentPage.findAll(n => n.name.includes(name) && n.parent?.id == parentID);
}

export function getPropertyValue(componentProperties: ComponentProperties, searchedValue: string) {
const componentKeys = Object.keys(componentProperties);
const componentValues = Object.values(componentProperties);
for (let index = 0; index < componentKeys.length; index++) {
    const key = componentKeys[index];
    const value = componentValues[index];

    if(key.includes(searchedValue)) {
        return value.value.toString();
    }
}
}

export function isParentNodeByPropertyValue(componentProperties: ComponentProperties, searchedValue: string) {
const componentKeys = Object.keys(componentProperties);
const componentValues = Object.values(componentProperties);

for (let index = 0; index < componentKeys.length; index++) {
  const value = componentValues[index];

  if(value.value.toString() === searchedValue) {
    return true;
  }
}
return false;
}

export function isNumber(value?: string | number): boolean {
  return ((value != null) &&
          (value !== '') &&
          !isNaN(Number(value.toString())));
}

export function isDate(dateStr: string) {
 if(dateStr.length < 2 || isNumber(dateStr)) return false;
 return !isNaN(new Date(dateStr).getDate());
}

export function formatDate(language: string) {
 const randomD = randomDate(new Date(2015, 0, 0), new Date(2024, 0, 0));
 switch(language) {
   case "cs-CZ": {
     const day = randomD.getDate().toString().padStart(2, '0');
     const month = (randomD.getMonth() + 1).toString().padStart(2, '0');
     const year = randomD.getFullYear();
     return `${day}.${month}.${year}`;
   }
   case "en-GB": {
     const day = randomD.getDate().toString().padStart(2, '0');
     const month = (randomD.getMonth() + 1).toString().padStart(2, '0');
     const year = randomD.getFullYear();
     return `${day}/${month}/${year}`;
   }
   default: {
     const day = randomD.getDate().toString().padStart(2, '0');
     const month = (randomD.getMonth() + 1).toString().padStart(2, '0');
     const year = randomD.getFullYear();
     return `${month}/${day}/${year}`;
   }
 }
}

function randomDate(from: Date, to: Date) {
   return new Date(from.getTime() + Math.random() * (to.getTime() - from.getTime()));
}
