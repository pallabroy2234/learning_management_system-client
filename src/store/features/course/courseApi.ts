import {api} from "../api.ts";
import {ICreateCourseRequest} from "./courseType.ts";
import {IResponse} from "../../../types/@types.ts";

export const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		/**
		 * @summary       Get Video URL
		 * @description   Retrieves the VdoCipher OTP for accessing a course video
		 * @method        POST
		 * @path          /course/getVdoCipherOTP
		 * @security      Public
		 * @param {GetVideoUrlRequest} data - Request data for fetching the video OTP
		 * @returns {GetVideoUrlResponse} Response object containing the video OTP
		 */
		getVideoUrl: builder.mutation({
			query: (data) => ({
				url: "/course/getVdoCipherOTP",
				method: "POST",
				body: data,
				credentials: "include" as RequestCredentials,
			}),
		}),



		/**
		 * @summary       Create Course
		 * @description   Create a new course
		 * @method        POST
		 * @path          /course/create
		 * @security      Private
		 * @param {ICreateCourseRequest} data - Course creation data
		 * @returns {IResponse} Response object containing the course creation status
		* */
		createCourse: builder.mutation<IResponse, ICreateCourseRequest>({
			query: (data)=> ({
				url: "/course/create",
				method:"POST",
				body:data,
				credentials: "include" as RequestCredentials,
			}),
			invalidatesTags: ["Course"],
		})
	}),
});

export const {useCreateCourseMutation} = userApi;
