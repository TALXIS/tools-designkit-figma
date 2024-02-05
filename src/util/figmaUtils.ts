import { Variable } from "../model/Canvas/Variable";

export function createCollections(collectionName: string,type: VariableResolvedDataType,variables: Variable[]) {
    const collection = figma.variables.createVariableCollection(collectionName);
    collection.renameMode(collection.modes[0].modeId, "Default");
    const enModeId = collection.modes[0].modeId;

    variables.forEach(variable => {
        const displayName = variable.displayName;
        variable.values.forEach(value => {
            const variable = figma.variables.createVariable(value.name,collection.id,type);
            variable.name = displayName + "/" + value.name;
            variable.setValueForMode(enModeId,value.value);
        });
    });
}