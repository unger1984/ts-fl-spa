import { createSelector } from 'reselect';
import { AnyAction } from 'redux';
import { plainToClass } from 'class-transformer';

import api from 'api/index';
import ApiResponseInterface from 'models/ApiResponseInterface';
import Project from 'models/Project';
import { setPreloader } from 'ducks/ui';
import { ThunkAction } from 'redux-thunk';
import { settingsAllCategorySelector, settingsCategoryesSelector, SettingsState } from 'ducks/settings';

/**
 * Constants
 **/
export const moduleName = 'projects';

export const FETCH = `${moduleName}/FETCH`;
export const SET_SEEN_TIMEOUT = `${moduleName}/SET_SEEN_TIMEOUT`;

export interface ProjectsState {
	list: Project[];
	seenTimer: number | null;
}

export interface ProjectsAction extends AnyAction {
	readonly type: string;
	readonly payload: {
		list?: Project[];
		timeout?: number | null;
	};
}

export const initialState: ProjectsState = {
	list: [],
	seenTimer: null,
};

/**
 * Reducer
 **/
export default (state: ProjectsState = initialState, action: ProjectsAction): ProjectsState => {
	const { type, payload } = action;

	switch (type) {
		case FETCH:
			return { ...state, list: payload.list || ([] as Project[]) };
		case SET_SEEN_TIMEOUT:
			return { ...state, seenTimer: payload.timeout || null };
		default:
			return { ...state };
	}
};

/**
 * Action Creators
 **/
export const fetch = (list: Project[]): ProjectsAction => ({
	type: FETCH,
	payload: { list },
});

export const setSeenTimeout = (timeout: number | null): ProjectsAction => ({
	type: SET_SEEN_TIMEOUT,
	payload: { timeout },
});

/**
 * Selectors
 **/
export const projectsSelector = (state: { projects: ProjectsState }): ProjectsState => state.projects;
export const projectsListSelector = createSelector(
	projectsSelector,
	(projects: ProjectsState): Project[] => projects.list,
);
export const projectsSeenTimeoutSelector = createSelector(
	projectsSelector,
	(projects: ProjectsState): number | null => projects.seenTimer,
);

/**
 * Async actions
 */
export const setSeenProjects = () => (
	dispatch: (action: AnyAction) => void,
	getState: () => { projects: ProjectsState },
): void => {
	const oldList = projectsListSelector(getState());

	const newList = oldList.map(item => {
		if (item.isNew) {
			item.isNew = false;
		}
		return item;
	});
	dispatch(fetch(newList));
};

export const getProjectsList = (): Function => (
	dispatch: (action: AnyAction | ThunkAction<void, { projects: ProjectsState }, null, ProjectsAction>) => void,
	getState: () => { projects: ProjectsState; settings: SettingsState },
): void => {
	const oldList = projectsListSelector(getState());
	const categoryes = settingsCategoryesSelector(getState());
	const allCategory = settingsAllCategorySelector(getState());
	dispatch(setPreloader(true));
	const filter: any = {};
	if (!allCategory) {
		if (categoryes.length > 0) {
			filter.categoryes = categoryes.join(',');
		} else {
			filter.categoryes = '0';
		}
	}
	api.project.getProjects(filter).then((res: ApiResponseInterface) => {
		if (res.success) {
			const newList = res.data.rows.map((item: object) =>
				plainToClass(Project, item, { enableImplicitConversion: true }),
			);
			if (oldList.length === 0) {
				// первый запрос, значит все просто
				dispatch(fetch(newList));
			} else {
				const onlyNew = newList
					.filter((item: Project) => oldList.filter(old => old.id === item.id).length <= 0)
					.map((item: Project) => ({ ...item, isNew: true }));
				if (onlyNew.length > 0) {
					// есть новые
					const oldTimeout = projectsSeenTimeoutSelector(getState());
					if (oldTimeout) {
						window.clearTimeout(oldTimeout);
						dispatch(setSeenTimeout(null));
					}
					// TODO need BEEP
					const totalList = [...onlyNew, ...oldList];
					totalList.splice(30, totalList.length - 30);
					dispatch(fetch(totalList));
					const timeout = window.setTimeout(() => {
						dispatch(setSeenProjects());
					}, 100);
					dispatch(setSeenTimeout(timeout));
				}
			}
		}
		dispatch(setPreloader(false));
	});
};

export const clearProjectsList = () => (dispatch: (action: AnyAction) => void): void => {
	dispatch(fetch([]));
};
