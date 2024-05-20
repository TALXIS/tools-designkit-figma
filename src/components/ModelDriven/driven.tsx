import { Button, Checkbox, CheckboxOnChangeData, Input, Label, Subtitle1, Textarea } from "@fluentui/react-components";
import React, { ChangeEvent, PropsWithChildren } from "react";
import { ColoredLine2 } from "../UI/uiComps";
import JSZip from "jszip";

type Props = PropsWithChildren<{
    mockarooValue: boolean,
    onChecked: (ev: ChangeEvent<HTMLInputElement>, data: CheckboxOnChangeData) => void,
    grid: string,
    apikey: string,
    language: string,
    endpoint: string,
    output: string
}>;

function fileCheck(event:any) {
    const file = event.target.files[0];
    var zip = new JSZip();
    zip.loadAsync(file).then(async function (zip) {
        const f = zip.file("customizations.xml");
        if(f == undefined || null) {
            parent.postMessage({ pluginMessage: { type: 'notfound' } }, '*');
            return;
        }

        const data = await f.async("string");
        parent.postMessage({ pluginMessage: { type: 'import-xml',data } }, '*');
    });
}

function onCreate(type: string): void {
    if(type == "grid") {
        const data = document.getElementsByName("grid")[0].innerHTML;
        parent.postMessage({ pluginMessage: { type: 'grid',data } }, '*');
      }
      if(type == "mockaroo") {
        const apiVal = document.getElementsByName("key")[0].getAttribute("value");
        const endVal = document.getElementsByName("endpoint")[0].getAttribute("value");
        const langVal = document.getElementsByName("language")[0].innerText;
        const outVal = document.getElementsByName("output")[0].innerText;
        parent.postMessage({ pluginMessage: { type: 'mockaroo',apiVal,endVal,langVal,outVal } }, '*');
      }
}



export default function Driven ({
    mockarooValue,onChecked,grid,apikey,language,endpoint,output
}: Props) {

    return (
        <div id='flow' role="tabpanel" aria-labelledby="Model Driven">
            <br/>
            <div id='xmlcontent'>
                <Subtitle1 id='content'>Import the Solution ZIP File</Subtitle1>
                <br />
                <label htmlFor="filePicker" className="custom-file-upload">+ADD FILE</label>
                <input type="file" id="filePicker" accept=".zip" onChange={(event) => {fileCheck(event);}} />
                <br />
                <ColoredLine2 color="#C2C8D7" />
                <Subtitle1 id='content'>Fake Data Generator</Subtitle1>
                <br />
                <Checkbox checked={mockarooValue} label="Mockaroo API" onChange={onChecked} />
                <br />
                {mockarooValue === false && (
                    <span>
                    <Subtitle1 id='content'>Import JSON data for Grid</Subtitle1>
                    <Textarea id={grid} appearance='outline' className='grid' name='grid' />
                    <br />
                    <br />
                    <Button appearance="primary" onClick={() => onCreate("grid")}>GENERATE</Button>
                    </span>
                )}
                {mockarooValue === true && (
                    <div id='gitcontent'>
                        <div id='gitcontent2'>
                        <div className='col-2'>
                            <Label id='subheading' htmlFor={apikey}>X-API-KEY *</Label>
                            <Input className='inp' name='key' type='password' appearance='outline' id={apikey} />
                        </div>
                        <div className='col-2'>
                            <Label id='subheading' htmlFor={language}>Language *</Label>
                            <select name='language' style={{ minWidth: '166px' , minHeight: '32px',borderColor: '#C6C6C6 #C6C6C6 #616161 #C6C6C6', borderRadius:'5px' }} aria-labelledby={language} defaultValue="en-US">
                            <option>en-US</option>
                            <option>en-GB</option>
                            <option>cs-CZ</option>
                            </select>
                        </div>
                        </div>
                        <div id='gitcontent2'>
                        <div className='col-2'>
                            <Label id='subheading' htmlFor={endpoint}>Endpoint *</Label>
                            <Input name='endpoint' className='inp' type='text' appearance='outline' id={endpoint} />
                            </div>
                            <div className='col-2'>
                            <Label id='subheading' htmlFor={output}>Output *</Label>
                            <select name='output' style={{ minWidth: '166px', minHeight: '32px',borderColor: '#C6C6C6 #C6C6C6 #616161 #C6C6C6', borderRadius:'5px' }} aria-labelledby={output} defaultValue="View">
                                <option>View</option>
                                <option>Form</option>
                            </select>    
                        </div>
                        </div>
                        <br />
                        <Button appearance="primary" onClick={() => onCreate("mockaroo")}>GENERATE</Button>
                    </div>
                )}
            </div>
        </div>
    )
}