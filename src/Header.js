import React from "react";
import './header.css';

export default function Header(props) {
    return (
        <nav className="site-header sticky-top py-1">
            <div className="container d-flex flex-column flex-md-row justify-content-between">
                <a className="py-2" href="#">Home</a>
                <a className="py-2 d-none d-md-inline-block" href="#">Budget</a>
            </div>
        </nav>
    );
}