import { Button, Input, Label, Subtitle1 } from "@fluentui/react-components";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
    m365Token: string,
    m365SiteID: string,
    m365Path: string
}>;

function onCreate(): void {
    const m365T = document.getElementsByName("m365token")[0].getAttribute("value");
    const m365S = document.getElementsByName("m365siteid")[0].getAttribute("value");
    const m365P = document.getElementsByName("m365path")[0].getAttribute("value");
    parent.postMessage({ pluginMessage: { type: 'doc',m365T,m365S,m365P } }, '*');
}

export default function Export({
    m365Token,m365SiteID,m365Path
}: Props) {
    return (
        <div id='exports' role="tabpanel" aria-labelledby="Export">
        <br/>
            <div id='exportcontent'>
                <Subtitle1 id='content2'>Upload selected Frames to Sharepoint</Subtitle1>
                <br/>
                <Label id='subheading' htmlFor={m365Token}>Auth Token*</Label>
                <Input name='m365token' type='password' appearance='outline' id={m365Token} />
                <br/>
                <Label id='subheading' htmlFor={m365SiteID}>SiteId or SharePoint Hostname*</Label>
                <Input name='m365siteid' type='text' appearance='outline' id={m365SiteID} />
                <br/>
                <Label id='subheading' htmlFor={m365Path}>Folder Path*</Label>
                <Input name='m365path' type='text' appearance='outline' id={m365Path} />
                <br/>
                <br/>
                <Button id='buttonE' appearance='primary' onClick={() => onCreate()}>UPLOAD</Button>
            </div>
        </div>
    )
}
