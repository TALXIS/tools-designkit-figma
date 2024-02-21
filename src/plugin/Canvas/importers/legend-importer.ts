import { hexToRgb } from "../../../util/colorUtil";
import { findLastX } from "../../../util/utils";

export function makeLegendInfo(importImage: any, redesignImage: any,exportImage: any,moveImage: any) {
    const background = hexToRgb("#FFFFFF");
    const textColor = hexToRgb("#34306D");

    addHowtoUse(background,textColor,importImage,redesignImage,exportImage,moveImage);
}


function addHowtoUse(background: { r: number; g: number; b: number; } | null, textColor: { r: number; g: number; b: number; } | null, importImage: any,redesignImage: any,exportImage: any,moveImage: any) {
    const frame = figma.createFrame();
    frame.x = findLastX();
    frame.y = 0;
    frame.name = "How to use";
    frame.cornerRadius = 5;
    frame.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }];
    
    frame.layoutMode = 'VERTICAL';
    frame.counterAxisAlignItems = 'MIN';
    frame.itemSpacing = 20;
    frame.horizontalPadding = 20;
    frame.verticalPadding = 20;

    const title = figma.createText();
    title.characters = "How to use Plugin?";
    title.name = "ht_title";
    title.fontSize = 40;
    title.resize(frame.width,30);
    title.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    const steps1 = figma.createFrame();
    steps1.name = "steps1";
    steps1.cornerRadius = 5;
    steps1.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }]; 
    steps1.layoutMode = 'HORIZONTAL';
    steps1.counterAxisAlignItems = 'MIN';
    steps1.itemSpacing = 20;

    const step1Dscr = figma.createText();
    step1Dscr.characters = "Step 1 - import Canvas (JSON,YAML) from your local";
    step1Dscr.name = "ht_step1";
    step1Dscr.fontSize = 20;
    step1Dscr.resize(600,30);
    step1Dscr.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    steps1.appendChild(step1Dscr);

    figma.createImageAsync(
        importImage
        ).then(async (image: Image) => {
            const node = figma.createRectangle();
            node.name = "step1_image";
            node.resize(400,300);
    
            node.fills = [{
                type: 'IMAGE',
                imageHash: image.hash,
                scaleMode: 'FIT'
            }];
            steps1.appendChild(node);
    });    

    const steps2 = figma.createFrame();
    steps2.name = "steps2";
    steps2.cornerRadius = 5;
    steps2.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }]; 
    steps2.layoutMode = 'HORIZONTAL';
    steps2.counterAxisAlignItems = 'MIN';
    steps2.itemSpacing = 20;

    const step2Dscr = figma.createText();
    step2Dscr.characters = "Step 2 - re-design your imported screen(s)";
    step2Dscr.name = "ht_step2";
    step2Dscr.fontSize = 20;
    step2Dscr.resize(600,30);
    step2Dscr.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    steps2.appendChild(step2Dscr);

    figma.createImageAsync(
        redesignImage
        ).then(async (image: Image) => {
            const node = figma.createRectangle();
            node.name = "step2_image";
            node.resize(400,300);
    
            node.fills = [{
                type: 'IMAGE',
                imageHash: image.hash,
                scaleMode: 'FIT'
            }];
            steps2.appendChild(node);
    });   

    const steps3 = figma.createFrame();
    steps3.name = "steps3";
    steps3.cornerRadius = 5;
    steps3.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }]; 
    steps3.layoutMode = 'HORIZONTAL';
    steps3.counterAxisAlignItems = 'MIN';
    steps3.itemSpacing = 20;

    const step3Dscr = figma.createText();
    step3Dscr.characters = "Step 3 - export selected re-designed screen(s) to local storage (YAML)";
    step3Dscr.name = "ht_step3";
    step3Dscr.fontSize = 20;
    step3Dscr.resize(600,30);
    step3Dscr.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    steps3.appendChild(step3Dscr);

    figma.createImageAsync(
        exportImage
        ).then(async (image: Image) => {
            const node = figma.createRectangle();
            node.name = "step3_image";
            node.resize(400,300);
    
            node.fills = [{
                type: 'IMAGE',
                imageHash: image.hash,
                scaleMode: 'FIT'
            }];
            steps3.appendChild(node);
    });   

    const steps4 = figma.createFrame();
    steps4.name = "steps4";
    steps4.cornerRadius = 5;
    steps4.fills = [{ type: 'SOLID', color: { r: Number(background?.r), g: Number(background?.g), b: Number(background?.b) } }]; 
    steps4.layoutMode = 'HORIZONTAL';
    steps4.counterAxisAlignItems = 'MIN';
    steps4.itemSpacing = 20;

    const step4Dscr = figma.createText();
    step4Dscr.characters = "Step 4 - move exported (YAML) file(s) to your cloned local GIT repository";
    step4Dscr.name = "ht_step4";
    step4Dscr.fontSize = 20;
    step4Dscr.resize(600,30);
    step4Dscr.fills = [{ type: 'SOLID', color: { r: Number(textColor?.r), g: Number(textColor?.g), b: Number(textColor?.b) } }];

    steps4.appendChild(step4Dscr);

    figma.createImageAsync(
        moveImage
        ).then(async (image: Image) => {
            const node = figma.createRectangle();
            node.name = "step4_image";
            node.resize(400,300);
    
            node.fills = [{
                type: 'IMAGE',
                imageHash: image.hash,
                scaleMode: 'FIT'
            }];
            steps4.appendChild(node);
    });   

    frame.appendChild(title);
    frame.appendChild(steps1);
    frame.appendChild(steps2);
    frame.appendChild(steps3);
    frame.appendChild(steps4);
    
    frame.layoutSizingHorizontal = "HUG";
    title.layoutSizingHorizontal = "HUG";

    steps1.layoutSizingHorizontal = "HUG";
    steps1.layoutSizingVertical = "HUG";
    steps2.layoutSizingHorizontal = "HUG";
    steps2.layoutSizingVertical = "HUG";
    steps3.layoutSizingHorizontal = "HUG";
    steps3.layoutSizingVertical = "HUG";
    steps4.layoutSizingHorizontal = "HUG";
    steps4.layoutSizingVertical = "HUG";

    step1Dscr.layoutSizingVertical = "HUG"
    step1Dscr.layoutSizingHorizontal = "FIXED"
    step2Dscr.layoutSizingVertical = "HUG"
    step2Dscr.layoutSizingHorizontal = "FIXED"
    step3Dscr.layoutSizingVertical = "HUG"
    step3Dscr.layoutSizingHorizontal = "FIXED"
    step4Dscr.layoutSizingVertical = "HUG"
    step4Dscr.layoutSizingHorizontal = "FIXED"
}