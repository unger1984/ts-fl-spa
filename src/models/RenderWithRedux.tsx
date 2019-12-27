import { Action, AnyAction, Store } from 'redux';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { render, RenderResult } from '@testing-library/react';

import history from '../redux/history';
import configureStore from '../redux/configureStore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RenderWithRedux<S = any, A extends Action = AnyAction, I extends S = any> {
	(
		ui: React.ReactNode,
		reduxOptions: {
			store?: Store<S, A>;
			initialState?: I;
		},
	): RenderResult & {
		store: Store<S, A>;
	};
}
const renderWithRedux: RenderWithRedux = (
	ui: React.ReactNode,
	{ initialState, store = configureStore(initialState) } = {},
) => {
	return {
		...render(
			<Provider store={store}>
				<ConnectedRouter history={history}>{ui}</ConnectedRouter>
			</Provider>,
		),
		store,
	};
};

export default renderWithRedux;
