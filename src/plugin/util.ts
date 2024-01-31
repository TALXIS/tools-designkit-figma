/*
Function for parsing input node and searching appropriate component name

inputNode: input node
name: name of a component

Example: 
search SiteMap = getComponent(inputNode,"SiteMap")
*/
export function getComponent(inputNode : SceneNode[],name: string) {
    for (let index = 0; index < inputNode.length; index++) {
      const element = inputNode[index];
      
      const children = (element as InstanceNode).children;
      if(children != null && children.length > 0) {
        var toNode = children as SceneNode[];
        for (let index = 0; index < children.length; index++) {
          const element = children[index];

          if(element.name.includes(name)) {
              return element;
          } 
          if(element.type == "FRAME") {
            const repe = figma.currentPage.findAll(n => n.id === element.id);
            return getComponent(repe,name);
          }
        }
        return getComponent(toNode,name);
      }
    }
  return null;
}

export function getParent(componentNode: SceneNode,parentID: any) {
  if(componentNode.parent == null) {
    return false;
  }
  const parent = componentNode.parent;
  
  if(parent.id == parentID) {
    return true;
  }
  
  const parentNode = figma.currentPage.findOne(n => n.id === parent.id);
  if(parentNode != null) {
    return getParent(parentNode,parentID);
  }
  return false;
}
/*
Function for parsing input node and searching appropriate NODE inside the component

inputNode: input node
name: name of the searched node
type: type of the searched node
wrongNodes: list of nodes, where the searched nodes is not located

Example: 
search Area label = getNodeInsideComponent(inputNode,"Label","INSTANCE",arr)
*/
export function getNodeInsideComponent(inputNode : SceneNode[],name: string,type: string,wrongNodes: string[]) {
  for (let index = 0; index < inputNode.length; index++) {
    const parElement = inputNode[index];
    const children = (parElement as InstanceNode).children;

    if(children != null && children.length > 0) {
      par: for (let index = 0; index < children.length; index++) {
        const element = children[index];

        for (let i = 0; i < wrongNodes.length; i++) {
          const object = wrongNodes[i];
          if(object == element.name) continue par;
        }

        if(element.name.includes(name)) {
          return element;
        } 
        
        if(element.type == type) {
          const repe = figma.currentPage.findAll(n => n.id === element.id);
          return getNodeInsideComponent(repe,name,type,wrongNodes);
        }

        if(index == children.length -1) {
          var ch = (parElement.parent?.parent as FrameNode).children;
          var parentNode = ch as SceneNode[];

          if(parElement.parent != null) {
            wrongNodes.push(parElement.name);
          }
          return getNodeInsideComponent(parentNode,name,type,wrongNodes);
        }
      }
    }
  }
  return null;
}

/*
Function for parsing variation name and saving into MAP

variation: input variation of a component
names: a name under variation

Example:
search Group in SiteMap = splitVariationNameIntoMap(inputVariation,"Group");
*/
export function splitVariationNameIntoMap(variation: any,name: string) {
    if (variation != null) {
        var mp = new Map();
        var split = variation.Variation.toString().split("-");

        for (var i = 0; i < split.length; i++) {
          if(split[i].includes(name)) {
            var numName = split[i].split(" ")[0];
            mp.set(name,numName);
          }
        }
        return mp;
    }
    return new Map();
}
/*
Function for looking for Node by name

name: name of the node
*/
export function findNodeByName(name: string) {
    return figma.currentPage.findOne(n => n.name.includes(name));
}

/*
Function for looking for Node by name and parent ID

name: name of the node
parentID: id of the parent node
*/
export function findNodeByNameAndParentID(name: string,parentID:any) {
    return figma.currentPage.findOne(n => n.name.includes(name) && n.parent?.id == parentID);
}

/*
Function for looking for all Nodes by name and parent ID

name: name of the node
parentID: id of the parent node
*/
export function findNodesByNameAndParentID(name: string, parentID: any) {
  return figma.currentPage.findAll(n => n.name.includes(name) && n.parent?.id == parentID);
}

export function getPropertyValue(componentProperties: ComponentProperties, searchedValue: string) {
  const componentKeys = Object.keys(componentProperties);
  const componentValues = Object.values(componentProperties);
  for (let index = 0; index < componentKeys.length; index++) {
      const key = componentKeys[index];
      const value = componentValues[index];

      if(key.includes(searchedValue)) {
          return value.value.toString();
      }
  }
}

export function isParentNodeByPropertyValue(componentProperties: ComponentProperties, searchedValue: string) {
  const componentKeys = Object.keys(componentProperties);
  const componentValues = Object.values(componentProperties);

  for (let index = 0; index < componentKeys.length; index++) {
    const value = componentValues[index];

    if(value.value.toString() === searchedValue) {
      return true;
    }
  }
 return false;
}