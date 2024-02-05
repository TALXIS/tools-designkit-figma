export interface IScreen {
    name : string;
    fill: string;
    fields: IField[];
    forms?: IForm[] |  undefined;
 }

export interface IField {
    name: string;
    properties: IProps[];
}

export interface IProps {
    key: string; 
    value: string;
}

export interface IForm {
    name: string;
    type: string;
    properties: IProps[];
    fields: IField[];
}