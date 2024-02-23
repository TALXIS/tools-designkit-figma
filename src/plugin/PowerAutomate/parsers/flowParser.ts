import { Flow, Definition, Input } from "../../../model/PowerAutomate/Flow";
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

    const circle = figma.createEllipse();
    circle.name = "flow_start";
    circle.fills = [{ type: 'SOLID', color: { r: 0.49, g: 0.81, b: 0.68 } }];
    circle.resize(60,60);

    const startArrow = figma.createLine();
    startArrow.name = "flow_start_arrow";
    startArrow.rotation = -90;
    startArrow.resize(50,0);
    startArrow.strokes = [{ type: 'SOLID', color: { r: Number(0.1), g: Number(0.1), b: Number(0.1) } }];
    startArrow.strokeCap = "NONE";
    startArrow.strokeWeight = 2;

    steps.appendChild(circle);
    steps.appendChild(startArrow);

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

        const step = figma.createFrame();
        step.name = "flow_step_"+ index;
        step.cornerRadius = 5;
        step.layoutMode = 'VERTICAL';
        step.counterAxisAlignItems = 'CENTER';
        step.itemSpacing = 20;
        step.fills = [{ type: 'SOLID', color: { r: Number(0.84), g: Number(0.84), b: Number(0.84) } }];
        step.verticalPadding = 10;
        step.horizontalPadding = 10;
        
        const title = figma.createText();
        title.characters = action.item.type == "OpenApiConnection" && (action.item.inputs instanceof Input) ? action.item.inputs.host.connectionName + " - " + action.item.parent : action.item.type + " - " + action.item.parent;
        title.name = "flow_title_"+index;
        title.fontSize = 20;
        
        const arrow = figma.createLine();
        arrow.x = title.x;
        arrow.y = title.y;
        arrow.rotation = -90;
        arrow.resize(100,0);
        arrow.strokes = [{ type: 'SOLID', color: { r: Number(0.1), g: Number(0.1), b: Number(0.1) } }];
        arrow.strokeCap = "NONE";
        arrow.strokeWeight = 2;
        
        step.appendChild(title);
        if(action.item.type != "OpenApiConnection" && action.item.inputs != undefined) {
            const paramTitle = figma.createText();
            paramTitle.characters = ""+ action.item.inputs;
            paramTitle.name = "flow_param_title_"+index;
            paramTitle.fontSize = 15;
            step.appendChild(paramTitle);
        }

        frame.appendChild(step);
        frame.appendChild(arrow);

        step.layoutSizingHorizontal = "HUG";
        step.layoutSizingVertical = "HUG";
    }

    const circle = figma.createEllipse();
    circle.name = "flow_end";
    circle.fills = [{ type: 'SOLID', color: { r: 0.97, g: 0.58, b: 0.6 } }];
    circle.resize(60,60);

    frame.appendChild(circle);

}
