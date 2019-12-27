import { CategoryesState, initialState as CategoryesInitialState } from '../ducks/categoryes';
import { ProjectsState, initialState as ProjectsInitialState } from '../ducks/projects';
import { SettingsState, initialState as SettingsInitialState } from '../ducks/settings';
import { UIState, initialState as UIInitalState } from '../ducks/ui';

export default interface ProjectState {
	categoryes: CategoryesState;
	projects: ProjectsState;
	settings: SettingsState;
	ui: UIState;
}

export const initialState = {
	categoryes: CategoryesInitialState,
	projects: ProjectsInitialState,
	settings: SettingsInitialState,
	ui: UIInitalState,
} as ProjectState;
