import { Button, Subtitle1 } from "@fluentui/react-components";
import React, { PropsWithChildren } from "react";
import { FilePickerReturnTypes } from "use-file-picker/types";

type Props = PropsWithChildren<{
    flowPicker: FilePickerReturnTypes<string, unknown>
}>;

export default function Flow({
    flowPicker
    }: Props) {
    return (
        <div id='flow' role="tabpanel" aria-labelledby="Flow">
            <br/>
            <div id='flowcontent'>
                <Subtitle1 id='content'>Import definition.json file</Subtitle1>
                <br />
                <br />
                <Button appearance="primary" id='files' onClick={() => flowPicker.openFilePicker()}>+ ADD FILE</Button>
            </div>
        </div>
    )
}