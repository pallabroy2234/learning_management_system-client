import {configureStore} from "@reduxjs/toolkit";
import {createLogger} from "redux-logger";
import {api} from "./features/api.ts";
import {authSlice} from "./features/auth/authSlice.ts";


// Node env
const NODE_ENV = import.meta.env.VITE_NODE_ENV as string | "development";


// config logger
const logger = createLogger({
	collapsed: true,
	duration: true,
	timestamp: true,
	level: "log",
	colors: {
		title: () => "#139BFE",
		prevState: () => "#1C5FAF",
		action: () => "#149945",
		nextState: () => "#A47104",
		error: () => "#FF0005"
	}
});


const store = configureStore({
	reducer: {
		// 	 API,
		[api.reducerPath]: api.reducer,
		// 	Reducer
		[authSlice.name]: authSlice.reducer
	},
	devTools: import.meta.env.VITE_NODE_ENV === "development",
	middleware: (getDefaultMiddleware) => {
		const middleware = getDefaultMiddleware().concat([
			// 	 middleware
			api.middleware
		]);

		if (NODE_ENV === "development") {
			middleware.push(logger);
		}
		return middleware;
	}
});


// const initialStore = async () => {
// 	await store.dispatch(api.endpoints.refreshToken.initiate({}, {forceRefetch: true}));
// // 	Again call load user info endpoint to get the updated user info
// };
//
// initialStore();


export default store;
