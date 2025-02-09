export interface RegistrationRequest {
	name: string,
	email: string,
	password: string
}


export interface RegistrationSuccessResponse {
	success: true,
	message: string,
	activationCode: string
}


export interface ErrorResponse {
	success: false,
	message: string,
}

export type RegistrationResponse = RegistrationSuccessResponse | ErrorResponse;


export interface ActivationRequest {
	activation_token: string,
	activation_code: string
}

export interface ActivationSuccessResponse {
	success: true,
	message: string
}

export type ActivationResponse = ActivationSuccessResponse | ErrorResponse;

export interface ILoginRequest {
	email: string,
	password: string
}

export interface ILoginSuccessResponse {
	success: boolean,
	message: string,
	payload: Object,
	accessToken: string
}


export type LoginResponse = ILoginSuccessResponse | ErrorResponse