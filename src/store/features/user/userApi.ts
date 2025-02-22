import {api} from "../api.ts";


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
				credentials: "include"
			}),
			invalidatesTags: ["User"]
		})
	})
});


export const {useUploadProfileImageMutation} = userApi;