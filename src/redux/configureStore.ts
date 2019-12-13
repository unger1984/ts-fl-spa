import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, Store } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducer';

export const history = createBrowserHistory();

// const middleware = routerMiddleware(history);
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState = {}): Store {
	const store = createStore(
		createRootReducer(history),
		initialState,
		compose(applyMiddleware(thunk, routerMiddleware(history))),
	);

	// if (module.hot) {
	// 	// Enable Webpack hot module replacement for reducers
	// 	module.hot.accept('./reducer', () => {
	// 		const nextRootReducer = require('./reducer');
	// 		store.replaceReducer(nextRootReducer);
	// 	});
	// }

	return store;
}
