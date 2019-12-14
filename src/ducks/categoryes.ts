import { createSelector } from 'reselect';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import api from 'api/index';
import ApiResponseInterface from '../models/ApiResponseInterface';

/**
 * Constants
 **/
export const moduleName = 'categoryes';

export const FETCH = `${moduleName}/FETCH`;

export interface CategoryesStateInterface {
	list: object[];
}

export interface CategoryesActionInterface extends AnyAction {
	readonly type: string;
	readonly payload: {
		list: object[];
	};
}

const initialState: CategoryesStateInterface = {
	list: [],
};

/**
 * Reducer
 **/
export default (
	state: CategoryesStateInterface = initialState,
	action: CategoryesActionInterface,
): CategoryesStateInterface => {
	const { type, payload } = action;

	switch (type) {
		case FETCH:
			return { ...state, list: payload.list || [] };
		default:
			return { ...state };
	}
};

/**
 * Action Creators
 **/
export const fetch = (list: object[]): CategoryesActionInterface => ({
	type: FETCH,
	payload: { list },
});

export const getCategoyesList = (): ThunkAction<void, {}, {}, CategoryesActionInterface> => (
	dispatch: ThunkDispatch<{}, {}, CategoryesActionInterface>,
): void => {
	api.categoryes.getCategoryes().then((res: ApiResponseInterface) => {
		dispatch(fetch(res.data));
	});
};

/**
 * Selectors
 **/
export const categoryesSelector = (state: { categoryes: CategoryesStateInterface }): CategoryesStateInterface =>
	state.categoryes;
export const categoryesListSelector = createSelector(
	categoryesSelector,
	(categoryes: CategoryesStateInterface): object[] => categoryes.list,
);
