import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	token: "",
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
			state.token = "";
			state.user = null;
		}
	}
});


export const {userRegistration, userLoggedIn, userLoggedOut} = authSlice.actions;