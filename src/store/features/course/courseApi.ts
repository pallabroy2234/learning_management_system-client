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
			invalidatesTags: [{type:"Course", id:"LIST"}],
		}),


		/**
		 * @summary       Get Courses
		 * @description   Retrieves all courses
		 * @method        GET
		 * @path          /course/get-all-courses/admin
		 * @security      Private
		 * @returns {IResponse} Response object containing the list of courses
		* */
		getCourses: builder.query({
			query: ()=> ({
				url: "/course/get-all-courses/admin",
				method: "GET",
				credentials: "include" as RequestCredentials,
			}),
			providesTags: (result)=> [
				{type:"Course", id:"LIST"},
				// ...result.map(({ _id }:any) => ({ type: 'Course', id: _id })),
				...(result?.payload?.map(({_id}:any)=> ({type:"Course", id:_id})) || [])
			]
		}),



		/**
		 * @summary       Delete Course
		 * @description   Delete a course by ID as an admin
		 * @method        DELETE
		 * @path          /course/course-delete/:courseId
		 * @security      Private
		 * @param {string} courseId - The ID of the course to delete
		 * @returns {IResponse} Response object containing the course deletion status
		* */
		deleteCourseByAdmin: builder.mutation<IResponse, string>({
			query:(courseId)=> ({
				url:`/course/course-delete/${courseId}`,
				method:"DELETE",
				credentials:"include" as RequestCredentials,
			}),
			invalidatesTags: [{type:"Course", id:"LIST"}],
		})
	}),
});

export const {useCreateCourseMutation,useGetCoursesQuery , useDeleteCourseByAdminMutation} = userApi;
