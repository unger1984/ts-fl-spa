import React from 'react';
import { fireEvent } from '@testing-library/react';

import Footer, { FooterProps } from './Footer';
import renderWithRedux from 'models/RenderWithRedux';
import { toggleFullScreen } from 'helpers/helperFullScreen';
import ProjectState, { initialState as ProjectsInitialState } from 'models/ProjectState';

jest.mock('helpers/helperFullScreen', () => ({
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	toggleFullScreen: jest.fn(() => {}),
}));

const props: FooterProps = {
	preloader: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onReload: jest.fn(() => {}),
};
let initialState: ProjectState;
beforeAll(() => {
	initialState = ProjectsInitialState;
});

describe('Footer', () => {
	test('render', () => {
		const component = renderWithRedux(<Footer {...props} />, { initialState });
		expect(component.asFragment()).toMatchSnapshot();
	});

	test('with preloader', () => {
		const component = renderWithRedux(<Footer {...props} preloader={true} />, { initialState });
		expect(component.asFragment()).toMatchSnapshot();
	});

	test('on reload pass', () => {
		const component = renderWithRedux(<Footer {...props} preloader={true} />, { initialState });
		fireEvent.click(component.getByTestId('reload-btn'));
		expect(props.onReload).not.toHaveBeenCalled();
	});

	test('on reload', () => {
		const component = renderWithRedux(<Footer {...props} />, { initialState });
		fireEvent.click(component.getByTestId('reload-btn'));
		expect(props.onReload).toHaveBeenCalled();
	});

	test('on fullscreen', () => {
		const component = renderWithRedux(<Footer {...props} />, { initialState });
		fireEvent.click(component.getByTestId('fullscreen-btn'));
		expect(toggleFullScreen).toHaveBeenCalled();
	});
});
