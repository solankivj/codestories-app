import React, { Component } from 'react';
import PostItem from './PostItem';

export default class PostFeed extends Component {
	render() {
		return (
			<div>{this.props.posts ? this.props.posts.map((post) => <PostItem key={post._id} post={post} />) : []}</div>
		);
	}
}
