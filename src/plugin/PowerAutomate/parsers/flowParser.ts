import { Flow, Definition, Input } from "../../../model/PowerAutomate/Flow";
import { hexToRgb } from "../../../util/colorUtil";
import { findLastX } from "../../../util/utils";

export function parseFlow(flow: Flow) {
    const flowBack = hexToRgb("#f5f6fa");
    const flowPoint = hexToRgb("#93d0fe");
    const flowStart = hexToRgb("#C7B3F6");

    const frame = figma.createFrame();
    frame.x = findLastX();
    frame.y = 0;
    frame.name = "Power Automate Flow - " + flow.properties.displayName;
    frame.cornerRadius = 5;
    frame.fills = [{ type: 'SOLID', color: { r: Number(flowBack?.r), g: Number(flowBack?.g), b: Number(flowBack?.b) } }];

    frame.layoutMode = 'VERTICAL';
    frame.counterAxisAlignItems = 'CENTER';
    frame.itemSpacing = 20;
    frame.horizontalPadding = 60;
    frame.verticalPadding = 60;

    const title = figma.createText();
    title.characters = flow.properties.displayName;
    title.name = "flow_title";
    title.fontSize = 40;
    title.resize(frame.width,30);
    title.fills = [{ type: 'SOLID', color: { r: Number(0.2), g: Number(0.2), b: Number(0.2) } }];

    const steps = figma.createFrame();
    steps.name = "flow_steps";
    steps.cornerRadius = 5;
    steps.fills = [{ type: 'SOLID', color: { r: Number(1), g: Number(1), b: Number(1) },opacity: 0 }]; 
    steps.layoutMode = 'VERTICAL';
    steps.counterAxisAlignItems = 'CENTER';
    steps.itemSpacing = 0;

    const circle = figma.createEllipse();
    circle.name = "flow_start";
    circle.fills = [{ type: 'SOLID', color: { r: Number(flowStart?.r), g: Number(flowStart?.g), b: Number(flowStart?.b) } }];
    circle.resize(60,60);

    const circleS = figma.createEllipse();
    circleS.name = "circle";
    circleS.x = 5;
    circleS.fills = [{ type: 'SOLID', color: { r: Number(flowPoint?.r), g: Number(flowPoint?.g), b: Number(flowPoint?.b) } }];
    circleS.strokes = [{ type: 'SOLID', color: { r: Number(0), g: Number(0), b: Number(0) } }];
    circleS.strokeWeight = 2;
    circleS.resize(17,17);

    const startArrow = figma.createLine();
    startArrow.name = "flow_start_arrow";
    startArrow.rotation = -90;
    startArrow.resize(50,0);
    startArrow.strokes = [{ type: 'SOLID', color: { r: Number(flowPoint?.r), g: Number(flowPoint?.g), b: Number(flowPoint?.b) } }];
    startArrow.strokeCap = "NONE";
    startArrow.strokeWeight = 2;

    steps.appendChild(circle);
    steps.appendChild(startArrow);
    steps.appendChild(circleS);

    appendSteps(flow.properties.definition,steps,flowPoint);

    frame.appendChild(title);
    frame.appendChild(steps);
    

    frame.layoutSizingHorizontal = "HUG";
    title.layoutSizingHorizontal = "HUG";

    steps.layoutSizingHorizontal = "HUG";
    steps.layoutSizingVertical = "HUG";
}

