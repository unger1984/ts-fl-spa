import React from 'react';
import { plainToClass } from 'class-transformer';
import moment from 'moment';

import ProjectItem from './ProjectItem';
import ProjectState, { initialState as ProjectInitialState } from 'models/ProjectState';
import renderWithRedux from 'models/RenderWithRedux';
import Project from 'models/Project';

let initialState: ProjectState;
let item: Project;
beforeAll(async () => {
	initialState = ProjectInitialState;
	item = plainToClass(Project, {
		id: 10,
		title: 'Название проекта',
		date: moment('2019-10-28', 'YYYY-MM-DD').toDate(),
		price: '1000',
		text: 'Описание проекта',
		link: 'https://yandex.ru',
		category: { id: 11, parentId: 10, title: 'Название категории' },
	});
});

describe('ProjectItem', () => {
	it('Render', () => {
		const component = renderWithRedux(<ProjectItem project={item} />, { initialState });
		expect(component.asFragment()).toMatchSnapshot();
	});
});
