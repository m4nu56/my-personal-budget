// @flow

import React from 'react';

type Props = {
    title: string
};

export default function ModalHeader(props: Props) {
    return (
        <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
}
