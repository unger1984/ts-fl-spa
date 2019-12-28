import React from 'react';
import { fireEvent, act } from '@testing-library/react';

import ProjectsPage from './ProjectsPage';
import ProjectState, { initialState as ProjectInitialState } from 'models/ProjectState';
import renderWithRedux from 'models/RenderWithRedux';

let initialState: ProjectState;
beforeAll(async () => {
	initialState = ProjectInitialState;
});

describe('ProjectsPage', () => {
	it('Render', () => {
		const component = renderWithRedux(<ProjectsPage />, { initialState });
		expect(component.asFragment()).toMatchSnapshot();
	});

	it('Pull', () => {
		const component = renderWithRedux(<ProjectsPage />, { initialState });
		act(() => {
			fireEvent.touchStart(window, { touches: [{ screenY: 10 }] });
			fireEvent.touchMove(window, { touches: [{ screenY: 200 }] });
			fireEvent.touchEnd(window);
		});
		expect(component.asFragment()).toMatchSnapshot();
	});
});
