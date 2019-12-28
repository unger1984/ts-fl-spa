import React from 'react';
import { fireEvent } from '@testing-library/react';

import SettingsPage from './SettingsPage';
import ProjectState, { initialState as ProjectInitialState } from 'models/ProjectState';
import renderWithRedux from 'models/RenderWithRedux';

let initialState: ProjectState;
beforeAll(async () => {
	initialState = ProjectInitialState;
});

describe('SettiongsPage', () => {
	it('Render', () => {
		const component = renderWithRedux(<SettingsPage />, { initialState });
		expect(component.asFragment()).toMatchSnapshot();
	});

	it('click isAuto', () => {
		const component = renderWithRedux(<SettingsPage />, { initialState });
		fireEvent.click(component.getByTestId('chk-auto'));
		expect(component.asFragment()).toMatchSnapshot();
	});

	it('change Interval', () => {
		const component = renderWithRedux(<SettingsPage />, { initialState });
		fireEvent.click(component.getByTestId('chk-auto'));
		fireEvent.change(component.getByTestId('inp-interval'), { target: { value: '10' } });
		expect(component.asFragment()).toMatchSnapshot();
	});
});
