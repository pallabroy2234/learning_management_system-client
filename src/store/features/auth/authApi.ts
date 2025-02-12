import {api} from "../api.ts";
import {userLoggedIn, userRegistration} from "./authSlice.ts";
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
		 * @description       Register a new user
		 * @route             POST /user/register
		 * @access            Public
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
		 * @description       Activate a user account
		 * @route             POST /user/activate-user
		 * @access            Public
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
		 * @description       Login a user
		 * @route             POST /user/login
		 * @access            Public
		 * @param             email, password
		 * */

		login: builder.mutation<LoginResponse, ILoginRequest>({
			query: ({email, password}) => ({
				url: "user/login",
				method: "POST",
				credentials: "include",
				body: {
					email,
					password
				}
			}),
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
					// console.log("authApi login error", e.message);
					console.log("authApi login error", e);
				}
			}
		})
	}),
	overrideExisting: false
});

export const {
	useRegisterMutation,
	useActivationMutation,
	useLoginMutation
} = authApi;