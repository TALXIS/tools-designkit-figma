import React from 'react';
import '../styles/ui.css';
import {Button,PositioningProps, Subtitle1,Image,Label,Tab, TabList,TabValue, SelectTabEvent, SelectTabData, Title1,RadioGroup,Radio,RadioGroupOnChangeData } from '@fluentui/react-components';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useFilePicker } from 'use-file-picker';

const logo: string = require("../assets/logo.png").default;
const vacation: string = require("../assets/vacation.png").default;
const importPNG: string = require("../assets/import.png").default;
const redesignPNG: string = require("../assets/redesign.png").default;
const exportPNG: string = require("../assets/export.png").default;
const movePNG: string = require("../assets/move.png").default;

function App(props: PositioningProps) {

  const [selectedValue, setSelectedValue] = React.useState<TabValue>("canvas");

  const [value, setValue] = React.useState("json");
  const [selectedContent, setSelectedContent] = React.useState("jsoncontent");
  const [selectedDrivenContent, setSelectedDrivenContent] = React.useState("");
  const [selectedHelperContent, setSelectedHelperContent] = React.useState("");

  const flowPicker = useFilePicker({
    accept: '.json',
    onFilesSelected: ({ filesContent }) => {
      parent.postMessage({ pluginMessage: { type: 'import-flow', filesContent } }, '*');
    },
  });
  const drivenPicker = useFilePicker({
    accept: '.xml',
    onFilesSelected: ({ filesContent }) => {
      parent.postMessage({ pluginMessage: { type: 'import-xml', filesContent } }, '*');
    },
  });
  const jsonPicker = useFilePicker({
    accept: '.json',
    onFilesSelected: ({ filesContent }) => {
      parent.postMessage({ pluginMessage: { type: 'import-json', filesContent } }, '*');
    },
  });
  const yamlPicker = useFilePicker({
    accept: '.yaml',
    onFilesSelected: ({ filesContent }) => {
      parent.postMessage({ pluginMessage: { type: 'import-yaml', filesContent } }, '*');
    },
  });

  React.useEffect(() => {
    window.onmessage = async (event) => {
      let data = event.data.pluginMessage;
      
      if(data != undefined) {
        if(data.pluginMessage.type == "yaml") {
          let names = data.pluginMessage.names;
          if(data.pluginMessage.yaml.length == 1) {
            const fileName = names[0];
            const file = new Blob([data.pluginMessage.yaml], { type: 'application/yaml' });
            let link = document.createElement('a');
            link.target = '_blank';
            link.href = window.URL.createObjectURL(file);
            var name = fileName.concat('.fx.yaml');
            link.setAttribute("download", name);
            link.click();
            URL.revokeObjectURL(link.href);
          } else {
            var zip = new JSZip();
            for (let i = 0; i < data.pluginMessage.yaml.length; i++) {
              const fileName = names[i];
              const file = new Blob([data.pluginMessage.yaml[i]], { type: 'application/yaml' });
      
              zip.file(fileName.concat(".fx.yaml"),file);
            }
            zip.generateAsync({type:"blob"}).then(function(content){
              saveAs(content,"exported.zip");
            });
          }
          return;
        }
      }
    }
  });


  const onCreate = (type: string) => {
    if (type == "exportYaml") parent.postMessage({ pluginMessage: { type: 'export' } }, '*');
    if(type == "tempVac") parent.postMessage({ pluginMessage: { type: 'tempVac' } }, '*');
    if(type == "tempLeg") parent.postMessage({ pluginMessage: { type: 'tempLeg',importPNG, redesignPNG,exportPNG,movePNG } }, '*');
  };

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
      setSelectedValue(data.value);
      if (data.value == "canvas") {
        setSelectedHelperContent("");
        if (value == "yaml") {
          setSelectedContent("yamlcontent")
        } else {
          setSelectedContent("jsoncontent");
        }
      } else if(data.value == "flow") {
        setSelectedHelperContent("");
        setSelectedContent("flow")
      } else if (data.value == "helper") {
        setSelectedContent("");
        setSelectedHelperContent("template");
      } else {
        setSelectedContent("");
        setSelectedHelperContent("");
        setSelectedDrivenContent("driven")
      }
  };

  const onOptionChange = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData) => {
    setValue(data.value);

    if (data.value == "yaml") {
      setSelectedContent("yamlcontent")
      return;
    }
    setSelectedContent("jsoncontent");
  }

  const Horizontal = () => (
    <RadioGroup className='header2' value={value} layout="horizontal" onChange={onOptionChange}>
      <Radio value="json" label="JSON" />
      <Radio value="yaml" label="YAML" />
    </RadioGroup>
  );

  const Canvas = React.memo(() => (
    <div id='canvas' role="tabpanel" aria-labelledby="Canvas">
      <div id='action' className='header'>
        <Title1 id='action'>ACTION</Title1>
        <Horizontal />
      </div>
    </div>
  ));

  const Driven = React.memo(() => (
    <div id='flow' role="tabpanel" aria-labelledby="Model Driven">
      <br/>
      <XMLContent/>
    </div>
  ));

  const Helper = React.memo(() => (
    <div id='helper' role="tabpanel" aria-labelledby="Helper">
      <div id='action' className='header'>
      </div>
    </div>
  ));

  const TemplateContent = React.memo(() => (
    <div id='template'>
      <Subtitle1 id='content2'>Canvas Template - Vacation</Subtitle1>
      <Image id='logo' className='img2' src={vacation} height={140} width={235} />
      <Button appearance="primary" onClick={() => onCreate("tempVac")}>Select</Button>
      <br />
      <Subtitle1 id='content2'>How to Use</Subtitle1>
      <Subtitle1 id='dscr2'>Click and see functionality<br/> of the plugin</Subtitle1>
      <Button appearance="primary" id='submit' onClick={() => onCreate("tempLeg")}>Select</Button>
    </div>
  ));

  const FlowContent = React.memo(() => (
    <div id='flowcontent'>
      <Subtitle1 id='content'>Import definition.json file</Subtitle1>
      <br />
      <br />
      <Button appearance="primary" id='files' onClick={() => flowPicker.openFilePicker()}>Add File</Button>
    </div>
  ));

  const JSONContent = React.memo(() => (
    <div id='jsoncontent'>
      <Subtitle1 id='content'>Import the File(s)</Subtitle1>
      <br />
      <br />
      <Button appearance="primary" id='files' onClick={() => jsonPicker.openFilePicker()}>Add File(s)</Button>
    </div>
  ));

  const YamlContent = React.memo(() => (
    <div id='yamlcontent'>
      <Subtitle1 id='content'>Import the File(s)</Subtitle1>
      <br />
      <br />
      <Button appearance="primary" id='files' onClick={() => yamlPicker.openFilePicker()}>Add File(s)</Button>
      <br />
      <br />
      <br />
      <Subtitle1 id='content'>Export selected Frame(s)</Subtitle1>
      <br />
      <br />
      <Button appearance="primary" onClick={() => onCreate("exportYaml")}>Export</Button>
    </div>
  ));

  const XMLContent = React.memo(() => (
    <div id='xmlcontent'>
      <Subtitle1 id='content'>Import the File(s)</Subtitle1>
      <br />
      <br />
      <Button appearance="primary" id='files' onClick={() => drivenPicker.openFilePicker()}>Add File(s)</Button>
    </div>
  ));
    const Flow = React.memo(() => (
      <div id='flow' role="tabpanel" aria-labelledby="Flow">
        <br/>
        <FlowContent/>
      </div>
    ));

  
    return (
      <div id='upper'>
        <div className='middle'>
          <Image className='img' src={logo} height={50} />  
          <br/>
          <br/>
          <Label id='lbl' size='medium'>Make a Customer design by one click</Label>
        </div>
        <br/>
        <TabList id='tab' defaultSelectedValue="Canvas" selectedValue={selectedValue} onTabSelect={onTabSelect}>
            <Tab id='Canvas' value="canvas">Canvas</Tab>
            <Tab id='Driven' value="driven">Model Driven</Tab>
            <Tab id='Flow' value="flow">Flow</Tab>
            <Tab id='Helper' value="helper">Helper</Tab>
        </TabList>

        <div>
          {selectedValue === "canvas" && <Canvas />}
          {selectedValue === "driven" && <Driven />}
          {selectedValue === "flow" && <Flow />}
          {selectedValue === "helper" && <Helper />}
        </div>

        <div>
        {selectedContent === "flowcontent" && <FlowContent />}
        {selectedContent === "jsoncontent" && <JSONContent />}
        {selectedContent === "yamlcontent" && <YamlContent />}
        {selectedDrivenContent === "xmlcontent" && <XMLContent />}
        </div>

        <div>
          {selectedHelperContent === "template" && <TemplateContent />}
        </div>

        <div id='footer'>
          <Subtitle1 id='footerText'>developed 2024 </Subtitle1>
          <Subtitle1 id='footerText2'>version 0.3</Subtitle1>
        </div>
    </div>
    );
  }
  
export default App;