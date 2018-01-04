//eslint-disable import/first
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStoreWithFirebase } from './firebase';

import rootReducer from './redux';

import App from './containers/App.jsx';

const store = createStoreWithFirebase(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
	,
	document.getElementById('root')
);
