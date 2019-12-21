import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, removeLike } from '../../store/actions/postActions';
import { FiMessageSquare, FiMoreVertical } from 'react-icons/fi';

class PostItem extends Component {

	onClickLike = (likes, id) => {
		if (!this.props.auth.isAuthenticated) {
			// redirect to login
			window.location.href = '/login';
		}

		if (likes.filter((like) => like.user === this.props.auth.user.id).length > 0) {
			return this.props.removeLike(id);
		} else {
			this.props.addLike(id);
		}
	};

	render() {
		const { post, auth } = this.props;

		return (
			<div className="post-item">
				<div className="post-container">
					<div className="post-info">
						<div className="user-info">
							<div className="extra">
								{/* <p className="">{moment(post.date).startOf().fromNow()}</p> */}
                Date
							</div>
						</div>
						<Link to={`/post/${post._id}`} className="post-text">
							{post.text}
						</Link>
						<div className="post-action">
							<div className="been-there">
								<button onClick={() => this.onClickLike(post.likes, post._id)}>
									{post.likes.length > 0 ? `${post.likes.length} 👩‍` : ''} Been There
								</button>
							</div>
							<Link className="comment-btn" to={`/post/${post._id}`}>
								<FiMessageSquare className="comment" />
								<span>{post.comments.length > 0 ? post.comments.length : ''}</span>
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
