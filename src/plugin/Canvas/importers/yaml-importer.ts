import yaml from 'js-yaml';
import { Screen, Field, Props, Form } from '../../../model/Canvas/Screen';
import { colourNameToHex } from '../../../util/colorUtil';
import { hexToRGBA } from '../../../util/colorUtil';


/**
 * The `importFiles` function takes an array of files, parses them as YAML, converts them to JSON, and
 * extracts relevant information to create an array of `Screen` objects.
 * @param {any[]} files - The `files` parameter is an array of objects. Each object represents a file
 * and has the following properties:
 * @returns an array of Screen objects.
 */
export function importYAMLFiles(files: any[],fromGit: boolean) {
    const screens : Screen[] = [];
    for (let index = 0; index < files.length; index++) {
        const file = files[index];
    
        const obj = fromGit == true? yaml.load(file) : yaml.load(file.content);

        const json = JSON.stringify(obj,null,2);
        const screenobj = JSON.parse(json);
        
        const screenName = Object.keys(screenobj)[0].split("As")[0].trim();
        
        var screenFill = "";
        
        const fieldsValues = Object.values(screenobj);
        const fieldsJson = JSON.stringify(fieldsValues[0],null,2);
        
        const filedsObj = JSON.parse(fieldsJson);
        const fieldsKeys = Object.keys(filedsObj);
        
        const propValues = Object.values(filedsObj);
        
        const fields : Field[] = [];
        const forms : Form[] = [];
        val: for (let index = 0; index < propValues.length; index++) {
            if(fieldsKeys[index] == "OnVisible") {
                continue;
            }
            if(fieldsKeys[index] == "Fill") {
                const propFill = propValues[0] as string;
                screenFill = propFill.replace("=","");
                if(screenFill.includes("Color.")) {
                    const colour = screenFill.split(".")[1];
                    const hex = colourNameToHex(colour);
                    screenFill = hexToRGBA(hex,1);
                }
                continue val;
            }
            const fieldName = fieldsKeys[index].split("As ")[0].trim();
            const fieldType = fieldsKeys[index].split("As ")[1].replace(':','');
            const propValue = propValues[index];
            
            const propJson = JSON.stringify(propValue,null,2);
            const propObj = JSON.parse(propJson);
            
            if(fieldType.includes("gallery")) {
                const galJson = JSON.stringify(propObj,null,2);
                const galObj = JSON.parse(galJson);

                const galKeys = Object.keys(galObj);
                const galValues = Object.values(galObj);

                loadGallery(galKeys,galValues,forms,fieldName);
                continue;
            }

            if(fieldType.includes("formViewer")) {
                const formJson = JSON.stringify(propObj,null,2);
                const formObj = JSON.parse(formJson);
                
                const formKeys = Object.keys(formObj);
                const formValues = Object.values(formObj);

                loadForm(formKeys,formValues,forms,fieldName);
                
                continue;
            }
            if(fieldType.includes("group")) {
                const groupJson = JSON.stringify(propObj,null,2);
                const groupObj = JSON.parse(groupJson);

                const groupKeys = Object.keys(groupObj);
                const groupValues = Object.values(groupObj);
                loadGroup(groupKeys,groupValues,forms,fieldName);

                continue;
            }

            const propKeys = Object.keys(propObj);
            const propVals = Object.values(propObj) as string[];
            
            const props: Props[] = [];
            
            for (let index = 0; index < propVals.length; index++) {
                const key = propKeys[index];
                const val = propVals[index];
                
                const prop = new Props(key,val);
                props.push(prop);
            }
            const fld = new Field(fieldName,fieldType,props);
            fields.push(fld);
        }

        const scrn = new Screen(screenName,0,0,screenFill,fields,forms);
        screens.push(scrn);

    }
    return screens;
}

/**
 * The function `loadGallery` takes in an array of gallery keys, an array of gallery values, an array
 * of forms, and a gallery name, and creates a new gallery object with the given keys and values, and
 * adds it to the forms array.
 * @param {string[]} galKeys - An array of strings representing the keys for each item in the gallery.
 * @param {unknown[]} galValues - An array of values for each key in the gallery. These values can be
 * of any type (string, number, boolean, object, etc.).
 * @param {Form[]} forms - An array of Form objects.
 * @param {string} galName - The `galName` parameter is a string that represents the name of the
 * gallery.
 */
