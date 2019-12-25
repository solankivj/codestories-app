import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike, removeLike } from '../../store/actions/postActions';

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
		const { post } = this.props;

		return (
			<div className="post-item">
				<div className="post-container">
					<div className="post-info">
						<Link to={`/post/${post._id}`} className="post-text">
							{post.text}
						</Link>
						<div className="post-action">
              <button 
                className="been-there" 
                onClick={() => this.onClickLike(post.likes, post._id)}>
                  Been There <span role="img">✋</span>
              </button>
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
