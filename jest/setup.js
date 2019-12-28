/* eslint-disable @typescript-eslint/no-var-requires */
require('reflect-metadata');
const axios = require('axios');
const mockAxios = require('axios-mock-adapter');
const moment = require('moment');

jest.mock('../src/config.ts', () => ({
	__URL_BACKEND__: '',
	menu: [
		{ key: 'projects', ico: 'list', title: 'Проекты' },
		{ key: 'filters', ico: 'filter', title: 'Фильтры' },
		{ key: 'settings', ico: 'settings', title: 'Настройки' },
	],
}));

const axiosMock = new mockAxios(axios);

// axiosMock.onAny().reply(config => {
// 	console.log('config', config);
// 	// 	return [200, 'ololo'];
// });

axiosMock.onGet(/\/api\/category/).reply(config => {
	const items = [
		{
			id: 10,
			title: 'Название категории',
			child: [{ id: 11, parentId: 10, title: 'Название подкатегории' }],
		},
	];
	return [200, { success: true, data: items }];
});

axiosMock.onGet(/\/api\/project/).reply(config => {
	const items = {
		count: 1,
		rows: [
			{
				id: 10,
				title: 'Название проекта',
				date: moment('2019-10-28', 'YYYY-MM-DD').toDate(),
				price: '1000',
				text: 'Описание проекта',
				link: 'https://yandex.ru',
				category: { id: 11, title: 'Название категории' },
			},
		],
	};
	return [200, { success: true, data: items }];
});

// Fail tests on any warning
console.error = message => {
	throw new Error(message);
};
