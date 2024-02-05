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

export function findNodeByName(name: string) {
  return figma.currentPage.findOne(n => n.name.includes(name));
}

export function findNodeByNameAndParentID(name: string,parentID:any) {
  return figma.currentPage.findOne(n => n.name.includes(name) && n.parent?.id == parentID);
}

export function findNodesByNameAndParentID(name: string, parentID: any) {
  return figma.currentPage.findAll(n => n.name.includes(name) && n.parent?.id == parentID);
}