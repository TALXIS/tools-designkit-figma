import React, { ChangeEvent } from 'react';
import '../styles/ui.css';
import { logo, vacation } from './consts';
import Canvas from './Canvas/canvas';
import Export from './Export/export';
import Flow from './Flow/flow';
import JSONContent from './Canvas/jsonContent';
import YamlContent from './Canvas/yamlContent';
import Helper from './Helper/helper';
import TemplateContent from './Helper/templateContent';
import Driven from './ModelDriven/driven';

import {PositioningProps, Subtitle1,Image,Label,Tab, TabList,TabValue, SelectTabEvent, SelectTabData,RadioGroupOnChangeData, 
  useId, CheckboxOnChangeData} from '@fluentui/react-components';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useFilePicker } from 'use-file-picker';

function App(props: PositioningProps) {

  const [selectedValue, setSelectedValue] = React.useState<TabValue>("canvas");

  const [value, setValue] = React.useState("msapp");
  const [selectedContent, setSelectedContent] = React.useState("msappcontent");
  const [selectedHelperContent, setSelectedHelperContent] = React.useState("");
  const [mockarooValue, setMockarooValue] = React.useState(false);

  const grid = useId("area-grid");
  const apikey = useId("input-key");
  const endpoint = useId("input-endpoint");
  const language = useId("dropdown-language");
  const output = useId("dropdown-output");

  const m365Token = useId("input-m365-token");
  const m365Path = useId("input-path");
  const m365SiteID = useId("input-siteid");

  const flowPicker = useFilePicker({
    accept: '.json',
    onFilesSelected: ({ filesContent }) => {
      parent.postMessage({ pluginMessage: { type: 'import-flow', filesContent } }, '*');
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

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
      setSelectedValue(data.value);
      if (data.value == "canvas") {
        setSelectedHelperContent("");
        if (value == "yaml") {
          setSelectedContent("yamlcontent")
        } else {
          setSelectedContent("msappcontent");
        }
      } else if(data.value == "flow") {
        setSelectedHelperContent("");
        setSelectedContent("flow")
      } else if (data.value == "helper") {
        setSelectedContent("");
        setSelectedHelperContent("template");
      } else if(data.value == "exports") {
        setSelectedContent("");
        setSelectedHelperContent("");
      } else {
        setSelectedContent("");
        setSelectedHelperContent("");
      }
  };

  const onOptionChange = (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData) => {
    setValue(data.value);

    if (data.value == "yaml") {
      setSelectedContent("yamlcontent")
      return;
    }
    setSelectedContent("msappcontent");
  }

  const onChecked = (ev: ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => {
    const bool = data.checked as boolean;
    setMockarooValue(bool);
  }
    return (
      <div id='upper'>
        <div className='middle'>
        <Label id='heading' size='medium'>DesignKit</Label>
          <Image className='img' src={logo} height={50} />  
          <Label id='subheading' size='medium'>move your Power Apps development on the new level</Label>
        </div>
        <br/>
        <TabList id='tab' defaultSelectedValue="Canvas" selectedValue={selectedValue} onTabSelect={onTabSelect} >
            <Tab id='Canvas' value="canvas">Canvas</Tab>
            <Tab id='Driven' value="driven">Model Driven</Tab>
            <Tab id='Flow' value="flow">Flow</Tab>
            <Tab id='Helper' value="helper">Helper</Tab>
            <Tab id='Exports' value="exports">Export</Tab>
        </TabList>

        <div>
          {selectedValue === "canvas" && <Canvas value={value} onOptionChange={onOptionChange}  />}
          {selectedValue === "driven" && <Driven mockarooValue={mockarooValue} onChecked={onChecked} grid={grid} apikey={apikey} 
            language={language} endpoint={endpoint} output={output} />}
          {selectedValue === "flow" && <Flow flowPicker={flowPicker} />}
          {selectedValue === "helper" && <Helper />}
          {selectedValue === "exports" && <Export m365Token={m365Token} m365SiteID={m365SiteID} m365Path={m365Path} />}
        </div>

        <div>
        {selectedContent === "msappcontent" && <JSONContent />}
        {selectedContent === "yamlcontent" && <YamlContent yamlPicker={yamlPicker} />}
        </div>

        <div>
          {selectedHelperContent === "template" && <TemplateContent vacation={vacation} />}
        </div>

        <div id='footer'>
          <Subtitle1 id='footerText'>developed 2024 </Subtitle1>
          <Subtitle1 id='footerText2'>version 1.2</Subtitle1>
        </div>
    </div>
    );
  }
  
export default App;