function loadGallery(galKeys: string[], galValues: unknown[],forms: Form[],galName: string) {
    const props: Props[] = [];
    const fields : Field[] = [];
    for (let index = 0; index < galKeys.length; index++) {
        const key = galKeys[index];
        const val = galValues[index];

        if(key.includes("As")) {
            const fieldName = galKeys[index].split("As ")[0].trim();
            const fieldType = galKeys[index].split("As ")[1].replace(':','');
            
            const valJson = JSON.stringify(val,null,2);
            const valObj = JSON.parse(valJson);
            
            const propKeys = Object.keys(valObj);
            const propVals = Object.values(valObj) as string[];

            const galProps: Props[] = [];
            for (let index = 0; index < propKeys.length; index++) {
                const key = propKeys[index];
                const val = propVals[index];

                const galProp = new Props(key,val);
                galProps.push(galProp);
            }
            const field = new Field(fieldName,fieldType,galProps);

            fields.push(field);
            continue;
        }

        const prop = new Props(key,val as string);
        props.push(prop);
    }
    const gallery = new Form(galName,"gallery",fields,props);
    forms.push(gallery);
}

/**
 * The function `loadForm` takes in form keys, form values, an array of forms, and a field name, and
 * creates a form object with the given properties.
 * @param {string[]} formKeys - An array of strings representing the keys of the form fields.
 * @param {unknown[]} formValues - An array of values for each form field.
 * @param {Form[]} forms - An array of Form objects that will be updated with the new form data.
 * @param {string} fieldName - The `fieldName` parameter is a string that represents the name of the
 * form field.
 */
function loadForm(formKeys: string[], formValues: unknown[], forms: Form[], fieldName: string) {
    const props: Props[] = [];
    const fields : Field[] = [];

    for (let index = 0; index < formKeys.length; index++) {
        const key = formKeys[index];
        const val = formValues[index];

        if(key.includes("As")) {
            
            const valJson = JSON.stringify(val,null,2);
            const valObj = JSON.parse(valJson);
            
            const propKeys = Object.keys(valObj);
            const propVals = Object.values(valObj) as string[];
            for (let index = 0; index < propKeys.length; index++) {
                const key = propKeys[index];
                const val = propVals[index];
                
                if(key.includes("As")) {
                    const fieldName = key.split("As ")[0].trim();
                    const fieldType = key.split("As ")[1].replace(':','');

                    const valFieldJson = JSON.stringify(val,null,2);
                    const valFieldObj = JSON.parse(valFieldJson);
                    
                    const propFieldKeys = Object.keys(valFieldObj);
                    const propFieldVals = Object.values(valFieldObj) as string[];
                    
                    const fieldProps: Props[] = [];
                    for (let index = 0; index < propFieldKeys.length; index++) {
                        const fieldKey = propFieldKeys[index];
                        const fieldVal = propFieldVals[index];

                        const fieldProp = new Props(fieldKey,fieldVal);
                        fieldProps.push(fieldProp);
                        
                    }
                    
                    const field = new Field(fieldName,fieldType,fieldProps);
                    fields.push(field);
                    continue;
                }
            }
            continue;
        }
        const prop = new Props(key,val as string);
        props.push(prop);
        
    }
    const formView = new Form(fieldName,"formViewer",fields,props);
    forms.push(formView);
}

/**
 * The function `loadGroup` takes in an array of group keys, an array of group values, an array of
 * forms, and a field name, and creates a new group form with the given field name, group keys, and
 * group values, and adds it to the forms array.
 * @param {string[]} groupKeys - An array of strings representing the keys of the group.
 * @param {unknown[]} groupValues - The `groupValues` parameter is an array of values corresponding to
 * the `groupKeys` parameter. Each value represents the value associated with a specific key in the
 * `groupKeys` array.
 * @param {Form[]} forms - An array of Form objects.
 * @param {string} fieldName - The `fieldName` parameter is a string that represents the name of the
 * group field.
 */
function loadGroup(groupKeys: string[], groupValues: unknown[], forms: Form[], fieldName: string) {
    const props: Props[] = [];
    const fields : Field[] = [];
    for (let index = 0; index < groupKeys.length; index++) {
        const key = groupKeys[index];
        const val = groupValues[index];

        if(key.includes("As")) {
            const fieldName = groupKeys[index].split("As ")[0].trim();
            const fieldType = groupKeys[index].split("As ")[1].replace(':','');

            const valJson = JSON.stringify(val,null,2);
            const valObj = JSON.parse(valJson);
            
            const propKeys = Object.keys(valObj);
            const propVals = Object.values(valObj) as string[];

            const groupProps: Props[] = [];
            for (let index = 0; index < propKeys.length; index++) {
                const key = propKeys[index];
                const val = propVals[index];

                const groupProp = new Props(key,val);
                groupProps.push(groupProp);
            }
            const field = new Field(fieldName,fieldType,groupProps);
            fields.push(field);
            continue;
        }
        const prop = new Props(key,val as string);
        props.push(prop);
    }
    const group = new Form(fieldName,"group",fields,props);
    forms.push(group);
}

