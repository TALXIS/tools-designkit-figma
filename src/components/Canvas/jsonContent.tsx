import { Button, Subtitle1 } from "@fluentui/react-components";
import React from "react";
import JSZip from 'jszip';

function fileCheck(event:any) {
    const file = event.target.files[0];
    var zip = new JSZip();
    zip.loadAsync(file).then(async function (zip) {
        const files = Object.keys(zip.files);
        const fileValues = Object.values(zip.files);

        const filesContent: String[] = [];
        let fileProperty = "";
        for (let index = 0; index < files.length; index++) {
            const element = files[index];

            if(element.includes("Properties.json")) {
                const val = fileValues[index];
                const f = zip.file(val.name);
                if(f != undefined) {
                    fileProperty = await f.async("string");
                    continue;
                }
            }
                if(element.includes("Controls")) {
                const val = fileValues[index];
                if(val.name.includes('Controls'+ '\\' + '1.json')) continue;
                const f = zip.file(val.name);
                if(f != undefined) {
                    const content = await f.async("string");
                    filesContent.push(content);
                }
            }
        }
        if(filesContent.length == 0) {
            parent.postMessage({ pluginMessage: { type: 'notfound',message: 'definition.json not found!' } }, '*');
            return;
        } 
        parent.postMessage({ pluginMessage: { type: 'import-json', filesContent,fileProperty } }, '*');
    });
}

export default function JSONContent () {
    return (
        <div id='jsoncontent'>
        <Subtitle1 id='content'>Import the File(s)</Subtitle1>
        <br />
        <br />
        <label htmlFor="filePicker" className="custom-file-upload">+ADD FILE</label>
        <input type="file" id="filePicker" accept=".msapp" onChange={(event) => {fileCheck(event);}} />
      </div>
    )
}