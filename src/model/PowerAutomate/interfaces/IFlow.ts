export interface IFlow {
    name: string;
    id: string;
    properties: IProperties;
    type: string;
}

export interface IProperties {
    apiId: string;
    displayName: string;
    definition: IDefinition;
    flowFailureAlertSubscribed: boolean;
    isManaged: boolean;
    connectionReferences: IConnectionReference[];
}

export interface IDefinition {
    contentVersion: string;
    actions: IAction[];
}

export interface IAction {
    parent: string;
    item: IItem;
}

export interface IItem {
    parent: string;
    type: string;
    inputs: IInput | undefined;
}

export interface IInput {
    key: string;
    host: IHost;
    parameters: IParameter;
    authentication: IAuthentication;
}

export interface IHost {
    apiId: string;
    connectionName: string;
    operationId: string;
}

export interface IParameter {
    dataset: string;
    table: string;
}

export interface IAuthentication {
    value: string;
    type: string;
}

export interface IConnectionReference {
    connnectionObject: IConnectionObject;
}

export interface IConnectionObject {
    key: string;
    connectionName: string;
    source: string;
    id: string;
    tier: string;
}