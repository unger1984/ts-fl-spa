import { createSelector } from 'reselect';
import { AnyAction } from 'redux';

/**
 * Constants
 **/
export const moduleName = 'settings';

export const FETCH = `${moduleName}/FETCH`;
export const SET_AUTO = `${moduleName}/SET_AUTO`;
export const SET_INTERVAL = `${moduleName}/SET_INTERVAL`;
export const SET_CATEGORY = `${moduleName}/SET_CATEGORY`;
export const SET_ALL_CATEGORY = `${moduleName}/SET_ALL_CATEGORY`;

export interface SettingsState {
	isAuto: boolean;
	interval: number;
	categoryes: number[];
	allCategory: boolean;
}

export interface SettingsAction extends AnyAction {
	readonly type: string;
	readonly payload: {
		isAuto?: boolean;
		interval?: number;
		categoryes?: number[];
		categoryId?: number;
		allCategory?: boolean;
	};
}

export const initialState: SettingsState = {
	isAuto: false,
	interval: 5,
	categoryes: [],
	allCategory: true,
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
		case SET_CATEGORY: {
			const categoryes = [...state.categoryes];
			if (categoryes.indexOf(payload.categoryId!) >= 0) {
				categoryes.splice(categoryes.indexOf(payload.categoryId!), 1);
			} else {
				categoryes.push(payload.categoryId!);
			}
			return { ...state, categoryes };
		}
		case SET_ALL_CATEGORY:
			return {
				...state,
				categoryes: payload.allCategory ? [] : state.categoryes,
				allCategory: payload.allCategory || false,
			};
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

export const setCategory = (categoryId: number): SettingsAction => ({
	type: SET_CATEGORY,
	payload: { categoryId },
});

export const setAllCategory = (allCategory: boolean): SettingsAction => ({
	type: SET_ALL_CATEGORY,
	payload: { allCategory },
});

/**
 * Selectors
 **/
export const settingsSelector = (state: { settings: SettingsState }): SettingsState => state.settings;
export const settionsAutoSelector = createSelector(settingsSelector, settings => settings.isAuto);
export const settingsIntervalSelector = createSelector(settingsSelector, settings => settings.interval);
export const settingsCategoryesSelector = createSelector(settingsSelector, settings => settings.categoryes);
export const settingsAllCategorySelector = createSelector(settingsSelector, settings => settings.allCategory);
