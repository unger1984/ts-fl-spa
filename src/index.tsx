import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import './assets/svgSprite/svgInsert';
import './scss/index.scss';
import history from './redux/history';
import localStorage from 'api/localStorage';
import configureStore from './redux/configureStore';
import App from 'components/App';
import { UIStateInterface, uiSelector } from 'ducks/ui';

const store = configureStore({ ui: localStorage.fetchInterface() });
store.subscribe(() => {
	const ui: UIStateInterface = uiSelector(store.getState());
	localStorage.saveInterface(ui);
});

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app'),
);
