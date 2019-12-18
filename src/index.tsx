import 'reflect-metadata';
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
import { UIState, uiSelector } from 'ducks/ui';
import { settingsSelector, SettingsState } from 'ducks/settings';

const store = configureStore({ ui: localStorage.fetchInterface(), settings: localStorage.fetchSettings() });
store.subscribe(() => {
	const ui: UIState = uiSelector(store.getState());
	const settings: SettingsState = settingsSelector(store.getState());
	localStorage.saveInterface(ui);
	localStorage.saveSettings(settings);
});

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById('app'),
);
