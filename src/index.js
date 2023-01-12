import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from "react-router-dom";
import App from './App';
import "antd/dist/antd.css";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from './reducers';

const store = createStore(rootReducer,composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
  <HashRouter>
  <App />
  </HashRouter>
  </Provider>,
  
  document.getElementById('root')
);
