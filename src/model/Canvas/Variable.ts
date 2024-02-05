export class Variable {
    displayName: string;
    values: Value[];

    constructor(displayName: string,values: Value[]) {
        this.displayName = displayName;
        this.values = values;
    }
}

export class Value {
    name: string;
    value: VariableValue;
    
    constructor(name: string,value: VariableValue) {
        this.name = name;
        this.value = value;
    }
}