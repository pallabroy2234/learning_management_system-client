import {api} from "../api.ts";
import {
	ICreatePasswordSocialAuthRequest,
	IResponse,
	IUpdatePasswordRequest,
	IUpdateUserInfoRequest,
} from "./userTypes.ts";

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

		/**
		 * @summary            Update password
		 * @description        Update password
		 * @method             PUT
		 * @path               /user/update-password
		 * @security           Private
		 * @invalidateTags     User
		* */
		updatePassword: builder.mutation<IResponse, IUpdatePasswordRequest>({
			query: (data) => ({
				url: "/user/update-password",
				method: "PUT",
				credentials: "include" as RequestCredentials,
				body: data,
			}),
			invalidatesTags: ["User"]
		}),

		/**
		 * @summary       Get all users by admin
		 * @description   Get all users by admin
		 * @method        GET
		 * @path          /user/get-all-users/admin
		 * @security      Private
		 * @tags          User
		 *
		* */

		getAllUsersByAdmin: builder.query({
			query: ()=> ({
				url: "/user/get-all-users/admin",
				method: "GET",
				credentials: "include" as RequestCredentials,
			}),
			providesTags: (result) => [
				{ type: "User", id: "LIST" },
				...(result?.payload?.map(({ _id }:any) => ({ type: "User", id: _id })) || []),
			],
		})
	}),
});

export const {
	useUploadProfileImageMutation,
	useUpdateUserInfoMutation,
	useCreatePasswordSocialAuthMutation,
	useUpdatePasswordMutation,
	useGetAllUsersByAdminQuery
} = userApi;
