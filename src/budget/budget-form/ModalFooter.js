// @flow

import React from 'react';

type Props = {
    title: string
};

export default function ModalFooter(props: Props) {
    return (
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
                Close
            </button>
            <button type="button" className="btn btn-primary">
                Save changes
            </button>
        </div>
    );
}
