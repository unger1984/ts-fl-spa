import React from 'react';
import { fireEvent } from '@testing-library/react';

import CategoryPage from './CategoryPage';
import ProjectState, { initialState as ProjectInitialState } from 'models/ProjectState';
import renderWithRedux from 'models/RenderWithRedux';

let initialState: ProjectState;
beforeAll(async () => {
	initialState = ProjectInitialState;
});

describe('CategoryItem', () => {
	it('Render', () => {
		const component = renderWithRedux(<CategoryPage />, { initialState });
		expect(component.asFragment()).toMatchSnapshot();
	});

	it('click all', () => {
		const component = renderWithRedux(<CategoryPage />, { initialState });
		fireEvent.click(component.getByTestId('chk-all'));
		expect(component.asFragment()).toMatchSnapshot();
	});
});
