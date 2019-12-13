export interface ApiResponseInterface {
	status: boolean;
	data?: any;
	error?: {
		code: number;
		message: string;
	};
}
