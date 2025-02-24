import store from "../store/store.ts";

export type CustomError = {
	status: number;
	data: {
		success: boolean;
		message: string;
		payload?: any;
	};
};

export type RootState = ReturnType<typeof store.getState>;

export interface IUser {
	_id: string;
	name: string;
	email: string;
	password?: string;
	avatar: {
		url: string;
		public_id: string;
	};
	role: string;
	isVerified: boolean;
	courses: Object[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}
