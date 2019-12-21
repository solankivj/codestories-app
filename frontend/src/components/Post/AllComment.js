import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/postActions';

class AllComment extends Component {
	deleteCommentClick = (commentID, postID) => {
		this.props.deleteComment(postID, commentID);
	};

	render() {
		return (
			<div style={{ background: 'pink', margin: '20px', width: '300px' }}>
				<p>{this.props.comment.text}</p>
				<p>Comment BY : {this.props.comment.name}</p>
				{this.props.auth.user.id === this.props.comment.user ? (
					<button
						onClick={() => this.deleteCommentClick(this.props.comment._id, this.props.postID)}
						style={{ background: 'red', color: 'white' }}
					>
						Delete Comment
					</button>
				) : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(AllComment);
