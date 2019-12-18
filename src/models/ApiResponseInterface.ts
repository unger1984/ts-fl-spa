export default interface ApiResponseInterface {
	success: boolean;
	data?: any;
	error?: {
		code: number;
		message: string;
	};
}
