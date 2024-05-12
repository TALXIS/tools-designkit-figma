import { Button, Subtitle1 } from "@fluentui/react-components";
import React, { PropsWithChildren } from "react";
import { exportPNG, importPNG, movePNG, redesignPNG } from "../consts";

type Props = PropsWithChildren<{
    vacation: string
}>;

function onCreate(type: string): void {
    if(type == "tempVac") parent.postMessage({ pluginMessage: { type: 'tempVac' } }, '*');
    if(type == "tempLeg") parent.postMessage({ pluginMessage: { type: 'tempLeg',importPNG, redesignPNG,exportPNG,movePNG } }, '*');
}

export default function CanvasHelper ({
    vacation
}: Props ) {
    return (
        <div id='template'>
            <Subtitle1 id='content2'>Canvas Template - Vacation</Subtitle1>
            <img id='logo' className='img2' src={vacation} height={140} width={235} />
            <Button appearance="primary" onClick={() => onCreate("tempVac")}>Select</Button>
            <br />
            <Subtitle1 id='content2'>How to Use</Subtitle1>
            <Subtitle1 id='dscr2'>Click and see functionality<br/> of the plugin</Subtitle1>
            <Button appearance="primary" id='submit' onClick={() => onCreate("tempLeg")}>Select</Button>
        </div>
    )
}