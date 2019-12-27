import React from 'react';
import { render } from '@testing-library/react';

import Svg from './Svg';

test('Svg', () => {
	const component = render(<Svg name="test" />);
	expect(component.asFragment()).toMatchSnapshot();
});