function appendSteps(definition: Definition, frame: FrameNode,flowPoint: { r: number; g: number; b: number; } | null) {
    const actions = definition.actions;
    const openAPIColor = hexToRgb("#ff859a");
    const controlColor = hexToRgb("#3649de");
    const flowEnd = hexToRgb("#714AF9");

    for (let index = 0; index < actions.length; index++) {
        const action = actions[index];
        
        const step = figma.createFrame();
        step.name = "flow_step_"+ index;
        step.cornerRadius = 10;
        step.layoutMode = 'VERTICAL';
        step.counterAxisAlignItems = 'MIN';
        step.itemSpacing = 10;
        if(action.item.type != "OpenApiConnection") {
            step.fills = [{ type: 'SOLID', color: { r: Number(controlColor?.r), g: Number(controlColor?.g), b: Number(controlColor?.b) } }];
        } else {
            step.fills = [{ type: 'SOLID', color: { r: Number(openAPIColor?.r), g: Number(openAPIColor?.g), b: Number(openAPIColor?.b) } }];
        }
        step.verticalPadding = 10;
        step.horizontalPadding = 10;
        
        const title = figma.createText();
        title.characters = action.item.parent.toUpperCase();
        title.fontSize = 16;
        title.fontName = { family: "Outfit", style: "Regular" };
        title.name = "flow_title_"+index;
        title.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        title.fontSize = 20;
        
        const circleS = figma.createEllipse();
        circleS.name = "circle";
        circleS.x = 5;
        circleS.fills = [{ type: 'SOLID', color: { r: Number(flowPoint?.r), g: Number(flowPoint?.g), b: Number(flowPoint?.b) } }];
        circleS.strokes = [{ type: 'SOLID', color: { r: Number(0), g: Number(0), b: Number(0) } }];
        circleS.strokeWeight = 2;
        circleS.resize(17,17);
        
        const arrow = figma.createLine();
        arrow.x = title.x;
        arrow.y = title.y;
        arrow.rotation = -90;
        arrow.resize(100,0);
        arrow.strokes = [{ type: 'SOLID', color: { r: Number(flowPoint?.r), g: Number(flowPoint?.g), b: Number(flowPoint?.b) } }];
        arrow.strokeCap = "NONE";
        arrow.strokeWeight = 2;
        
        const line = figma.createLine();
        line.resize(200, 0);
        line.strokeWeight = 1;
        line.strokes = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        
        step.appendChild(title);
        step.appendChild(line);
    
        if(action.item.type != "OpenApiConnection" && action.item.inputs != undefined) {

            const paramLabel = figma.createText();
            paramLabel.characters = "Params:";
            paramLabel.name = "flow_param_label_"+index;
            paramLabel.fontName = { family: "Outfit", style: "Regular" };
            paramLabel.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            paramLabel.fontSize = 15;

            const paramTitle = figma.createText();
            paramTitle.characters = ""+ action.item.inputs;
            paramTitle.name = "flow_param_title_"+index;
            paramTitle.fontName = { family: "Outfit", style: "Regular" };
            paramTitle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            paramTitle.fontSize = 15;

            step.appendChild(paramLabel);
            step.appendChild(paramTitle);
        } else if(action.item.inputs instanceof Input) {
            const apiLabel = figma.createText();
            apiLabel.characters = "API Connection:";
            apiLabel.name = "flow_api_label_"+index;
            apiLabel.fontName = { family: "Outfit", style: "Regular" };
            apiLabel.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            apiLabel.fontSize = 15;

            const apiTitle = figma.createText();
            apiTitle.characters = action.item.inputs.host.connectionName;
            apiTitle.name = "flow_api_title_"+index;
            apiTitle.fontName = { family: "Outfit", style: "Regular" };
            apiTitle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            apiTitle.fontSize = 15;

            step.appendChild(apiLabel);
            step.appendChild(apiTitle);
        } else {
            const typeLabel = figma.createText();
            typeLabel.characters = "Control Type:";
            typeLabel.name = "flow_type_label_"+index;
            typeLabel.fontName = { family: "Outfit", style: "Regular" };
            typeLabel.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            typeLabel.fontSize = 15;
            
            const typeTitle = figma.createText();
            typeTitle.characters = action.item.type;
            typeTitle.name = "flow_type_label_"+index;
            typeTitle.fontName = { family: "Outfit", style: "Regular" };
            typeTitle.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            typeTitle.fontSize = 15;
            
            step.appendChild(typeLabel);
            step.appendChild(typeTitle);
        }
        
        frame.appendChild(step);
        frame.appendChild(circleS);
        frame.appendChild(arrow);
        
        step.layoutSizingHorizontal = "HUG";
        step.layoutSizingVertical = "HUG";
        line.layoutSizingHorizontal = "FILL";
    }

    const circle = figma.createEllipse();
    circle.name = "flow_end";
    circle.fills = [{ type: 'SOLID', color: { r: Number(flowEnd?.r), g: Number(flowEnd?.g), b: Number(flowEnd?.b) } }];
    circle.resize(60,60);

    frame.appendChild(circle);

}
