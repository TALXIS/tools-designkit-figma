import React from "react";

export const ColoredLine2 = ({ color }: {color: string}) => (
    <hr
        style={{
            border: '1px dashed ' + color,
            color: color,
            backgroundColor: color,
            height: 0.2,
            width: 333,
            marginTop: 10
        }}
    />
  );