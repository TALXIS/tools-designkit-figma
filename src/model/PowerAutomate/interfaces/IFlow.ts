export interface IFlow {
    name: string;
    id: string;
    properties: IProperties;
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
    item: IItem;
}

export interface IItem {
    type: string;
    actions: IAction[] | undefined;
    inputs: IInput[] | undefined;
}

export interface IInput {
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
    connectionName: string;
    source: string;
    id: string;
    tier: string;
}