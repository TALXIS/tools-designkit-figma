import { IScreen, IField, IProps, IForm } from "./interfaces/IScreen";

export class Screen implements IScreen {
    name: string;
    width: number;
    height: number;
    fill: string;
    fields: Field[];
    forms?: Form[] | undefined; 
    
    constructor(name: string,width: number, height: number,fill: string, fields: Field[],forms?: Form[]) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.fields = fields;
        this.forms = forms;
    }

}

export class Form implements IForm {
    name: string;
    type: string;
    fields: Field[];
    properties: Props[];
    
    constructor(name: string,type: string, fields: Field[],props: Props[]) {
        this.name = name;
        this.type = type;
        this.fields = fields;
        this.properties = props;
    }
}

export class Field implements IField {
    name: string;
    type: string;
    properties: Props[];
    
    constructor(name: string,type: string, props: Props[]) {
        this.name = name;
        this.type = type;
        this.properties = props;
    }
}

export class Props implements IProps {
    key: string;
    value: string;
    
    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}
