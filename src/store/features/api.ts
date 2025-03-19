import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {userLoggedIn, userLoggedOut} from "./auth/authSlice.ts";


const NODE_ENV = import.meta.env.VITE_NODE_ENV as string | "development";


/**
 * Determines server URL based on environment
 * @returns {string} Base URL for API requests
 * @throws {Error} If NODE_ENV is not set
 */
const server_url = (): string => {
	if (NODE_ENV === "development") {
		return import.meta.env.VITE_DEV_BASE_URL as string;
	} else if (NODE_ENV === "production") {
		return import.meta.env.VITE_PROD_BASE_URL as string;
	} else {
		throw new Error("NODE_ENV is not set");
	}
};

export const baseURL = server_url();

/**
 * Concurrent request mutex handler
 * @property {boolean} isLocked - Mutex lock status
 * @property {Function[]} pendingRequest - Queue for pending requests
 */
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


/**
 * Base query configuration
 */

const baseQuery = fetchBaseQuery({
	baseUrl: baseURL,
	credentials: "include"
	// cache:"default"
});


/**
 * Extended base query with re-authentication logic
 * @param {string | FetchArgs} args - Request arguments
 * @param {any} api - RTK API instance
 * @param {object} extraOptions - Additional options
 * @returns {Promise<any>} API response
 */
const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, {
	status: number | string
}> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error?.status === 401) {
		// Handle 401 Unauthorized error
		if (!mutex.isLocked) {
			mutex.lock();
			try {
				const refreshResult = await baseQuery({
					url: "/user/refresh",
					method: "GET",
					credentials: "include"
				}, api, extraOptions);

				if (refreshResult.data) {
					// 	 Fetch fresh user data after refresh token
					const userResult: any = await baseQuery({
						url: "/user/user-info",
						method: "GET",
						credentials: "include"
					}, api, extraOptions);

					if (userResult.data) {
						api.dispatch(userLoggedIn({
							user: userResult?.data?.payload
						}));
					}

					result = await baseQuery(args, api, extraOptions);

				} else {
					const {data}: any = await baseQuery({
						url: "/user/logout",
						method: "POST",
						credentials: "include"
					}, api, extraOptions);

					if (data && data?.success) {
						api.dispatch(userLoggedOut());
					}
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


/**
 * @description       API endpoints
 *
 * */

export const api = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithReAuth,
	tagTypes: ["User","Course","Customization"],
	endpoints: () => ({})
});


export const {} = api;




