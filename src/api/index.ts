import axios, { AxiosResponse } from 'axios';
import { stringify } from 'qs';

import { urlBackend } from '../config';
import { ApiResponseInterface } from '../models/ApiResponseInterface';

const sendData = (res: AxiosResponse): ApiResponseInterface => res.data;

interface FilterInteface {
	[key: string]: string;
}

const objToQuery = (obj: FilterInteface): string => {
	let res = '';
	for (const key of Object.keys(obj)) {
		if (res !== '') {
			res += '&';
		}
		res += key + '=' + obj[key];
	}
	return res;
};

axios.defaults.baseURL = `${urlBackend}/api`;
axios.defaults.paramsSerializer = (params: object): string => stringify(params, { encode: false });

export default {
	categoryes: {
		getCategoryes: (): Promise<ApiResponseInterface> => axios.get('/category').then(sendData),
	},
	project: {
		getProjects: (filter: FilterInteface): Promise<ApiResponseInterface> =>
			axios.get(`/project?${objToQuery(filter)}`).then(sendData),
	},
};
