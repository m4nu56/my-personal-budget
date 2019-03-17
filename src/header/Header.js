import React from 'react';
import './header.css';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <div>
            <nav className="navbar navbar-default">
                <div className="navbar-header">
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to="/analyze" className="navbar-brand">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/mouvement">Mouvements</Link>
                        </li>
                        <li>
                            <Link to="/mouvement/import">Import</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
