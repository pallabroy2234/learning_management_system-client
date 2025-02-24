import {api} from "../api.ts";
import {ICreatePasswordSocialAuthRequest, IResponse, IUpdateUserInfoRequest} from "./userTypes.ts";

export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		/**
		 * @summary       Upload user profile image
		 * @description   Upload user profile image
		 * @method        POST
		 * @path          /user/update-avatar
		 * @security      Private
		 * */
		uploadProfileImage: builder.mutation({
			query: (data) => ({
				url: "/user/update-avatar",
				method: "POST",
				body: data,
				credentials: "include" as RequestCredentials,
			}),
			invalidatesTags: ["User"],
		}),

		/**
		 * @summary       Update user info
		 * @description   Update user info
		 * @method        PUT
		 * @path          /user/update-info
		 * @security      Private
		 * */
		updateUserInfo: builder.mutation<IResponse, IUpdateUserInfoRequest>({
			query: (data) => ({
				url: "/user/update-info",
				method: "PUT",
				credentials: "include" as RequestCredentials,
				body: data,
			}),
			invalidatesTags: ["User"],
		}),

		/**
		 * @summary       Create password social auth
		 * @description   Create password social auth
		 * @method        POST
		 * @path          /user/create-password
		 * @security      Private
		 * */
		createPasswordSocialAuth: builder.mutation<IResponse, ICreatePasswordSocialAuthRequest>({
			query: ({newPassword, confirmPassword}) => ({
				url: "/user/create-password",
				method: "POST",
				credentials: "include" as RequestCredentials,
				body: {
					newPassword,
					confirmPassword,
				},
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useUploadProfileImageMutation,
	useUpdateUserInfoMutation,
	useCreatePasswordSocialAuthMutation,
} = userApi;
