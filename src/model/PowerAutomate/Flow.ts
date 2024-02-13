import { IAction, IAuthentication, IConnectionReference, IDefinition, IFlow, IHost, IInput, IItem, IParameter, IProperties, IConnectionObject } from "./interfaces/IFlow";

export class Flow implements IFlow {
    name: string;
    id: string;
    properties: IProperties;
    
    constructor(name: string, id: string, properties: Properties) {
        this.name = name;
        this.id = id;
        this.properties = properties;
    }
}

export class Properties implements IProperties {
    apiId: string;
    displayName: string;
    definition: IDefinition;
    flowFailureAlertSubscribed: boolean;
    isManaged: boolean;
    connectionReferences: IConnectionReference[];

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
    actions: IAction[];
    
    constructor(contentVersion: string,actions: Action[]) {
        this.contentVersion = "1.0.0.0";
        this.actions = actions;
    }
}

export class Action implements IAction {
    item: IItem;
    
    constructor(item: Item) {
        this.item = item;
    }
}

export class Item implements IItem {
    type: string;
    actions: IAction[] | undefined;
    inputs: IInput[] | undefined;
    
    constructor(type: string, actions: Action[] | undefined, inputs: Input[] | undefined) {
        this.type = type;
        this.actions = actions
        this.inputs = inputs;
    }
}

export class Input implements IInput {
    host: IHost;
    parameters: IParameter;
    authentication: IAuthentication;

    constructor(host: Host, parameters: Parameter, authentication: Authentication) {
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
    connnectionObject: IConnectionObject;
    
    constructor(connnectionObject: ConnectionObject) {
        this.connnectionObject = connnectionObject;
    }
}

export class ConnectionObject implements IConnectionObject {
    connectionName: string;
    source: string;
    id: string;
    tier: string;
    
    constructor(connectionName: string,source: string,id: string,tier: string) {
        this.connectionName = connectionName;
        this.id = id;
        this.source = source;
        this.tier = tier;
    }
}