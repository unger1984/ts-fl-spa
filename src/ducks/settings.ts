import { createSelector } from 'reselect';
import { AnyAction } from 'redux';

/**
 * Constants
 **/
export const moduleName = 'settings';

export const FETCH = `${moduleName}/FETCH`;
export const SET_AUTO = `${moduleName}/SET_AUTO`;
export const SET_INTERVAL = `${moduleName}/SET_INTERVAL`;

export interface SettingsState {
	isAuto: boolean;
	interval: number;
}

export interface SettingsAction extends AnyAction {
	readonly type: string;
	readonly payload: {
		isAuto?: boolean;
		interval?: number;
	};
}

export const initialState: SettingsState = {
	isAuto: false,
	interval: 5,
};

/**
 * Reducer
 */
export default (state: SettingsState = initialState, action: SettingsAction): SettingsState => {
	const { type, payload } = action;

	switch (type) {
		case FETCH:
			return { ...state, ...payload };
		case SET_AUTO:
			return { ...state, isAuto: payload.isAuto || false };
		case SET_INTERVAL:
			return { ...state, interval: payload.interval || 5 };
		default:
			return state;
	}
};

/**
 * Action Creators
 **/
export const fetch = (payload: SettingsState): SettingsAction => ({
	type: FETCH,
	payload: payload,
});

export const setAuto = (isAuto: boolean): SettingsAction => ({
	type: SET_AUTO,
	payload: { isAuto },
});

export const editInterval = (interval: number): SettingsAction => ({
	type: SET_INTERVAL,
	payload: { interval },
});

/**
 * Selectors
 **/
export const settingsSelector = (state: { settings: SettingsState }): SettingsState => state.settings;
export const settionsAutoSelector = createSelector(settingsSelector, settings => settings.isAuto);
export const settingsIntervalSelector = createSelector(settingsSelector, settings => settings.interval);
