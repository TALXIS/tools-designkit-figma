import { Button, Subtitle1 } from "@fluentui/react-components";
import React from "react";
import { PropsWithChildren } from "react";
import { FilePickerReturnTypes } from "use-file-picker/types";

type Props = PropsWithChildren<{
    yamlPicker: FilePickerReturnTypes<string, unknown>
}>;


function onCreate(): void {
    parent.postMessage({ pluginMessage: { type: 'export' } }, '*');
}


export default function YamlContent ({
    yamlPicker
}: Props ) {
    return (
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
            <Button appearance="primary" onClick={() => onCreate()}>Export</Button>
      </div>
    )
}