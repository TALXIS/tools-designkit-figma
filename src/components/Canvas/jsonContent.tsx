import { Button, Subtitle1 } from "@fluentui/react-components";
import React from "react";
import { PropsWithChildren } from "react";
import { FilePickerReturnTypes } from "use-file-picker/types";

type Props = PropsWithChildren<{
    jsonPicker: FilePickerReturnTypes<string, unknown>,
}>;

export default function JSONContent ({
    jsonPicker
}: Props ) {
    return (
        <div id='jsoncontent'>
        <Subtitle1 id='content'>Import the File(s)</Subtitle1>
        <br />
        <br />
        <Button appearance='primary' id='files' onClick={() => jsonPicker.openFilePicker()}>+ ADD FILE(s)</Button>
      </div>
    )
}