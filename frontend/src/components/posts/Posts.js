import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostBox from './PostBox';
import { getPosts } from '../../store/actions/postActions';
import PostFeed from './PostFeed';

class Posts extends Component {
  state = {
    loading: false
  }

	componentDidMount() {
    this.setState({
      loading: true
    })
		this.props.getPosts().then(() => {
      this.setState({
        loading: false
      })
    })
	}

	render() {
    const { posts } = this.props.post;
    const { loading } = this.state;

    let postContent;
    
		if (posts === null || loading) {
			postContent = <div>Loading....</div>;
		} else {
			postContent = <PostFeed posts={posts} />;
		}

		return (
      <div className="section">
        <PostBox img={this.props.auth.user.avatar} />
        {postContent}
      </div>
    );
	}
}

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);
