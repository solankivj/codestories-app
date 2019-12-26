import axios from 'axios';
import { GET_POSTS, GET_POST, CLEAR_POST } from './types';

// Add Post
export const addPost = (postData) => (dispatch) => {
	return axios
		.post('/api/post', postData)
		.then((res) =>
			dispatch(getPosts())
		)
		.catch((err) => {
      // TODO: Handle Error
      console.log(err)
    });
};

// Add Comment
export const addComment = (postID, commentData) => (dispatch) => {
	return axios
		.post(`/api/post/comment/${postID}`, commentData)
		.then((res) =>
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		)
		.catch((err) => {
      // TODO: Handle Error
      console.log(err)
    });
};

// Get Posts
export const getPosts = () => (dispatch) => {
	return axios
		.get('/api/post')
		.then((res) =>
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		)
		.catch((err) => {
      // TODO: Handle Error
      console.log(err)
    });
};

// Get Posts By ID
export const getPost = (id, clear) => (dispatch) => {
  if(!clear) {
    dispatch(clearPost())
  }
	return axios
		.get(`/api/post/${id}`)
		.then((res) =>
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		)
		.catch((err) => {
      // TODO: Handle Error
      console.log(err)
    });
};

// Add like
export const addLike = (id, fetchSingle) => (dispatch) => {
	return axios.post(`/api/post/like/${id}`).then((res) => {
    if(fetchSingle) {
      dispatch(getPost(id, true))
    } else {
      dispatch(getPosts())
    }
  }).catch((err) => {
    // TODO: Handle Error
    console.log(err)
  });
};

// Remove like
export const removeLike = (id,fetchSingle) => (dispatch) => {
	return axios.post(`/api/post/unlike/${id}`).then((res) => {
    if(fetchSingle) {
      dispatch(getPost(id, true))
    } else {
      dispatch(getPosts())
    }
  }).catch((err) => {
    // TODO: Handle Error
    console.log(err)
  });
};

// Clear Post
export const clearPost = () => {
	return {
		type: CLEAR_POST
	};
};