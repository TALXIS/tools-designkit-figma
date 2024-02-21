import { Action, Authentication, ConnectionObject, ConnectionReference, Host, Input, Parameter } from "../../../model/PowerAutomate/Flow";

export function importDefinitionJSON(files: any[]) {
    if(files.length == 0 || files.length > 1) {
        figma.notify("Please select only 'definition.json' file");
        return;
    }
    for (let index = 0; index < files.length; index++) {
        const json = files[index];
        const topParent = JSON.parse(json.content);
        
        const id = topParent.id;
        const name = topParent.name;

        const properties = topParent.properties;
        if(properties == undefined) return;

        const propID = properties.apiId;
        const displayName = properties.displayName;

        const reference = properties.connectionReferences;

        if(reference != undefined) {
            const refKeys = Object.keys(reference);
            const refValues = Object.values(reference);

            const references: ConnectionReference[] = [];

            for (let index = 0; index < refValues.length; index++) {
                const refkey = refKeys[index];
                const refval = refValues[index];

                if(refval != null) {
                    const refID = (refval as any).id; 
                    const connectionName = (refval as any).connectionName; 
                    const source = (refval as any).source; 
                    const tier = (refval as any).tier; 
                    
                    const connnectionObject = new ConnectionObject(refkey,connectionName,source,refID,tier);
                    references.push(new ConnectionReference(connnectionObject));
                }
            }
        }

        const defActions: Action[] = [];
        const defInputs: Input[] = [];
        
        const definition = properties.definition;
        console.info(definition);

        if(definition != undefined) {   
            const actions = definition.actions;

            fillActions(defInputs,defActions,actions);
            
            if(actions != undefined) {
                const actKeys = Object.keys(actions);
                const actValues = Object.values(actions);


                for (let index = 0; index < actValues.length; index++) {
                    const actkey = actKeys[index];
                    const actval = actValues[index];

                    const type = (actval as any).type;
                    
                    if(type == "OpenApiConnection") {

                        const inputs = (actval as any).inputs;

                        const authentication = inputs.authentication;
                        const host = inputs.host;
                        const parameters = inputs.parameters;

                        const defAuthentication = new Authentication(authentication.value,authentication.type);
                        const defHost = new Host(host.apiId,host.connectionName,host.operationId);
                        const defParam = new Parameter(parameters.dataset,parameters.table);

                        const defInput = new Input(actkey,defHost,defParam,defAuthentication);

                        defInputs.push(defInput);
                    }
                }
            }
        } 
    }
}

function fillActions(defInputs: Input[], defActions: Action[], actions: any) {
    
}
