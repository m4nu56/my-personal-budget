// @flow

import * as React from 'react';
import './footer.css';

type Props = {
    handleLogout: Function
};

export default function Footer(props: Props) {
    return (
        <footer className="footer">
            <div className="container">
                <span className="text-muted">Place sticky footer content here.</span>
                <button className="btn btn-sm float-right" onClick={props.handleLogout}>
                    Logout
                </button>
            </div>
        </footer>
    );
}
