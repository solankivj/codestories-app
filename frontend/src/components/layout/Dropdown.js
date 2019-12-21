import React, { Component } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiSettings, FiPower } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default class Dropdown extends Component {
	state = {
		showMenu: false
	};

	handleShowMenu = () => {
		this.setState(
			{
				showMenu: true
			},
			() => {
				document.addEventListener('click', this.closeMenu);
			}
		);
	};

	closeMenu = (event) => {
		if (!this.dropdownMenu.contains(event.target)) {
			this.setState({ showMenu: false }, () => {
				document.removeEventListener('click', this.closeMenu);
			});
		}
	};

	render() {
		return (
			<div className="dropdown-container">
				<img onClick={this.handleShowMenu} src={this.props.img} alt="user-img" />
				{this.state.showMenu ? (
					<div
						className="menu"
						ref={(element) => {
							this.dropdownMenu = element;
						}}
					>
						<Link to={`/@${this.props.handle}`}>
							<div className="dropdown-item">
								<FaUserCircle />
								<span>
									{this.props.name}
									<br />
									<small>My Profile</small>
								</span>
							</div>
						</Link>

						<div className="dropdown-divider" />
						<div className="dropdown-item" onClick={this.props.logout}>
							<FiPower className="setting-svg" />
							<span>Log out</span>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}
