import {api} from "../api.ts";
import {userLoggedIn, userLoggedOut, userRegistration} from "./authSlice.ts";
import {
	ActivationRequest,
	ActivationResponse,
	ILoginRequest, LoginResponse,
	RegistrationRequest,
	RegistrationResponse
} from "./authTypes.ts";


export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({

		/**
		 * @summary       Register user
		 * @description   Register a new user account
		 * @method        POST
		 * @path          /user/register
		 * @security      Public
		 * @param {RegistrationRequest} data - User registration data
		 * @returns {RegistrationResponse} Registration response object
		 * */
		register: builder.mutation<RegistrationResponse, RegistrationRequest>({
			query: (data) => ({
				url: "/user/register",
				method: "POST",
				credentials: "include",
				body: data
			}),
			// transformResponse: (response: RegistrationResponse) => response,
			// transformErrorResponse: (response: any) => ({
			// 	success: false,
			// 	message: response.data?.message || "Registration failed",
			// 	error: {
			// 		code: response.status.toString(),
			// 		details: response.data?.errors
			// 	}
			// }),
			onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
				try {
					const {data} = await queryFulfilled;
					if (data.success) {
						dispatch(userRegistration({
							token: data?.activationCode
						}));
					}
				} catch (err: any) {
					console.log("error", err);
				}
			}
		}),

		/**
		 * @summary       Activate user account
		 * @description   Activate user account with activation token and code
		 * @method        POST
		 * @path          /user/activate-user
		 * @security      Public
		 * */
		activation: builder.mutation<ActivationResponse, ActivationRequest>({
			query: ({activation_token, activation_code}) => ({
				url: "/user/activate-user",
				method: "POST",
				credentials: "include",
				body: {
					activation_token,
					activation_code
				}
			})
		}),

		/**
		 * @summary       User login
		 * @description   Authenticate user with email and password
		 * @method        POST
		 * @path          /user/login
		 * @security      Public
		 * */

		login: builder.mutation<LoginResponse, ILoginRequest>({
			query: ({email, password}) => ({
				url: "/user/login",
				method: "POST",
				credentials: "include" as RequestCredentials,
				body: {
					email,
					password
				}
			}),
			invalidatesTags: ["User"],
			onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
				try {
					const {data} = await queryFulfilled;
					if (data.success) {
						dispatch(userLoggedIn({
							accessToken: data?.accessToken,
							user: data?.payload
						}));
					}
				} catch (e: any) {
					dispatch(userLoggedOut());

					/**
					 * @summary      if dispatch(api.util.resetApiState()) is on than my error are not catch in mutation example
					 *               const [login, {isError,error,data}] = useLoginMutation()
					 *               isError, error and data is undefined if I'm using here  dispatch(api.util.resetApiState())
					 *               so, that's why this is comment ... Only use in Logout function
					 * */
					// dispatch(api.util.resetApiState());
				}
			}
		}),

		/**
		 * @summary Get current authenticated user details
		 * @description Retrieves information about the currently logged-in user
		 * @method GET
		 * @path /user/user-info
		 * @security Cookie-based authentication
		 * @returns {User} User object with profile data
		 * @throws {401} Unauthorized - Invalid or expired credentials
		 */
		getCurrentUser: builder.query({
			query: () => ({
				url: "/user/user-info",
				method: "GET",
				credentials: "include",
				headers: {
					"Cache-Control": "no-cache",
					"Pragma": "no-cache"
				}
			}),
			keepUnusedDataFor: 0,
			providesTags: ["User"],
			onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
				try {
					const {data} = await queryFulfilled;
					if (data && data.success) {
						dispatch(userLoggedIn({
							accessToken: "",
							user: data?.payload
						}));
					}
				} catch (e: any) {
					dispatch(userLoggedOut());
					// dispatch(api.util.resetApiState());
				}
			}
		}),

		/**
		 * @summary Log out current user
		 * @description Invalidates user session and clears authentication cookies
		 * @method POST
		 * @path /user/logout
		 * @security Cookie-based authentication
		 * @returns {object} Success status object
		 * @throws {401} Unauthorized - No active session
		 */
		logOut: builder.mutation({
			query: () => ({
				url: "/user/logout",
				method: "POST",
				credentials: "include"
			}),
			invalidatesTags: ["User"],
			onQueryStarted: async (_, {dispatch, queryFulfilled}) => {
				try {
					const {data} = await queryFulfilled;
					if (data && data.success) {
						dispatch(userLoggedOut());
						dispatch(api.util.resetApiState());
					}
				} catch (e) {
					console.log("authApi logout error", e);
				}
			}
		})
	}),
	overrideExisting: false
});


/**
 * Initializes authentication state on app load
 * @param {any} store - Redux store instance
 */
export const initializeAuth = async (store: any) => {
	try {
		await store.dispatch(authApi.endpoints.getCurrentUser.initiate(undefined, {forceRefetch: true}));
	} catch (error: any) {
		store.dispatch(userLoggedOut());
		store.dispatch(api.util.resetApiState());
	}
};


export const {
	useRegisterMutation,
	useActivationMutation,
	useLoginMutation,
	useLogOutMutation
} = authApi;