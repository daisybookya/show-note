import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers,applyMiddleware } from 'redux';
import fetchList  from './middlewares/fetchList';
import * as reducers from './reducer'
import { Provider } from 'react-redux'
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const reducer = combineReducers({
    ...reducers
 })
const store = createStore(reducer,applyMiddleware(fetchList));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
