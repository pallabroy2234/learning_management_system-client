import {api} from "../api.ts";
import {ICreateCourseRequest} from "./courseType.ts";
import {IResponse} from "../../../types/@types.ts";

export const courseApi = api.injectEndpoints({
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
			providesTags: (result) =>  result ? [...result.payload.map(({_id}:any) => ({type:"Course", id:_id}))] : ["Course"]
		}),


		/**
		 * @summary       Get Course By ID
		 * @description   Retrieves a course by ID
		 * @method        GET
		 * @path          /course/:courseId
		 * @security      Private
		 * @param {string} courseId - The ID of the course to retrieve
		 * @returns {IResponse} Response object containing the course data
		 * @tags          Course
		 *
		* */
		getCourseById: builder.query<IResponse, string>({
			 query: (courseId)=> ({
				 url: `/course/get-course/${courseId}`,
				 method: "GET",
				 credentials: "include" as RequestCredentials,
			 }),
			providesTags: (result)=> [{type:"Course", id:result?.payload?._id}]
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
		}),


		/**
		 * @summary       Update Course
		 * @description   Update a course by ID as an admin
		 * @method        PUT
		 * @path          /course/update/:courseId
		 * @security      Private
		 * @param {string} courseId - The ID of the course to update
		 * @param {object} data - The updated course data
		 * @returns {IResponse} Response object containing the course update status
		 */

		updateCourse: builder.mutation<IResponse, any>({
			query:({courseId, data})=> ({
				url:`/course/update/${courseId}`,
				method:"PUT",
				body:data,
				credentials:"include" as RequestCredentials,
			}),
			invalidatesTags: (_result,_error,arg) => [{type:"Course", id:arg.courseId}],
		}),

	}),
});

export const {useCreateCourseMutation,useGetCoursesQuery , useDeleteCourseByAdminMutation,useGetCourseByIdQuery,useUpdateCourseMutation} = courseApi;
