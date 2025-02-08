import store from "../store/store.ts";

export type CustomError = {
	status: number;
	data: {
		success: boolean;
		message: string;
		payload?: any;
	};
};


export type RootState = ReturnType<typeof store.getState>