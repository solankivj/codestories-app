import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllComment extends Component {
	deleteCommentClick = (commentID, postID) => {
		this.props.deleteComment(postID, commentID);
	};

	render() {
		return (
			<div className="comment">
        <span className="author">#1816 commented</span>
				<p className="message">{this.props.comment.text}</p>
				<span className="created-at">10.03.17 03:45pm</span>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { })(AllComment);
