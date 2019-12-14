import { createSelector } from 'reselect';
import { AnyAction } from 'redux';

/**
 * Constants
 **/
export const moduleName = 'ui';

export const SET_PRELOADER = `${moduleName}/SET_PRELOADER`;

export interface UIState {
	isPreloader: boolean;
}

export interface UIAction extends AnyAction {
	readonly type: string;
	readonly payload: {
		preloader?: boolean;
	};
}

const initialState: UIState = {
	isPreloader: false,
};

/**
 * Reducer
 **/
export default (state: UIState = initialState, action: UIAction): UIState => {
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
export const setPreloader = (preloader: boolean): UIAction => ({
	type: SET_PRELOADER,
	payload: { preloader },
});

/**
 * Selectors
 **/
export const uiSelector = (state: { ui: UIState }): UIState => state.ui;
export const uiPreloaderSelector = createSelector(uiSelector, (ui: UIState) => ui.isPreloader);
