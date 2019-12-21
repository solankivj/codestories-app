import React, { Component } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		password2: '',
		errors: {}
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = (e) => {
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerUser(newUser, this.props.history);
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/setting');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	render() {
		const { errors } = this.state;

		return (
			<div>
				<div className="auth-box">
					<div className="container">
						<div className="auth-center">
							<div className="auth-item">
								<div className="input-fields">
									<div className="input-items">
										<label htmlFor="name">Name</label>
										<input
											type="text"
											placeholder="Name"
											name="name"
											id="name"
											onChange={this.onChange}
											value={this.state.name}
										/>
										{errors.name ? <div style={{ color: 'red' }}>{errors.name}</div> : null}
									</div>
									<div className="input-items">
										<label htmlFor="email">Email</label>
										<input
											type="text"
											id="email"
											placeholder="Email"
											name="email"
											value={this.state.email}
											onChange={this.onChange}
										/>
										{errors.email ? <div style={{ color: 'red' }}>{errors.email}</div> : null}
									</div>
									<div className="input-items">
										<label htmlFor="password">Password</label>
										<input
											type="password"
											id="password"
											placeholder="Password"
											name="password"
											value={this.state.password}
											onChange={this.onChange}
										/>
										{errors.password ? <div style={{ color: 'red' }}>{errors.password}</div> : null}
									</div>
									<div className="input-items">
										<label htmlFor="password2">Confirm Password</label>
										<input
											type="password"
											placeholder="Confirm Password"
											name="password2"
											id="password2"
											onChange={this.onChange}
											value={this.state.password2}
										/>
										{errors.password2 ? (
											<div style={{ color: 'red' }}>{errors.password2}</div>
										) : null}
									</div>
								</div>

								<button className="btn-large" onClick={this.onSubmit}>
									Register
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: propTypes.func.isRequired,
	auth: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
