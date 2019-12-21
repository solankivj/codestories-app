import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddPost from './AddPost';
import { getPosts } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions';
import PostFeed from './PostFeed';

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts();
		this.props.getCurrentProfile();
	}

	render() {
		const { posts, loading } = this.props.post;
		let postContent;

		if (posts === null || loading) {
			postContent = <div>LOading....</div>;
		} else {
			postContent = <PostFeed posts={posts} />;
		}

		return (
			<div className="posts-section">
				<div className="container">
					<div className="posts-center">
						<div className="posts-container">
							<div className="section-1">Section 1</div>
							<div className="section-2">
								<AddPost img={this.props.auth.user.avatar} />
								{postContent}
							</div>
							<div className="section-3">Section 2</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Posts);
