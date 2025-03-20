import {api} from "../api.ts";
import {IResponse} from "../../../types/@types.ts";

export const customizationApi = api.injectEndpoints({
	endpoints: (builder) => ({


      /**
	   * @summary       Get Banner
	   * @description   Retrieves the banner layout
	   * @method        GET
	   * @path          /layout/get-layout?type=${type}
	   * @security      Public
	   * @param {string} type - Type of layout to fetch
	   * @returns {IResponse} Response object containing the banner layout
	   *
      * */
		getBanner: builder.query<IResponse, string>({
			query: (type) => ({
				url: `/layout/get-layout?type=${type}`,
				method: "GET",
				credentials: "include" as RequestCredentials,
			}),
		  providesTags: ["Customization"],
			// providesTags: (result) => result ? [{type:"Customization", id:result?.payload?.type}] : ["Customization"],
		}),

		/**
		 * @summary       Create Banner
		 * @description   Create a new banner layout
		 * @method        POST
		 * @path          /layout/create
		 * @security      Private
		 * @param {object} data - Banner creation data
		 * @returns {IResponse} Response object containing the banner creation status
		 */
		createBanner: builder.mutation<IResponse, any>({
			query: (data) => ({
				url: "/layout/create",
				method: "POST",
				body: data,
				credentials: "include" as RequestCredentials,
			}),
			invalidatesTags: ["Customization"],
		}),


        /**
		 * @summary       Update Banner
		 * @description   Update an existing banner layout
		 * @method        PUT
		 * @path          /layout/update-banner/:bannerId
		 * @security      Private
		 * @param {string} bannerId - ID of the banner to update
		 * @param {object} data - Updated banner data
		 * @returns {IResponse} Response object containing the banner update status
		 *
        * */
		updateBanner:builder.mutation<IResponse, any>({
			query: ({bannerId,data})=> ({
				url: `layout/update-banner/${bannerId}`,
				method:"PUT",
				body:data,
				credentials: "include" as RequestCredentials,
			}),
			invalidatesTags: ["Customization"],
		})
	}),
});

export const {useCreateBannerMutation, useGetBannerQuery ,useUpdateBannerMutation} = customizationApi;
