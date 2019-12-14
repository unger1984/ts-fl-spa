import { createSelector } from 'reselect';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { plainToClass } from 'class-transformer';

import api from 'api/index';
import ApiResponseInterface from 'models/ApiResponseInterface';
import Project from 'models/Project';
import { setPreloader, UIActionInterface } from 'ducks/ui';

/**
 * Constants
 **/
export const moduleName = 'projects';

export const FETCH = `${moduleName}/FETCH`;

export interface ProjectsStateInterface {
	list: Project[];
}

export interface ProjectsActionInterface extends AnyAction {
	readonly type: string;
	readonly payload: {
		list: Project[];
	};
}

const initialState: ProjectsStateInterface = {
	list: [],
};

/**
 * Reducer
 **/
export default (
	state: ProjectsStateInterface = initialState,
	action: ProjectsActionInterface,
): ProjectsStateInterface => {
	const { type, payload } = action;

	switch (type) {
		case FETCH:
			return { ...state, list: payload.list || ([] as Project[]) };
		default:
			return { ...state };
	}
};

/**
 * Action Creators
 **/
export const fetch = (list: Project[]): ProjectsActionInterface => ({
	type: FETCH,
	payload: { list },
});

/**
 * Selectors
 **/
export const projectsSelector = (state: { projects: ProjectsStateInterface }): ProjectsStateInterface => state.projects;
export const projectsListSelector = createSelector(
	projectsSelector,
	(projects: ProjectsStateInterface): Project[] => projects.list,
);

/**
 * Async actions
 */
type ProjectsThunkAction = ThunkAction<void, { projects: ProjectsStateInterface }, {}, ProjectsActionInterface>;
type ProjectsThnkDispatch = ThunkDispatch<
	{},
	{ projects: ProjectsStateInterface },
	ProjectsActionInterface | UIActionInterface
>;

export const getProjectsList = (): ProjectsThunkAction => (
	dispatch: ProjectsThnkDispatch,
	getState: () => { projects: ProjectsStateInterface },
): void => {
	const oldList = projectsListSelector(getState());
	dispatch(setPreloader(true));
	api.project.getProjects(null).then((res: ApiResponseInterface) => {
		if (res.status) {
			const newList = res.data.rows.map((item: object) =>
				plainToClass(Project, item, { enableImplicitConversion: true }),
			);
			if (oldList.length === 0) {
				// первый запрос, значитвсе просто
				dispatch(fetch(newList));
			}
		}
		dispatch(setPreloader(false));
	});
};

export const clearProjectsList = (): ProjectsThunkAction => (dispatch: ProjectsThnkDispatch): void => {
	dispatch(fetch([]));
};
