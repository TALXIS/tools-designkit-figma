import React from 'react';
import '../styles/ui.css';
import { useId, Button,PositioningProps, Subtitle1,Image,Label,Input,Tab, TabList,TabValue, SelectTabEvent, SelectTabData, Table, 
  TableBody, TableRow, TableCell, Checkbox, Title1,RadioGroup,Radio,RadioGroupOnChangeData } from '@fluentui/react-components';

import type { CheckboxProps } from "@fluentui/react-components";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useFilePicker } from 'use-file-picker';

const logo: string = require("../assets/Logo.png").default;
const vacation: string = require("../assets/vacation.png").default;
const importPNG: string = require("../assets/import.png").default;
const redesignPNG: string = require("../assets/redesign.png").default;
const exportPNG: string = require("../assets/export.png").default;
const movePNG: string = require("../assets/move.png").default;

function App(props: PositioningProps) {
  const snippetId = useId("input-snippet");
  const pageId = useId("input-page");

  const [selectedValue, setSelectedValue] = React.useState<TabValue>("canvas");

  const [value, setValue] = React.useState("json");
  const [selectedContent, setSelectedContent] = React.useState("jsoncontent");
  const [selectedHelperContent, setSelectedHelperContent] = React.useState("");

  const flowPicker = useFilePicker({
    accept: '.json',
    onFilesSelected: ({ filesContent }) => {
      parent.postMessage({ pluginMessage: { type: 'import-flow', filesContent } }, '*');
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


        if(data.pluginMessage.type == "png") {
          fetch(data.pluginMessage.url)
            .then(response => response.blob())
            .then(blob => {
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "export.png";
              link.click();
              URL.revokeObjectURL(link.href);
          })
          return;
        }
        let xmls = data.pluginMessage.xml;
  
        if(xmls.length == 1) {
          const xml = xmls[0];
          const file = new Blob([xml.file], { type: 'application/xml' });
          let link = document.createElement('a');
          link.target = '_blank';
          link.href = window.URL.createObjectURL(file);
          
          link.setAttribute("download", xml.name);
          link.click();
          URL.revokeObjectURL(link.href);
        } else {
          var zip = new JSZip();
          for (let i = 0; i < xmls.length; i++) {
            const xml = xmls[i];
            const file = new Blob([xml.file], { type: 'application/xml' });
    
            zip.file(xml.name.concat(".xml"),file);
          }
          zip.generateAsync({type:"blob"}).then(function(content) {
            saveAs(content,"exported.zip");
          });
        }
      }

    }
  });

  const Checked = () => {
    const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(true);
    return (
      <Checkbox
        checked={checked}
        onChange={(ev, data) => setChecked(data.checked)}
        label="Start"
      />
    );
  };
  const Checked1 = () => {
    const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(true);
    return (
      <Checkbox
        checked={checked}
        onChange={(ev, data) => setChecked(data.checked)}
        label="Obchod"
      />
    );
  };
  const Checked2 = () => {
    const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(true);
    return (
      <Checkbox
        checked={checked}
        onChange={(ev, data) => setChecked(data.checked)}
        label="Smlouvy"
      />
    );
  };
  const Checked3 = () => {
    const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(true);
    return (
      <Checkbox
        checked={checked}
        onChange={(ev, data) => setChecked(data.checked)}
        label="Real Estate"
      />
    );
  };
  const Checked4 = () => {
    const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(true);
    return (
      <Checkbox
        checked={checked}
        onChange={(ev, data) => setChecked(data.checked)}
        label="Telefonní systém"
      />
    );
  };

  const onCreate = (type: string) => {
    if (type == "exportYaml") parent.postMessage({ pluginMessage: { type: 'export' } }, '*');
    if(type == "tempVac") parent.postMessage({ pluginMessage: { type: 'tempVac' } }, '*');
    if(type == "tempLeg") parent.postMessage({ pluginMessage: { type: 'tempLeg',importPNG, redesignPNG,exportPNG,movePNG } }, '*');

    if(type == "exportMD") parent.postMessage({ pluginMessage: { type: 'export-xml' } }, '*');
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
        setSelectedHelperContent("");
        setSelectedContent("export")
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

  const Import = React.memo(() => (
      <div id='imp' role="tabpanel" aria-labelledby="Import">
         <Label htmlFor={snippetId}>Snippet link *</Label>
        <Input appearance='outline' id={snippetId} />
        <br/>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
               <Label htmlFor={pageId}>Workspace code *</Label>
                <Input appearance='outline' id={pageId} />
              </TableCell>
              <TableCell>
               <Label htmlFor={pageId}>Customer logo</Label>
              </TableCell>
            </TableRow>
          </TableBody>
          </Table>
        <br />
        <Label htmlFor={pageId}>Customer colours *</Label>
        <Label htmlFor={pageId}>Modules *</Label>

        <Checked />
        <Checked1 />
        <Checked2 />
        <Checked3 />
        <Checked4 />
        <br />
        <Button appearance="primary" onClick={() => onCreate("importMD")}>SUBMIT</Button>
      </div>
    ));

    const Export = React.memo(() => (
      <div id='exp' role="tabpanel" aria-labelledby="Export">
        {/* <Label htmlFor={snippetId}>Snippet link *</Label>
        <Input appearance='outline' id={snippetId} />
        <br/>
        <Label htmlFor={pageId}>Page ID *</Label>
      <Input appearance='outline' id={pageId} /> */}
        <Label id='lbl2' size='medium'>Please select a Frame to be exported</Label>
        <br />
        <Button appearance="primary" onClick={() => onCreate("exportMD")}>SUBMIT</Button>
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
            {/* <Tab id='Import' value="import">Import</Tab> */}
            <Tab id='Canvas' value="canvas">Canvas</Tab>
            <Tab id='Export' value="export">Model Driven</Tab>
            <Tab id='Flow' value="flow">Flow</Tab>
            <Tab id='Helper' value="helper">Helper</Tab>
        </TabList>

        <div>
          {selectedValue === "canvas" && <Canvas />}
          {selectedValue === "export" && <Export />}
          {selectedValue === "flow" && <Flow />}
          {selectedValue === "helper" && <Helper />}
        </div>

        <div>
        {selectedContent === "flowcontent" && <FlowContent />}
        {selectedContent === "jsoncontent" && <JSONContent />}
        {selectedContent === "yamlcontent" && <YamlContent />}
        </div>

        <div>
          {selectedHelperContent === "template" && <TemplateContent />}
        </div>

        <div id='footer'>
          <Subtitle1 id='footerText'>developed 2024 </Subtitle1>
          <Subtitle1 id='footerText2'>version 0.2</Subtitle1>
        </div>
    </div>
    );
  }
  
export default App;