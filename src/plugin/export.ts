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

      const ID = parentNode[0].id;
      fillComponentNodes(mapNodes,ID,outputs);
    }
    return outputs;
  }

  for (const selectedNode of selectedNodes){
    const ID = selectedNode.id;

    const mapNodes = figma.currentPage.findAll(n => n.name.includes("["));
    fillComponentNodes(mapNodes, ID, outputs);
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
  const headerNameNode = findNodeByName("[SavedQueryHeader]");
  const localizatedName = savedquery.LocalizedNames.LocalizedName;
  const localizednameValue = localizatedName[0]["@_description"];
  if(headerNameNode != undefined) {
    const headerCompProperties = (headerNameNode as InstanceNode).componentProperties;
    const rowID = getPropertyValue(headerCompProperties,"Row id");

    if(isParentNodeByPropertyValue(headerCompProperties,localizednameValue)) {
      const headerParent = headerNameNode.parent;
      const savedQueryParent = headerParent?.parent;

      if(savedQueryParent != undefined) {
        const gridNode = findNodeByNameAndParentID("[Grid]",savedQueryParent.id);
        console.info(gridNode);
        if(gridNode != undefined) {
          const columnNodes = findNodesByNameAndParentID("[Column]",gridNode.id);
          console.info(columnNodes);
          const attributes: EntityAttribute[] = [];
          
          if(columnNodes != undefined) {
            columnNodes.forEach(columnNode => {
              const headerColumnNode = (columnNode as InstanceNode).children;
              const componentProperties = (headerColumnNode[0] as InstanceNode).componentProperties;

              const displayName = getPropertyValue(componentProperties,"Header");
              const logicalName = getPropertyValue(componentProperties,"Logical name");

              if(displayName != undefined && logicalName != undefined) {
                const attribute = new EntityAttribute(logicalName,logicalName,logicalName,"none",undefined,new DisplayNameParam(new AttributeDescription(displayName,"1033")));
                attributes.push(attribute);
              }
           });
           const rowIDValue = rowID != undefined ? rowID : "ntg_entityid";
           const entityValue = rowIDValue.substring(0,rowIDValue.length - 2);

           const localizatedValues: FieldXmlFieldUIType[] = [];
           const descriptionValues: FieldXmlFieldUIType[] = [];

           localizatedValues.push(new FieldXmlFieldUIType(localizednameValue,"1033"));
           descriptionValues.push(new FieldXmlFieldUIType("","1033"));

           const entityType = new EntityInfoTypeEntity(entityValue,localizatedValues,descriptionValues,attributes);
           const entityInfo = new EntityInfoType(entityType);

           const entity = new Entity(rowIDValue,entityInfo);
           return entity;
          }
        }
      }
    }
  }
}

function fillComponentNodes(mapNodes: SceneNode[], ID: any, outputs: any[]) {
  for (let index = 0; index < mapNodes.length; index++) {
    const node = mapNodes[index];

    var name = node.name.split("]")[0].replace("[", "");

    const output = findComponentToXML(name, node, ID);
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

function findComponentToXML(name: string, node: SceneNode, ID: any) {
  const hasSelected = getParent(node, ID);
  if (hasSelected || node.id == ID) {
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
  }
  return null;
}

