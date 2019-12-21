import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';

class AddComment extends Component {
	state = {
		text: '',
		errors: {}
	};

	onSubmit = (e) => {
		e.preventDefault();

		if (!this.props.auth.isAuthenticated) {
			// redirect to login
			window.location.href = '/login';
		}

		const { user } = this.props.auth;
		const { postID } = this.props;

		const newComment = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
			id: user.id
		};

		this.props.addComment(postID, newComment);
		this.setState({
			text: ''
		});
	};

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({ errors: newProps.errors });
		}
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<textarea
						name="text"
						id=""
						cols="30"
						rows="10"
						value={this.state.text}
						onChange={this.onChange}
						placeholder="Add Comment to POST!!!"
					/>
					{this.state.errors.text ? <p style={{ color: 'red' }}>{this.state.errors.text}</p> : null}
					<button type="submit">ADD COMMENT!!</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { addComment })(AddComment);
