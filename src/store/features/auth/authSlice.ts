import {createSlice} from "@reduxjs/toolkit";


const initialState = {
	token: "",
	user: {},
	errorMessage: ""
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
			state.user = payload.payload;
		},
		userLoggedOut: (state) => {
			state.token = "";
			state.user = {};
		},
		setErrorMessage: (state, {payload}) => {
			state.errorMessage = payload;
		}
	}
});


export const {userRegistration, userLoggedIn, userLoggedOut, setErrorMessage} = authSlice.actions;