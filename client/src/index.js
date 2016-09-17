import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes'
import configureStore from './store'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import "./index.css"

let store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} routes={getRoutes(store)}/>
    </Provider>,
  document.getElementById('root')
);
