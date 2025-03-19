import {api} from "../api.ts";

export const customizationApi = api.injectEndpoints({
	endpoints: (builder) => ({
     createBanner : builder.mutation({
		 query: (data)=> ({
			 url:"/layout/create",
			 method:"POST",
			 body:data,
			 credentials:"include" as RequestCredentials
		 }),
		 invalidatesTags:["Customization"],
	 })
	}),
});

export const {useCreateBannerMutation} = customizationApi;
