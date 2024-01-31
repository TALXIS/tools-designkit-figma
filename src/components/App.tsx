import React from 'react';
import '../styles/ui.css';
import { DesktopArrowDown20Regular,DesktopArrowRight20Regular} from "@fluentui/react-icons";
import { useId, Button,PositioningProps, Subtitle1,Image,Label,Input,Tab, TabList,TabValue, SelectTabEvent, SelectTabData, Table, TableBody, TableRow, TableCell, Checkbox } from '@fluentui/react-components';

import type { CheckboxProps } from "@fluentui/react-components";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


const logo: string = require("../assets/Logo.png").default;

function App(props: PositioningProps) {
  const snippetId = useId("input-snippet");
  const pageId = useId("input-page");

  React.useEffect(() => {
    window.onmessage = async (event) => {
      let data = event.data.pluginMessage;
      
      
      if(data != undefined) {
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

  const onCreate = () => {
      parent.postMessage({ pluginMessage: { type: 'export-xml' } }, '*');
    };

    const [selectedValue, setSelectedValue] = React.useState<TabValue>("export");
    const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
      setSelectedValue(data.value);
    };

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
        <Button appearance="primary" onClick={onCreate}>SUBMIT</Button>
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
        <Button appearance="primary" onClick={onCreate}>SUBMIT</Button>
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
        <TabList id='tab' defaultSelectedValue="Export" selectedValue={selectedValue} onTabSelect={onTabSelect}>
            {/* <Tab id='Import' icon={<DesktopArrowDown20Regular />} value="import">Import</Tab> */}
            <Tab id='Export' icon={<DesktopArrowRight20Regular />}  value="export">Export</Tab>
        </TabList>

        <div>
          {selectedValue === "import" && <Import />}
          {selectedValue === "export" && <Export />}
        </div>
        <div id='footer'>
          <Subtitle1 id='footerText'>developed 2024 </Subtitle1>
          <Subtitle1 id='footerText2'>version 0.1</Subtitle1>
        </div>
    </div>
    );
  }
  
export default App;