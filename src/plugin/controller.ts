import { Guid } from "typescript-guid";
import { AppModule, AppModuleComponentType, AppModuleType, Description, LocalizedName } from "../model/AppModule";
import { SiteMap } from "../model/SiteMap";
import { SolutionComponent } from "../model/SolutionComponent";
import { XMLFile } from "../model/XMLFile";
import { ModuleTypes } from "../model/types/ModuleTypes";
import { exportEntitytoXML, exportOptionsToXML, exportToXML } from "./export";
import { importFromXML } from "./import";
import { XMLBuilder } from "fast-xml-parser";
import { SavedQuery } from "../model/SavedQuery";
import { SystemForm } from "../model/SystemForm";
import { importJSONFiles } from "./Canvas/importers/json-importer";
import { ScreenSaver } from "../model/Canvas/ScreenSaver";
import { parseScreen } from "./Canvas/parsers/parser";
import { importYAMLFiles } from "./Canvas/importers/yaml-importer";
import { parseSelectedFrames } from "./Canvas/exporters/yaml-exporter";
import { importDefinitionJSON } from "./PowerAutomate/importers/flowImporter";
import { makeCanvasTemplate } from "./Canvas/importers/canvas-importer";
import { makeLegendInfo } from "./Canvas/importers/legend-importer";

figma.showUI(__html__);
figma.ui.resize(400, 650);


figma.ui.onmessage = async msg => {

  if(msg.type === 'export-xml') {
    const builder = new XMLBuilder({ignoreAttributes: false,format: true, suppressBooleanAttributes: false, suppressEmptyNode: true, suppressUnpairedNode: false});
    const localCollections = figma.variables.getLocalVariableCollections();

    figma.notify("Export Started...",{timeout: 1000,button: {text: "Cancel",action() {
      return;
    }},onDequeue(reason) {
      reason = 'timeout';
      const solutionComponent = new SolutionComponent();
      const xmls: XMLFile[] = [];
      const componentTypes : AppModuleComponentType[] = [];

      const objects = exportToXML();
      const options = exportOptionsToXML(localCollections);

      if(objects.length > 0) {
        for (let index = 0; index < objects.length; index++) {
          const object = objects[index];
          const xml = builder.build(object);

        var name = "export";
        if(object instanceof SiteMap) name = "SiteMap";
        if(object instanceof SystemForm) name = "SystemForm";
        if(object instanceof SavedQuery) name = "SavedQuery";

          if(object instanceof SiteMap || object instanceof SystemForm) {

            var type = ModuleTypes.sitemap;
            var schemaName = "";

            if(object instanceof SiteMap) {
              schemaName = object.AppModuleSiteMap.SiteMapUniqueName;
            }
            if(object instanceof SystemForm) {
              type = ModuleTypes.forms;
              schemaName =  "{".concat(object.forms.systemform.formid,"}");
            }

            const componentType = new AppModuleComponentType(type.valueOf(),schemaName);
            componentTypes.push(componentType);
          }

          if(object instanceof SavedQuery) {
            const entity = exportEntitytoXML(object.savedqueries.savedquery);
            if(entity != undefined) {
              const componentEntityType = new AppModuleComponentType(ModuleTypes.entity.valueOf(),entity.Entity.Name);
              componentTypes.push(componentEntityType);

              const xml = builder.build(entity);
              xmls.push(new XMLFile("Entity",xml));
            }
          }
          
          xmls.push(new XMLFile(name,xml));
        }

        const localizatedNames: LocalizedName[] = [];
        const descriptions: Description[] = [];

        const appModuleType = new AppModuleType("talxis_export","1.0.0.0",Guid.create().toString(),0,1,"1",0,componentTypes,localizatedNames,descriptions);
        const appModule = new AppModule(appModuleType);

        const xmlAppModule = builder.build(appModule);

        xmls.push(new XMLFile("AppModules",xmlAppModule));
      }

      if(options != null && options != undefined) {
        const xml = builder.build(options);
        xmls.push(new XMLFile("OptionSets",xml));
      }

      solutionComponent.saveXML(xmls);
    },});

  }
  
  if(msg.type == "export") {
    const nodes = figma.currentPage.selection;

    if(nodes != undefined && nodes.length > 0) parseSelectedFrames();
    else figma.notify("Please select at least one frame");
  }

  if(msg.type === 'import-xml') {
    //importFromXML();
  }

  if(msg.type == "import-json") {
    (async() => {
      await loadFonts();
    })().then(() => {
      const screens = importJSONFiles(msg.filesContent,false);
      
      if(screens != undefined) {
        const saver = new ScreenSaver(screens);
        screens.forEach(screen => {
          parseScreen(screen,saver);
          return;
        });
     }
    });
   return;
  }

  if(msg.type == "import-yaml") {
    (async() => {
      await loadFonts();
    })().then(() => {
      const screens = importYAMLFiles(msg.filesContent,false);
      if(screens != undefined) {
      const saver = new ScreenSaver(screens);
      screens.forEach(screen => {
        parseScreen(screen,saver);
        return;
      });
    }
  });
  }

  if(msg.type == "import-flow") {
    const flow = importDefinitionJSON(msg.filesContent);
    console.info(flow);
  }

if(msg.type == "tempVac") {
  (async() => {
    await loadFonts();
  })().then(() => {
    makeCanvasTemplate(); 
  });
  return;
}

if(msg.type == "tempLeg") {
  const importImage = msg.importPNG;
  const redesignImage = msg.redesignPNG;
  const exportImage = msg.exportPNG;
  const moveImage = msg.movePNG;
  
  (async() => {
    await loadFonts();
  })().then(() => {
    makeLegendInfo(importImage,redesignImage,exportImage,moveImage);   
  });
  
};
}

async function loadFonts() {
  await figma.loadFontAsync({
    family: 'Inter',
    style: 'Regular',
  });
  await figma.loadFontAsync({
    family: 'Inter',
    style: 'Bold',
  });
  await figma.loadFontAsync({
    family: "Poppins",
    style: 'Regular',
  });
  await figma.loadFontAsync({
    family: "Poppins",
    style: 'Bold',
  });
}