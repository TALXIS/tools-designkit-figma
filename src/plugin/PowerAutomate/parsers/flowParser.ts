import { Flow, Definition } from "../../../model/PowerAutomate/Flow";
import { findLastX } from "../../../util/utils";

export function parseFlow(flow: Flow) {    
    const frame = figma.createFrame();
    frame.x = findLastX();
    frame.y = 0;
    frame.name = "Power Automate Flow - " + flow.properties.displayName;
    frame.cornerRadius = 5;
    frame.fills = [{ type: 'SOLID', color: { r: Number(1), g: Number(1), b: Number(1) } }];

    frame.layoutMode = 'VERTICAL';
    frame.counterAxisAlignItems = 'CENTER';
    frame.itemSpacing = 20;
    frame.horizontalPadding = 20;
    frame.verticalPadding = 20;

    const title = figma.createText();
    title.characters = flow.properties.displayName;
    title.name = "flow_title";
    title.fontSize = 40;
    title.resize(frame.width,30);
    title.fills = [{ type: 'SOLID', color: { r: Number(0.2), g: Number(0.2), b: Number(0.2) } }];

    const steps = figma.createFrame();
    steps.name = "flow_steps";
    steps.cornerRadius = 5;
    steps.fills = [{ type: 'SOLID', color: { r: Number(1), g: Number(1), b: Number(1) } }]; 
    steps.layoutMode = 'VERTICAL';
    steps.counterAxisAlignItems = 'CENTER';
    steps.itemSpacing = 0;

    appendSteps(flow.properties.definition,steps);

    frame.appendChild(title);
    frame.appendChild(steps);
    

    frame.layoutSizingHorizontal = "HUG";
    title.layoutSizingHorizontal = "HUG";

    steps.layoutSizingHorizontal = "HUG";
    steps.layoutSizingVertical = "HUG";
}

function appendSteps(definition: Definition, frame: FrameNode) {
    const actions = definition.actions;

    for (let index = 0; index < actions.length; index++) {
        const action = actions[index];

        if(action.parent == "") {
            const step = figma.createFrame();
            step.name = "flow_step_"+ index;
            step.cornerRadius = 5;
            step.layoutMode = 'VERTICAL';
            step.counterAxisAlignItems = 'MIN';
            step.itemSpacing = 20;
            step.fills = [{ type: 'SOLID', color: { r: Number(0.7), g: Number(0.7), b: Number(0.7) } }];
            step.verticalPadding = 10;
            step.horizontalPadding = 10;
            
            const title = figma.createText();
            title.characters = action.item.type == "OpenApiConnection" ? action.item.inputs?.host.connectionName + " - " + action.item.parent : action.item.type + "_" + action.item.parent;
            title.name = "flow_title_"+index;
            title.fontSize = 20;
            
            const arrow = figma.createLine();
            arrow.x = title.x;
            arrow.y = title.y;
            arrow.resize(200,1);
            arrow.strokes = [{ type: 'SOLID', color: { r: Number(0.1), g: Number(0.1), b: Number(0.1) } }];
            arrow.strokeCap = "ARROW_LINES";
            arrow.strokeWeight = 2;

            step.appendChild(title);
            frame.appendChild(step);
            frame.appendChild(arrow);

            step.layoutSizingHorizontal = "HUG";
            step.layoutSizingVertical = "HUG";
        }

    }
}
