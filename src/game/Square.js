// @flow

import React from "react";

type Props = {
    onClick: Function,
    value: string
};

function Square(props: Props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;