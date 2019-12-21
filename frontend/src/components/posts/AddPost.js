import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../store/actions/postActions';

class AddPost extends Component {
	state = {
		text: '',
		errors: {},
		showTextBox: false
	};

	onSubmit = (e) => {
		e.preventDefault();

		const { user } = this.props.auth;
		const newPost = {
			text: this.state.text,
			id: user.id
		};

		this.props.addPost(newPost);
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

	handleshowTextBox = () => {
		this.setState(
			{
				showTextBox: true
			},
			() => {
				document.addEventListener('click', this.closeTextBox);
			}
		);
	};

	closeTextBox = (event) => {
		if (!this.OgTextBox.contains(event.target)) {
			this.setState({ showTextBox: false }, () => {
				document.removeEventListener('click', this.closeTextBox);
			});
		}
	};

	render() {
		return (
			<div>
				<div className="story-container">
					<div className="dummyTextBox">
						<div className="textbox-container">
							{!this.state.showTextBox ? (
								<div onClick={this.handleshowTextBox} className="dummyTextContainer">
									<p>Share your story!</p>
								</div>
							) : (
								<form
									onSubmit={this.onSubmit}
									className="originalTextBox"
									ref={(element) => {
										this.OgTextBox = element;
									}}
								>
									<textarea
										name="text"
										id=""
										cols="30"
										rows="5"
										value={this.state.text}
										onChange={this.onChange}
										placeholder="Share your story!"
										autofocus
									/>
									<div className="share-post-btn">
										<button type="submit">Share</button>
									</div>
								</form>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AddPost.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { addPost })(AddPost);
