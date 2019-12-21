import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
	state = {
		email: '',
		password: '',
		errors: {}
	};

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/setting');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/setting');
		}

		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = (e) => {
		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData);
	};

	render() {
		const { errors } = this.state;

		return (
			<div className="auth-box">
				<div className="container">
					<div className="auth-center">
						<div className="auth-item">
							<div className="input-fields">
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
							</div>
							<button className="btn-large" onClick={this.onSubmit}>
								Login
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: propTypes.func.isRequired,
	auth: propTypes.object.isRequired,
	errors: propTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
