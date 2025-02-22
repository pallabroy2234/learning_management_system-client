export interface IUpdateUserInfoRequest {
	name: string;
}

export interface IResponse {
	success: boolean;
	message: string;
	payload?: any;
}