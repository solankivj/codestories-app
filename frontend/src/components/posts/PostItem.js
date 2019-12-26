import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BeenThereBtn from "../Post/BeenThereBtn";

class PostItem extends Component {

  isPostLikedByUser = () => {
    const { likes } = this.props.post;
    return likes.filter((like) => like.user === this.props.auth.user.id).length > 0
  }


	render() {
    const { post, fetchSingle } = this.props;
    const noOfLikesByOther = post.likes.filter(like => like.user !== this.props.auth.user.id).length;

    const likedByUserText = this.isPostLikedByUser() ? `You${noOfLikesByOther === 0 ? `'ve been there` : ` and `} ` : "";
    const likedByOtherText = noOfLikesByOther > 0 ? `${noOfLikesByOther} others been there.` : "";

		return (
			<div className="post-item">
				<div className="post-container">
					<div className="post-info">
            <p className="highlight">
              {`${likedByUserText}${likedByOtherText}`}
            </p>
						<Link to={`/post/${post._id}`} className="post-text">
							{post.text}
						</Link>
						<div className="post-action">
              <BeenThereBtn fetchSingle={fetchSingle} likes={post.likes} id={post._id} />
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

export default connect(mapStateToProps, {})(PostItem);
