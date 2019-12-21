import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, GET_POST, POST_LOADING, CLEAR_ERRORS } from './types';

// Add Post
export const addPost = (postData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post('/api/post', postData)
		.then((res) =>
			dispatch({
				type: ADD_POST,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Add Comment
export const addComment = (postID, commentData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post(`/api/post/comment/${postID}`, commentData)
		.then((res) =>
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Get Posts
export const getPosts = () => (dispatch) => {
	dispatch(setPostLanding());
	axios
		.get('/api/post')
		.then((res) =>
			dispatch({
				type: GET_POSTS,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_POSTS,
				payload: null
			})
		);
};

// Get Posts By ID
export const getPost = (id) => (dispatch) => {
	dispatch(setPostLanding());
	axios
		.get(`/api/post/${id}`)
		.then((res) =>
			dispatch({
				type: GET_POST,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_POST,
				payload: null
			})
		);
};

// Add like
export const addLike = (id) => (dispatch) => {
	axios.post(`/api/post/like/${id}`).then((res) => dispatch(getPosts())).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Remove like
export const removeLike = (id) => (dispatch) => {
	axios.post(`/api/post/unlike/${id}`).then((res) => dispatch(getPosts())).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Set loading state
export const setPostLanding = () => {
	return {
		type: POST_LOADING
	};
};

// Clear Error
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
