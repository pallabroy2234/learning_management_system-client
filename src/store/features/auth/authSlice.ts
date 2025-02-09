import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	token: "",
	user: {},
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
			state.user = {};
		},
	}
});


export const {userRegistration, userLoggedIn, userLoggedOut} = authSlice.actions;