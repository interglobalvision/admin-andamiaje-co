//eslint-disable import/first
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { firebaseApp } from './firebase';

import { logUser, logOutUser } from './redux/user/actions'
import rootReducer from './redux';

import App from './containers/App.jsx';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Bind firebase auth
firebaseApp.auth().onAuthStateChanged(user => {
	if(user) {
		console.log('User logged', user);
		const { email } = user;
		store.dispatch(logUser(email));
	} else {
		console.log('No user');
		store.dispatch(logOutUser())
	}
})


ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
	,
	document.getElementById('root')
);
