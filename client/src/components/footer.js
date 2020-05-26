import React from "react";
import {Link} from "react-router-dom";

const linkStyle = {
    fontSize: "20px",
    marginRight: "2rem",
}
function Footer(){

    return(
        <nav className="navbar navbar-expand navbar-dark bg-dark" style={{borderTopLeftRadius: "25px", borderTopRightRadius: "25px"}}>
            <div className="navbar-nav mr-auto">
                <li className="nav-item" style={{marginLeft:"13rem"}}>
                    <Link to="/" className="nav-link" style={linkStyle}>Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link" style={linkStyle}>About us</Link>
                </li>
                <li className="nav-item">
                    <Link to="/categories" className="nav-link" style={linkStyle}>Categories</Link>
                </li>
                <li className="nav-item">
                    <Link to="/authors" className="nav-link" style={linkStyle}>Authors</Link>
                </li>
                <li className="nav-item">
                    <Link to="/terms" className="nav-link" style={linkStyle}>Terms &amp; Conditions</Link>
                </li>

            </div>
        </nav>
    )
}

export default Footer;