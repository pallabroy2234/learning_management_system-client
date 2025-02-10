import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../../types/@types.ts";


type AuthState = {
	token: string | null;
	user: IUser | null
}

const initialState: AuthState = {
	token: null,
	user: null
};


export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userRegistration: (state, {payload}) => {
			state.token = payload.token;
		},
		userLoggedIn: (state, {payload}) => {
			state.token = payload.accessToken;
			state.user = payload.user;
		},
		userLoggedOut: (state) => {
			state.token = null;
			state.user = null;
		}
	}
});


export const {userRegistration, userLoggedIn, userLoggedOut} = authSlice.actions;