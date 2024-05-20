import { Field, Form, Props, Screen } from "../../../model/Canvas/Screen";

export function importJSONFiles(files: any[],fileProperty: string) {
    const screens : Screen[] = [];
    for (let index = 0; index < files.length; index++) {
        const json = files[index];

        let width = 0;
        let height = 0;
        if(fileProperty != "") {
            const size = fillScreenSize(fileProperty);
            width = Number(size.w);
            height = Number(size.h);
        }

        const topParent = JSON.parse(json);
        const screenName = topParent.TopParent.Name;

        var screenFill = "";
        const screenRules = topParent.TopParent.Rules;

        screenRules.forEach((rule: any) => {
            if(rule.Property == "Fill") {
                screenFill = rule.InvariantScript.includes("Color") ? "" : rule.InvariantScript;
                return;
            }
        });
        const children = topParent.TopParent.Children;

        const fields : Field[] = [];
        const forms : Form[] = [];
        for (let i = 0; i < children.length; i++) {
            const element = children[i];
            
            const fieldName = element.Name;
            const fieldType = element.Template.Name;

            if(fieldType == "gallery") {
                const childGallery = element.Children;
                const childGalName = element.Name;

                const { galFields, galProps }: { galFields: Field[]; galProps: Props[]; } = loadGallery(childGallery, element);

                const gallery = new Form(childGalName,"gallery",galFields,galProps);
                forms.push(gallery);
                continue;
            }

            if(fieldType == "formViewer") {
                const childViewer = element.Children;
                const childViewName = element.Name;

                const { viewFields, viewProps }: { viewFields: Field[]; viewProps: Props[]; } = loadFormViewer(childViewer, element);

                const viewForm = new Form(childViewName,"formViewer",viewFields,viewProps);
                forms.push(viewForm);
                continue;
            }

            const properties = element.Rules;
            
            const props: Props[] = [];
            for (let j = 0; j < properties.length; j++) {
                const property = properties[j];
                
                const key = property.Property;
                const val = property.InvariantScript;

                const prop = new Props(key,val);
                props.push(prop);
            }
            const field = new Field(fieldName,fieldType,props);
            fields.push(field);
        }
        const scrn = new Screen(screenName,width,height,screenFill,fields,forms);
        screens.push(scrn);
    }
    return screens;
}

function loadFormViewer(childViewer: any, element: any) {
    const viewFields: Field[] = [];
    for (let k = 0; k < childViewer.length; k++) {
        const child = childViewer[k];
        const childData = child.Children;

        for (let index = 0; index < childData.length; index++) {
            const datas = childData[index];

            const viewName = datas.Name;
            const viewType = datas.Template.Name;

            const viewProps = child.Rules;

            const viewProperties: Props[] = [];
            for (let l = 0; l < viewProps.length; l++) {
                const prop = viewProps[l];

                const key = prop.Property;
                const val = prop.InvariantScript;

                const viewProp = new Props(key, val);
                viewProperties.push(viewProp);
            }
            const field = new Field(viewName, viewType, viewProperties);
            viewFields.push(field);
        }
    }
    const viewPr = element.Rules;

    const viewProps: Props[] = [];
    for (let m = 0; m < viewPr.length; m++) {
        const prp = viewPr[m];

        const keyG = prp.Property;
        const valG = prp.InvariantScript;

        const galP = new Props(keyG, valG);

        viewProps.push(galP);
    }
    return { viewFields, viewProps };
}

function loadGallery(childGallery: any, element: any) {
    const galFields: Field[] = [];
    for (let k = 0; k < childGallery.length; k++) {
        const child = childGallery[k];

        const galName = child.Name;
        const galType = child.Template.Name;

        const galProps = child.Rules;

        const galProperties: Props[] = [];
        for (let l = 0; l < galProps.length; l++) {
            const prop = galProps[l];

            const key = prop.Property;
            const val = prop.InvariantScript;

            const galProp = new Props(key, val);
            galProperties.push(galProp);
        }
        const field = new Field(galName, galType, galProperties);
        galFields.push(field);
    }

    const galPr = element.Rules;

    const galProps: Props[] = [];
    for (let m = 0; m < galPr.length; m++) {
        const prp = galPr[m];

        const keyG = prp.Property;
        const valG = prp.InvariantScript;

        const galP = new Props(keyG, valG);

        galProps.push(galP);
    }
    return { galFields, galProps };
}

function fillScreenSize(fileProperty: string) {
    const json = JSON.parse(fileProperty);
    const widthProp = json.DocumentLayoutWidth;
    const heightProp = json.DocumentLayoutHeight;

    return {w: widthProp, h: heightProp};
}