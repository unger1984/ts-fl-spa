import React from 'react';
import { fireEvent } from '@testing-library/react';
import { plainToClass } from 'class-transformer';

import CategoryItem from './CategoryItem';
import ProjectState, { initialState as ProjectInitialState } from 'models/ProjectState';
import renderWithRedux from 'models/RenderWithRedux';
import Category from 'models/Category';

let initialState: ProjectState;
let item: Category;
beforeAll(async () => {
	initialState = ProjectInitialState;
	item = plainToClass(Category, {
		id: 10,
		title: 'Название категории',
		child: [{ id: 11, parentId: 10, title: 'Название подкатегории' }],
	});
});

describe('CategoryItem', () => {
	it('Render', () => {
		const component = renderWithRedux(<CategoryItem item={item} />, { initialState });
		expect(component.asFragment()).toMatchSnapshot();
	});

	it('click', () => {
		const component = renderWithRedux(<CategoryItem item={item} />, { initialState });
		fireEvent.click(component.getByTestId('category-10'));
		expect(component.asFragment()).toMatchSnapshot();
	});

	it('disabled', () => {
		const component = renderWithRedux(<CategoryItem item={item} disabled />, { initialState });
		expect(component.asFragment()).toMatchSnapshot();
	});
});
