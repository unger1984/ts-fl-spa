import { createSelector } from 'reselect';
import { AnyAction } from 'redux';

/**
 * Constants
 **/
export const moduleName = 'ui';

export const SET_PRELOADER = `${moduleName}/SET_PRELOADER`;

interface UIStateInterface {
	isPreloader: boolean;
}

interface UIActionInterface extends AnyAction {
	readonly type: string;
	readonly payload: {
		preloader?: boolean;
	};
}

const initialState: UIStateInterface = {
	isPreloader: false,
};

/**
 * Reducer
 **/
export default (state: UIStateInterface = initialState, action: UIActionInterface): UIStateInterface => {
	const { type, payload } = action;

	switch (type) {
		case SET_PRELOADER:
			return { ...state, isPreloader: payload.preloader || false };
		default:
			return { ...state };
	}
};

/**
 * Action Creators
 **/
export const setPreloader = (preloader: boolean): UIActionInterface => ({
	type: SET_PRELOADER,
	payload: { preloader },
});

/**
 * Selectors
 **/
export const uiSelector = (state: { ui: UIStateInterface }): UIStateInterface => state.ui;
export const uiPreloaderSelector = createSelector(uiSelector, (ui: UIStateInterface) => ui.isPreloader);
