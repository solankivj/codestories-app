import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../icons/logo";

class Navbar extends Component {
	render() {
    
		return (
			<header className="header">
        <nav className="navbar">
          <Link to="/">
            <Logo />
          </Link>
        </nav>
			</header>
		);
	}
}

export default Navbar;