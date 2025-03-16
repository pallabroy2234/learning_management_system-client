export interface IUpdateUserInfoRequest {
	name: string;
}

export interface IResponse {
	success: boolean;
	message: string;
	payload?: any;
}

export interface ICreatePasswordSocialAuthRequest {
	newPassword: string;
	confirmPassword: string;
}


export interface IUpdatePasswordRequest {
	oldPassword: string;
	newPassword: string;
}


export interface IUpdateRoleRequest {
	email: string;
	role: string;
}