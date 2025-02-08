import {api} from "../api.ts";
import {userRegistration} from "./authSlice.ts";
import {ActivationRequest, ActivationResponse, RegistrationRequest, RegistrationResponse} from "./authTypes.ts";


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

		/**/
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
		})

	}),
	overrideExisting: false
});

export const {useRegisterMutation, useActivationMutation} = authApi;