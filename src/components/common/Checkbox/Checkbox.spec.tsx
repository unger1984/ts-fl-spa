import React from 'react';
import { render } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
	test('Checkbox', () => {
		const component = render(<Checkbox />);
		expect(component.asFragment()).toMatchSnapshot();
	});

	test('Checkbox checked', () => {
		const component = render(<Checkbox checked />);
		expect(component.asFragment()).toMatchSnapshot();
	});

	test('Checkbox disabled', () => {
		const component = render(<Checkbox disabled />);
		expect(component.asFragment()).toMatchSnapshot();
	});

	test('Checkbox disabled checked', () => {
		const component = render(<Checkbox checked disabled />);
		expect(component.asFragment()).toMatchSnapshot();
	});
});
