import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllComment extends Component {
	deleteCommentClick = (commentID, postID) => {
		this.props.deleteComment(postID, commentID);
	};

	render() {
		return (
			<div style={{ background: 'pink', margin: '20px', width: '300px' }}>
				<p>{this.props.comment.text}</p>
				<p>Comment BY : {this.props.comment.name}</p>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { })(AllComment);
