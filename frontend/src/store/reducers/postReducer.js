import { ADD_POST, GET_POSTS, POST_LOADING, GET_POST } from '../actions/types';

const initialState = {
	posts: [],
	post: {},
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case POST_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false
			};
		case ADD_POST:
			return {
				...state,
				posts: [ action.payload, ...state.posts ]
			};
		default:
			return state;
	}
}
