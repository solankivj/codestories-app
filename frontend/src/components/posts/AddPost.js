import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import { FaRegSmile } from 'react-icons/fa';
import { Picker, emojiIndex } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class AddPost extends Component {
	state = {
		text: '',
		errors: {},
		emojiPicker: false,
		showTextBox: false
	};

	onSubmit = (e) => {
		e.preventDefault();

		const { user } = this.props.auth;
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar,
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

	handleEmojiPicker = () => {
		this.setState({ emojiPicker: !this.state.emojiPicker });
	};

	colonToUnicode = (message) => {
		return message.replace(/:[A-Za-z0-9_+-]+:/g, (x) => {
			x = x.replace(/:/g, '');
			let emoji = emojiIndex.emojis[x];
			if (typeof emoji !== 'undefined') {
				let unicode = emoji.native;
				if (typeof unicode !== 'undefined') {
					return unicode;
				}
			}
			x = ':' + x + ':';
			return x;
		});
	};

	handleAddEmoji = (emoji) => {
		const oldMessage = this.state.text;
		const newMessage = this.colonToUnicode(`${oldMessage}${emoji.colons}`);
		this.setState({ text: newMessage });
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
						<img className="profile-img" alt="imgF1" src={this.props.img} />
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
									{this.state.emojiPicker && (
										<Picker
											ref={(element) => {
												this.emojiElement = element;
											}}
											set="apple"
											onSelect={this.handleAddEmoji}
											title="Pick Your Emoji"
											emoji="point_up"
										/>
									)}
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
									<FaRegSmile onClick={this.handleEmojiPicker} className="emoji-icon" />
									{/* {this.state.errors.text ? (
										<p style={{ color: 'red' }}>{this.state.errors.text}</p>
									) : null} */}
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
