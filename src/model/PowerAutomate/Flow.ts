import { IAction, IAuthentication, IConnectionReference, IDefinition, IFlow, IHost, IInput, IItem, IParameter, IProperties, IConnectionObject } from "./interfaces/IFlow";

export class Flow implements IFlow {
    name: string;
    id: string;
    type: string;
    properties: IProperties;
    
    constructor(name: string, id: string, properties: Properties) {
        this.id = id;
        this.name = name;
        this.type = "Microsoft.Flow/flows";
        this.properties = properties;
    }
}

export class Properties implements IProperties {
    apiId: string;
    displayName: string;
    definition: Definition;
    flowFailureAlertSubscribed: boolean;
    isManaged: boolean;
    connectionReferences: ConnectionReference[];

    constructor(apiId: string,displayName: string,definition: Definition,connectionReferences: ConnectionReference[]) {
        this.apiId = apiId;
        this.displayName = displayName;
        this.definition = definition;
        this.flowFailureAlertSubscribed = false;
        this.isManaged = false;
        this.connectionReferences = connectionReferences;
    }
    
}

export class Definition implements IDefinition {
    contentVersion: string;
    actions: Action[];
    
    constructor(actions: Action[]) {
        this.contentVersion = "1.0.0.0";
        this.actions = actions;
    }
}

export class Action implements IAction {
    item: Item;
    
    constructor(item: Item) {
        this.item = item;
    }
}

export class Item implements IItem {
    parent: string;
    type: string;
    actions: Action[] | undefined;
    inputs: Input[] | undefined;
    
    constructor(parent: string,type: string, actions: Action[] | undefined, inputs: Input[] | undefined) {
        this.parent = parent;
        this.type = type;
        this.actions = actions
        this.inputs = inputs;
    }
}

export class Input implements IInput {
    key: string;
    host: Host;
    parameters: Parameter;
    authentication: Authentication;

    constructor(key:string,host: Host, parameters: Parameter, authentication: Authentication) {
        this.key = key;
        this.host = host;
        this.parameters = parameters;
        this.authentication = authentication;
    }    
}

export class Host implements IHost {
    apiId: string;
    connectionName: string;
    operationId: string;

    constructor(apiId: string,connectionName: string,operationId: string) {
        this.apiId = apiId;
        this.connectionName = connectionName;
        this.operationId = operationId;
    }
}

export class Parameter implements IParameter {
    dataset: string;
    table: string;
    
    constructor(dataset: string,table: string) {
        this.dataset = dataset;
        this.table = table;
    }
}

export class Authentication implements IAuthentication {
    value: string;
    type: string;

    constructor(value: string,type: string) {
        this.type = type;
        this.value = value;
    }
}

export class ConnectionReference implements IConnectionReference {
    connnectionObject: ConnectionObject;
    
    constructor(connnectionObject: ConnectionObject) {
        this.connnectionObject = connnectionObject;
    }
}

export class ConnectionObject implements IConnectionObject {
    key: string;
    connectionName: string;
    source: string;
    id: string;
    tier: string;
    
    constructor(key: string,connectionName: string,source: string,id: string,tier: string) {
        this.key = key;
        this.connectionName = connectionName;
        this.id = id;
        this.source = source;
        this.tier = tier;
    }
}