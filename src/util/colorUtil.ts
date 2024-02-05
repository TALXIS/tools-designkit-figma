import { ColourType } from "../model/Canvas/ColourTypes";

export function colourNameToHex(colour: string) {
    if(colour == "") return "#ffffff";

    const keys = Object.keys(ColourType);
    const values = Object.values<string>(ColourType);

    for (let index = 0; index < values.length; index++) {
        const key = keys[index];
        const value = values[index];
        
        if(key ==(colour)) return value;
    }
    return "#ffffff";
}

/**
 * Format 3-hex input to the RGB output
 * @date 22/12/2023 - 08:05:10
 *
 * @export
 * @param {string} hex - short hex code
 * @returns {{ r: any; g: any; b: any; }} - RGB codes
 */
export function threeHexToRGB(hex: string) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

export function rgbToShortHex(r: number, g: number, b: number){
  var hexR = Math.round(r / 17).toString(16);
  var hexG = Math.round(g / 17).toString(16);
  var hexB = Math.round(b / 17).toString(16);
  return "#"+hexR+""+hexG+""+hexB;
}

/**
 * Format 6-hex code to the RGBA 
 * @date 22/12/2023 - 08:05:18
 *
 * @export
 * @param {*} hex - 6-code hex 
 * @param {number} alpha - opacity number
 * @returns {string} - RGBA code
 */
export function hexToRGBA(hex: any, alpha: number) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return "RGBA(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

/**
 * Format RGB to the 6-code HEX
 * @date 22/12/2023 - 08:05:24
 *
 * @export
 * @param {number} r - red
 * @param {number} g - green
 * @param {number} b - blue
 * @returns {string} - 6-code HEX
 */
export function rgbToHex(r: number, g: number, b: number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

/**
 * Format 6-code HEX to the RGB
 * @date 22/12/2023 - 08:05:39
 *
 * @export
 * @param {*} hex - 6-code HEX
 * @returns {{ r: number; g: number; b: number; }} - RGB code
 */
export function hexToRgb(hex: any) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : null;
}

/**
 * Format RGBA to the RGB
 * @date 22/12/2023 - 08:05:44
 *
 * @export
 * @param {string} rgba - RGBA format
 * @returns {{ r: number; g: number; b: number; }} - RGB code
 */
export function rgbaToRgb(rgba: string) {
    var fill = rgba.substring(5).split(')').join('').split(',');
    return { r: Number(fill[0]) / 255, g: Number(fill[1]) / 255, b: Number(fill[2]) / 255 };
}

/**
 * Format RGBA to the RGB with opacity
 * @date 22/12/2023 - 08:05:49
 *
 * @export
 * @param {string} rgba - RGBA code
 * @returns {{ r: number; g: number; b: number; o: any; }} - RGB with opacity
 */
export function rgbaToRgbWithOpacity(rgba: string) {
    var fill = rgba.substring(5).split(')').join('').split(',');
    return { r: Number(fill[0]) / 255, g: Number(fill[1]) / 255, b: Number(fill[2]) / 255, o: Number(fill[3]) };
}

/**
 * Shade a color
 * @date 22/12/2023 - 08:06:09
 *
 * @export
 * @param {string} hex - 6-hex code
 * @param {number} percent - percent of the color shading
 * @returns {string} - shaded 6-code HEX code
 */
export function shadeColor(hex: string, percent: number) {

    var R = parseInt(hex.substring(1, 3), 16);
    var G = parseInt(hex.substring(3, 5), 16);
    var B = parseInt(hex.substring(5, 7), 16);
  
    R = parseInt((R * (100 + percent) / 100).toString());
    G = parseInt((G * (100 + percent) / 100).toString());
    B = parseInt((B * (100 + percent) / 100).toString());
  
    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;
  
    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)
  
    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
  
    return "#" + RR + GG + BB;
}

/**
 * Invert a color
 * @date 22/12/2023 - 08:06:14
 *
 * @export
 * @param {string} hex - 6-hex code
 * @returns {string} - inverted 6-hex code
 */
export function invertColor(hex: string) {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX hex.');
    }
    // invert hex components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

/**
 * Format RBG numbers to the HEX format
 * @date 22/12/2023 - 08:05:32
 *
 * @param {number} c - red or green or blue number
 * @returns {*} - part of the HEX
 */
function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function padZero(str: string, len?: number) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}