import React from 'react';
import PostItem from './PostItem';

const PostFeed = ({ posts }) => {
  return (
    <div>
      {posts ? 
        posts.map((post) => <PostItem fetchSingle={false} key={post._id} post={post} />) 
        : []
      }
    </div>
  )
}

export default PostFeed;