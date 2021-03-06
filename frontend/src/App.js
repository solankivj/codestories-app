import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import store from '../src/store';
import Navbar from './components/layout/Navbar';
import NotFound from './components/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';

import './App.css';
import './sass/style.scss';
import { setCurrentUser, requestToken } from './store/actions/authActions';

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
} else {
  // Make Token Request
  store.dispatch(requestToken());
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className="container">
						<Navbar />
            <Route exact path="/" component={Posts} />
            <Route exact path="/stories/:id" component={Post} />
            <Route exact path="/notfound" component={NotFound} />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
