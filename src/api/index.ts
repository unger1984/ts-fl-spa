import axios, { AxiosResponse } from 'axios';
import { stringify } from 'qs';

import { urlBackend } from '../config';
import ApiResponseInterface from 'models/ApiResponseInterface';

const sendData = (res: AxiosResponse): ApiResponseInterface => res.data;

axios.defaults.baseURL = `${urlBackend}/api`;
axios.defaults.paramsSerializer = (params: object): string => stringify(params, { encode: false });

export default {
	categoryes: {
		getCategoryes: (): Promise<ApiResponseInterface> => axios.get('/category').then(sendData),
	},
	project: {
		getProjects: (filter: object | null): Promise<ApiResponseInterface> =>
			axios.get(`/project`, { params: { filter } }).then(sendData),
	},
};
