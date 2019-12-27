import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Header, { HeaderProps } from './Header';

const props: HeaderProps = {
	preloader: false,
	title: 'TEST',
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onReload: jest.fn(() => {}),
};

describe('Header', () => {
	test('with title', () => {
		const component = render(<Header {...props} />);
		expect(component.asFragment()).toMatchSnapshot();
	});

	test('with preloader', () => {
		const component = render(<Header {...props} preloader={true} />);
		expect(component.asFragment()).toMatchSnapshot();
	});

	test('on reload pass', () => {
		const component = render(<Header {...props} preloader={true} />);
		fireEvent.click(component.getByTestId('reload-btn'));
		expect(props.onReload).not.toHaveBeenCalled();
	});

	test('on reload', () => {
		const component = render(<Header {...props} />);
		fireEvent.click(component.getByTestId('reload-btn'));
		expect(props.onReload).toHaveBeenCalled();
	});
});
