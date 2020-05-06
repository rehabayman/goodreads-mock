import React from "react";
import {Link} from "react-router-dom";
function Footer(){

    return(
        <nav className="d-flex flex-row flex-wrap justify-content-between align-items-start">
            <Link to="/home">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/authors">Authors</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
        </nav>
    )
}

export default Footer;