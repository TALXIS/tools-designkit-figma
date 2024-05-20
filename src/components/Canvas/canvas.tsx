import { Radio, RadioGroup, RadioGroupOnChangeData, Title1 } from "@fluentui/react-components";
import React, { PropsWithChildren } from "react";


type Props = PropsWithChildren<{
    value: string,
    onOptionChange: (ev: React.FormEvent<HTMLDivElement>, data: RadioGroupOnChangeData) => void
}>;

export default function Canvas ({
    value,onOptionChange
}: Props ) {
    return (
        <div id='canvas' role="tabpanel" aria-labelledby="Canvas">
            <div id='action' className='header'>
                <Title1 id='action'>ACTION</Title1>
                <RadioGroup className='header2' value={value} layout="horizontal" onChange={onOptionChange}>
                    <Radio value="msapp" label="MSAPP" />
                    <Radio value="yaml" label="YAML" />
                </RadioGroup>
            </div>
        </div>
    )
}