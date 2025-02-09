import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {userLoggedIn, userLoggedOut} from "./auth/authSlice.ts";


const NODE_ENV = import.meta.env.VITE_NODE_ENV as string | "development";
const server_url = () => {
	if (NODE_ENV === "development") {
		return import.meta.env.VITE_DEV_BASE_URL as string;
	} else if (NODE_ENV === "production") {
		return import.meta.env.VITE_PROD_BASE_URL as string;
	} else {
		throw new Error("NODE_ENV is not set");
	}
};

const baseURL = server_url();


// Concurrent request handling
const mutex = {
	isLocked: false,
	pendingRequest: [] as (() => void)[],
	lock() {
		this.isLocked = true;
	},
	unlock() {
		this.pendingRequest.forEach((resolve) => resolve());
		this.pendingRequest = [];
		this.isLocked = false;
	}
};

const baseQuery = fetchBaseQuery({
	baseUrl: baseURL,
	credentials: "include"
});


const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, {
	status: number | string
}> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error?.status === 401) {

		// Handle 401 Unauthorized error
		if (!mutex.isLocked) {
			mutex.lock();
			try {
				//  Refresh token
				const refreshResult = await baseQuery("/user/refresh", api, extraOptions);
				if (refreshResult.data) {
					// const user = (api.getState() as RootState).auth.user;
					// if (user) api.dispatch(userLoggedIn(user));
					// result = await baseQuery(args, api, extraOptions);

					// 	 Fetch fresh user data after refresh token
					const userResult: any = await baseQuery("/user/user-info", api, extraOptions);

					if (userResult.data) {
						api.dispatch(userLoggedIn({
							user: userResult?.data?.payload
						}));
					}

					// 	Retry the original request
					result = await baseQuery(args, api, extraOptions);

				} else {
					// logout user
					api.dispatch({});
				}
			} finally {
				mutex.unlock();
			}
		} else {
			await new Promise((resolve) => mutex.pendingRequest.push(resolve as any));
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;
};


export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReAuth,
	tagTypes: ["User"],
	endpoints: (builder) => ({
		getCurrentUser: builder.query({
			query: () => ({
				url: "/user/user-info",
				method: "GET",
				credentials: "include"
			}),
			providesTags: ["User"],
			onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
				try {
					const {data} = await queryFulfilled;
					if (data.success) {
						dispatch(userLoggedIn({
							accessToken: "",
							user: data?.payload
						}));
					}
				} catch (e: any) {
					console.log("authApi login error", e.message);
				}
			}
		})
	})
});

export const initializeAuth = async (store: any) => {
	try {
		await store.dispatch(api.endpoints.getCurrentUser.initiate({}), {forceRefatch: true});
	} catch (error: any) {
		store.dispatch(userLoggedOut());
	}
};


export const {} = api;


// export const api = createApi({
// 	reducerPath: "api",
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: baseURL
// 	}),
// 	endpoints: () => ({})
// });
//
// export const {} = api;


// export const api = createApi({
// 	reducerPath: "api",
// 	baseQuery: fetchBaseQuery({
// 		baseUrl: baseURL
// 	}),
// 	endpoints: (builder) => ({
// 		refreshToken: builder.query({
// 			query: () => ({
// 				url: "/user/refresh",
// 				method: "GET",
// 				credentials: "include"
// 			})
// 		}),
// 		// Again call the user info endpoint to get the updated user info
// 		loadUser: builder.query({
// 			query: ()=> ({
// 				url:"/user/user-info",
// 				method:"GET",
// 				credentials:"include"
// 			}),
//
// 		})
// 	})
// });
//
// export const {useRefreshTokenQuery} = api;




