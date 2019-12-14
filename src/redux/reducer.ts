import { combineReducers, Reducer } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import ui from 'ducks/ui';
import categoryes from 'ducks/categoryes';
import projects from 'ducks/projects';

const createRootReducer = (history: History): Reducer =>
	combineReducers({
		router: connectRouter(history),
		ui,
		categoryes,
		projects,
	});

export default createRootReducer;
