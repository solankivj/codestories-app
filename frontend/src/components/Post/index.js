import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../store/actions/postActions';
import CommentBox from './CommentBox';
import Comment from './Comment';

class Post extends Component {

  state = {
    loading: false
  }

	componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({
      loading: true
    })

		this.props.getPost(id).then(() => {
      this.setState({
        loading: false
      })
    })
	}

	render() {
    const { post } = this.props.post;
    const { loading } = this.state;
    const { comments } = post;
    
		return (
			post === null || loading ? (
        <div>
          Loading Post...
        </div>
      ) : (
        <div className="post">
          <p className="message-text">{post.text}</p>
          {comments ? (
            comments.map((comment) => <Comment postID={post._id} key={comment._id} comment={comment} />)
          ) : (
            <h1>Loading Comment</h1>
          )}
          <CommentBox postID={post._id} />
        </div>
      )
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
