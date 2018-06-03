import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Route } from "react-router-dom";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import reducers from "./reducers";
import GalleriesList from "./components/galleriesList";
import GalleryDetail from "./components/galleryDetail";

import registerServiceWorker from './registerServiceWorker';


const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div>
				<Route exact path="/" component={GalleriesList} />
				<Route path="/:imageId" component={GalleryDetail} />
			</div>
		</Router>
	</Provider>, 
	document.getElementById('root')
);

registerServiceWorker();
