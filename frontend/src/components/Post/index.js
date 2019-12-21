import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../store/actions/postActions';
import AddComment from './AddComment';
import AllComment from './AllComment';

class Post extends Component {
	componentDidMount() {
		const postId = this.props.match.params.id;

		this.props.getPost(postId);
	}

	render() {
		const { post } = this.props.post;
		const { comments } = this.props.post.post ? this.props.post.post : [];
		return (
			<div>
				<p>{post.text}</p>
				<strong>
					<p>Post By {post.name}</p>
				</strong>
				<AddComment postID={post._id} />

				{comments ? (
					comments.map((comment) => <AllComment postID={post._id} key={comment._id} comment={comment} />)
				) : (
					<h1>Loading Comment</h1>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
