import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Route } from "react-router-dom";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// import App from './App';
import reducers from "./reducers";
import GalleriesList from "./components/galleriesList";

import registerServiceWorker from './registerServiceWorker';


const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

console.log(store.getState());

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route exact path="/" component={GalleriesList} />
		</Router>
	</Provider>, 
	document.getElementById('root')
);

registerServiceWorker();
