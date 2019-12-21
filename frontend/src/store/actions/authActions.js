import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

import { GET_ERRORS, SET_CURRENT_USER } from './types';

// User with Token

export const requestToken = () => (dispatch) => {
  console.log("From action")
	axios
		.post('/api/user/')
		.then((res) => {
			// Save to LocalStorage
			const { token } = res.data;

			// Set token to Local Storage
			localStorage.setItem('jwtToken', token);
			// Set token to Auth header
			setAuthToken(token); // This Function help to add Header Authorization token for every request through axios

			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};
