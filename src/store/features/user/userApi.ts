import {api} from "../api.ts";
import {IResponse, IUpdateUserInfoRequest} from "./userTypes.ts";


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
				credentials: "include" as RequestCredentials
			}),
			invalidatesTags: ["User"]
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
				body: data
			}),
			invalidatesTags: ["User"]
		})
	})
});


export const {useUploadProfileImageMutation, useUpdateUserInfoMutation} = userApi;