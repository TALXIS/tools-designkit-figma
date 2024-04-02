import { importJSONFiles } from "./Canvas/importers/json-importer";
import { ScreenSaver } from "../model/Canvas/ScreenSaver";
import { parseScreen } from "./Canvas/parsers/parser";
import { importYAMLFiles } from "./Canvas/importers/yaml-importer";
import { parseSelectedFrames } from "./Canvas/exporters/yaml-exporter";
import { importDefinitionJSON } from "./PowerAutomate/importers/flowImporter";
import { makeCanvasTemplate } from "./Canvas/importers/canvas-importer";
import { makeLegendInfo } from "./Canvas/importers/legend-importer";
import { parseFlow } from "./PowerAutomate/parsers/flowParser";
import { parseModelDrivenScreen } from "./ModelDriven/parsers/modelDrivenParser";
import { importXMLFiles } from "./ModelDriven/importers/xml-importer";

figma.showUI(__html__);
figma.ui.resize(400, 610);


figma.ui.onmessage = async msg => {

  
  if(msg.type == "export") {
    const nodes = figma.currentPage.selection;

    if(nodes != undefined && nodes.length > 0) parseSelectedFrames();
    else figma.notify("Please select at least one frame");
  }

  if(msg.type === 'import-xml') {
    (async() => {
      await loadFonts();
    })().then(() => {
      const modelDrivenScreens = importXMLFiles(msg.filesContent,false);
      if(modelDrivenScreens != undefined && modelDrivenScreens.length > 0) {
        modelDrivenScreens.forEach(modelDrivenScreen => {
          parseModelDrivenScreen(modelDrivenScreen);
        });
      }
    });
    return;
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
    if(flow != undefined) {
      (async() => {
        await loadFonts();
      })().then(() => {
        parseFlow(flow);
      });
    }
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
  await figma.loadFontAsync({
    family: "Outfit",
    style: 'Regular',
  });
}