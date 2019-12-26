import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, removeLike } from '../../store/actions/postActions';
import BeenThereBtn from "../Post/BeenThereBtn";

class PostItem extends Component {

	onClickLike = (likes, id) => {
		if (likes.filter((like) => like.user === this.props.auth.user.id).length > 0) {
			this.props.removeLike(id);
		} else {
			this.props.addLike(id);
		}
	};

	render() {
		const { post } = this.props;

		return (
			<div className="post-item">
				<div className="post-container">
					<div className="post-info">
            <p className="highlight">You, and 23 others been there.</p>
						<Link to={`/post/${post._id}`} className="post-text">
							{post.text}
						</Link>
						<div className="post-action">
              <BeenThereBtn likes={post.likes} id={post._id} />
							<Link className="comment-btn" to={`/post/${post._id}`}>
								{post.comments.length > 0 ? post.comments.length : 0} Comments
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike })(PostItem);
