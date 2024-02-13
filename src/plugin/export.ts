import { nodeToXML } from "./xml-parser";
import { findNodeByName, findNodeByNameAndParentID, findNodesByNameAndParentID, getParent, getPropertyValue, isParentNodeByPropertyValue } from "./util";
import { AttributeDescription, DescriptionParam, DisplayNameParam, OptionSetLabel, OptionSetType, OptionSets, OptionstypeOption } from "../model/OptionSets";
import { OptionSetEnumType, TrueFalse01Type } from "../model/interfaces/IOptionSets";
import { savedQuery } from "../model/SavedQuery";
import { Entity, EntityAttribute, EntityInfoType, EntityInfoTypeEntity, FieldXmlFieldUIType } from "../model/Entity";

/*
Function for exporting to the XML
*/
export function exportToXML() {
  const selectedNodes = figma.currentPage.selection as any[];
  const outputs: any[] = [];
  
  if(selectedNodes.length == 0) {
    const parentNode = figma.currentPage.findAll(n =>  n.parent != null  && n.parent.type == "PAGE");
    
    if(parentNode != undefined && parentNode.length >0) {
      const mapNodes = figma.currentPage.findAll(n => n.name.includes("["));
      fillComponentNodes(mapNodes,outputs);
    }
    return outputs;
  }

  if(selectedNodes.length == 1) {
    const nodeName = selectedNodes[0].name;

    if(nodeName.includes("[")) {
      var name = nodeName.split("]")[0].replace("[", "");

      const output = findComponentToXML(name, selectedNodes[0]);
      if (output != null) outputs.push(output);
    } else {
      const mapNodes = figma.currentPage.findAll(n => n.name.includes("["));
      fillComponentNodes(mapNodes, outputs);
    }
  } 

  return outputs;
}

export function exportOptionsToXML(collections: VariableCollection[]) {
  const optionSetTypes: OptionSetType[] = [];
  collections.forEach(collection => {
    const coll = figma.variables.getVariableCollectionById(collection.id);
    const collectionName = collection.name;
    if(collectionName == "OptionSets") {
      const variables = coll?.variableIds;

      if(variables != undefined) {
        var lastName = "";
        var optionsTypeOptions: OptionstypeOption[] = [];

        for (let index = 0; index < variables.length; index++) {
          const elem = variables[index];

          const variable = figma.variables.getVariableById(elem);
          const value = variable?.valuesByMode;
          const name = variable?.name;

          if(name != undefined && value != undefined) {
            const valueObj = Object.values(value)[0].toString();
            const group = name.split("/")[0];
            const val = name.split("/")[1];

            if(lastName == "" || lastName == group) {
              const labelParam = new AttributeDescription(valueObj,"1033");
              const label = new OptionSetLabel(labelParam);
              const optionsTypeOption = new OptionstypeOption(val,label);
              optionsTypeOptions.push(optionsTypeOption);

              const nextEl = variables[index+1];
              if(nextEl != undefined) {
                const nextVar = figma.variables.getVariableById(nextEl);
                const nextName = nextVar?.name.split("/")[0];
                
                if(nextName != group) {
                  fillOptionSet(group, optionsTypeOptions, optionSetTypes);
                  optionsTypeOptions = new Array<OptionstypeOption>;

                  lastName = group;
                }
                if(lastName == "") lastName = group;
              } else {
                fillOptionSet(group, optionsTypeOptions, optionSetTypes);
              }

             continue;
            }
            if(group !== lastName) {

              const labelParam = new AttributeDescription(valueObj,"1033");
              const label = new OptionSetLabel(labelParam);
              const optionsTypeOption = new OptionstypeOption(val,label);
              optionsTypeOptions.push(optionsTypeOption);

              lastName = group;
            }
          }
        }
      }
    }
  });
  return new OptionSets(optionSetTypes);
}

export function exportEntitytoXML(savedquery: savedQuery) {
  const entity = savedquery.fetchxml.fetch.entity;
  
  const attributes: EntityAttribute[] = [];
  if(Array.isArray(entity.attribute)) {
    entity.attribute.forEach(attribute => {
      const attr = new EntityAttribute(attribute["@_name"],attribute["@_name"],attribute["@_name"],"none",undefined,new DisplayNameParam(new AttributeDescription(attribute["@_name"],"1033")));
      attributes.push(attr);
    });
  } else {
    const attr = new EntityAttribute(entity.attribute["@_name"],entity.attribute["@_name"],entity.attribute["@_name"],"none",undefined,new DisplayNameParam(new AttributeDescription(entity.attribute["@_name"],"1033")));
    attributes.push(attr);
  }
  
  const localizatedValues: FieldXmlFieldUIType[] = [];
  const descriptionValues: FieldXmlFieldUIType[] = [];
  
  localizatedValues.push(new FieldXmlFieldUIType(savedquery.LocalizedNames.LocalizedName[0]["@_description"],"1033"));
  descriptionValues.push(new FieldXmlFieldUIType("","1033"));
  
  const entityType = new EntityInfoTypeEntity(entity["@_name"],localizatedValues,descriptionValues,attributes);
  const entityInfo = new EntityInfoType(entityType);
  
  const entityOutput = new Entity(entity["@_name"],entityInfo);
  return entityOutput;

}

function fillComponentNodes(mapNodes: SceneNode[], outputs: any[]) {
  for (let index = 0; index < mapNodes.length; index++) {
    const node = mapNodes[index];

    var name = node.name.split("]")[0].replace("[", "");

    const output = findComponentToXML(name, node);
    if (output != null) outputs.push(output);
  }
}


function fillOptionSet(group: string, optionsTypeOptions: OptionstypeOption[], optionSetTypes: OptionSetType[]) {
  const typeName = "talxis_" + group.toLowerCase().replace(/\s/g, "_");
  const displayParam = new DisplayNameParam(new AttributeDescription(group, "1033"));
  const descriptionParam = new DescriptionParam(new AttributeDescription("", "1033"));
  const optionType = new OptionSetType(typeName,group, OptionSetEnumType.picklist, TrueFalse01Type.Item1, "1.0.0.0", displayParam, descriptionParam, optionsTypeOptions);
  
  optionSetTypes.push(optionType);
}

function findComponentToXML(name: string, node: SceneNode) {
    switch (name) {
      case "SiteMap":
          return nodeToXML(node, "SiteMap");
      case "Form": {
          return nodeToXML(node,"Form");
      }
      case "SavedQuery": {
        return nodeToXML(node,"SavedQuery");
      }
    }
  return null;
}

