import SEO from "../../../components/shared/SEO.tsx";
import {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {CustomError, ICourseFormValues} from "../../../types/@types.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import {
	useGetCourseByIdQuery, useUpdateCourseMutation
} from "../../../store/features/course/courseApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import CourseInformation from "./components/CourseInformation.tsx";
import {combinedSchema, courseContentSchema, courseInfoSchema, requirementsSchema} from "../../../schema/courseSchema.tsx";
import {ThreeDots} from "react-loader-spinner";
import Stepper from "../CreateCourse/components/Stepper.tsx";
import CourseRequirements from "../CreateCourse/components/CourseRequirements.tsx";
import CourseContent from "../CreateCourse/components/CourseContent.tsx";
import CoursePreview from "../CreateCourse/components/CoursePreview.tsx";
import toast from "react-hot-toast";
import {DevTool} from "@hookform/devtools";



const EditCourse = () => {
	const {courseId} = useParams();
	const navigation = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const steps = ["Basic Info", "Requirements", "Course Content", "Preview"];
	const stepsSchemas = [courseInfoSchema, requirementsSchema, courseContentSchema, combinedSchema];

	const [updateCourseByAdmin,{isLoading:isUpdateLoading, isSuccess:isUpdateSuccess,isError:isUpdateError,error:updateError,data:updateData}]= useUpdateCourseMutation()



	// API Call
	const {
		data: singleCourse,
		isSuccess: isCourseDataSuccess,
		isError: isCourseDataError,
		error: courseDataError,
	} = useGetCourseByIdQuery(courseId as string);

	/**
	 * @summary Form Methods
	 * @description Form methods for handling form state and validation
	 * @param {ICourseFormValues} - Course form values
	 * @returns {void}
	 * @method useForm
	 * */
	const methods = useForm<ICourseFormValues>({
		defaultValues: {
			thumbnail: undefined,
			name: "",
			price: undefined,
			estimatedPrice: undefined,
			tags: "",
			level: "",
			description: "",
			benefits: [{title: ""}],
			prerequisites: [{title: ""}],
			demoUrl: "",
			courseData: [
				{
					title: "",
					videoSection: "",
					videoUrl: "",
					videoLength: undefined,
					videoPlayer: "",
					suggestion: "",
					videoDescription: "",
					links: [],
				},
			],
		},
		mode: "onChange",
		resolver: yupResolver(stepsSchemas[currentStep] as any),
		shouldUnregister: false,
	});



	/**
	 * @summary Reset form with fetched course data
	 * @description When course data is successfully fetched, reset the form with the fetched data
	 * @param {boolean} isCourseDataSuccess - Indicates if the course data fetch was successful
	 * @param {object} singleCourse - The fetched course data
	 * @returns {void}
	 */
  	useEffect(() => {
		if (isCourseDataSuccess && singleCourse) {
			const data = singleCourse?.payload;
			methods.reset({
				thumbnail: data.thumbnail,
				name: data.name,
				price: data.price,
				estimatedPrice: data.estimatedPrice,
				tags: data.tags,
				level: data.level,
				description: data.description,
				demoUrl: data.demoUrl,
				benefits: data.benefits,
				prerequisites: data.prerequisites,
				courseData: data.courseData,
			});
			// setExistingThumbnail(thumbnail);
		}
	}, [isCourseDataSuccess, methods, singleCourse]);


	/**
	 * @summary Handle course data fetch error
	 * @description Display an error toast message if there is an error fetching the course data
	 * @param {boolean} isCourseDataError - Indicates if there was an error fetching the course data
	 * @param {object} courseDataError - The error object containing details about the fetch error
	 * @returns {void}
	 */
	useEffect(() => {
		if(isCourseDataError){
			if("data" in courseDataError){
				const err = courseDataError as CustomError;
				const message = err.data.message || "An error occurred";
				toast.error(message);
			}
		}
	}, [isCourseDataError, courseDataError]);


	/**
	 * @summary Handle form submission
	 * @description Handles the form submission, prepares the form data, and makes an API call to update the course
	 * @param {any} data - The form data
	 * @returns {Promise<void>}
	 */
	const onSubmit = async (data: any) => {
		const formData = new FormData();
		if (data) {
			//  course Information
           formData.append("thumbnail", data.thumbnail[0] || data.thumbnail.public_id);
			formData.append("name", data.name);
			formData.append("price", data.price);
			formData.append("estimatedPrice", data.estimatedPrice);
			formData.append("tags", data.tags);
			formData.append("level", data.level);
			formData.append("description", data.description);
			formData.append("demoUrl", data.demoUrl);

			// 	course Requirements

			data.benefits.forEach((item: any, index: number) => {
				formData.append(`benefits[${index}][title]`, item.title);
			});

			data.prerequisites.map((item: any, index: number) => {
				formData.append(`prerequisites[${index}][title]`, item.title);
			});

			// 	course content
			data.courseData.map((item: any, index: number) => {
				formData.append(`courseData[${index}][title]`, item.title);
				formData.append(`courseData[${index}][videoDescription]`, item.videoDescription);
				formData.append(`courseData[${index}][videoUrl]`, item.videoUrl);
				formData.append(`courseData[${index}][videoSection]`, item.videoSection);
				formData.append(`courseData[${index}][videoLength]`, item.videoLength);
				formData.append(`courseData[${index}][videoPlayer]`, item.videoPlayer);
				formData.append(`courseData[${index}][suggestion]`, item.suggestion);
				item.links.map((link: any, linkIndex: number) => {
					formData.append(`courseData[${index}][links][${linkIndex}][title]`, link.title);
					formData.append(`courseData[${index}][links][${linkIndex}][url]`, link.url);
				});
			});

			// Api Call
			await updateCourseByAdmin({courseId:courseId as string,data:formData as any});
			// await updateCourseByAdmin(formData as any);

		}
	};



	/**
	 * @summary Handle update success and error
	 * @description Handle update success and error messages after updating the course
	 * @param {void} - No params
	 * */
	useEffect(() => {
		if(isUpdateSuccess){
			const message = updateData?.message || "Course updated successfully";
			toast.success(message);
			navigation("/admin/dashboard/content/courses");

		}
		if(isUpdateError){
			if("data" in updateError){
				const err = updateError as CustomError;
				const message = err.data.message || "An error occurred";
				toast.error(message);
			}
		}
	}, [isUpdateError, isUpdateSuccess, updateError, updateData]);



	/**
	 * @summary Handle next step
	 * @description Handle next step in the course creation process
	 * @param {void} - No params1
	 * */
	const handleNext = async () => {
		const isValid = await methods.trigger();
		if (isValid) {
			setCurrentStep((prev) => prev + 1);
		}
	};


	/**
	 * @summary Handle back step
	 * @description Handle previous step in the course creation process
	 * @param {void} - No params
	 * @returns {void}
	 * */
	const handleBack = () => {
		setCurrentStep((prev) => prev - 1);
	};

	return (
		<div>
			<SEO
				title='Create Course | Learning Management System'
				description='Easily create and manage courses with our intuitive course builder. Add lessons, quizzes, and course materials effortlessly.'
				keywords={["create course", "course builder", "LMS course creation", "online teaching", "course management", "lesson planning"]}
				ogTitle='Create Course - Build & Manage Online Courses'
				ogDescription='Design and publish courses with ease using our powerful Learning Management System. Add lessons, quizzes, and interactive content.'
				ogImage='/create-course.png'
				ogUrl={`${window.location.origin}/create-course`}
			/>

			{/* Form Handle */}
			<div className='mt-[100px]'>
				<div className='px-4 500px:px-6 mx-auto'>
					<div className='py-[30px] flex justify-center items-center  mt-[80px]'>
						<Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
					</div>
					<div className='mt-[50px]'>
						<FormProvider {...methods}>
							<form
								onSubmit={methods.handleSubmit(onSubmit)}
								className='p-6  border dark:bg-slate-800 border-gray-300 dark:border-slate-700/80 rounded pb-[80px] mb-[100px]'>
								<div>
									<AnimatePresence mode='sync'>
										{currentStep === 0 && <CourseInformation />}
										{currentStep === 1 && <CourseRequirements />}
										{currentStep === 2 && <CourseContent />}
										{currentStep === 3 && <CoursePreview />}
									</AnimatePresence>
								</div>

								<div className='1200px:w-[65%] 1000px:w-[90%]  w-[100%] mx-auto mt-10'>
									<div className='flex 350px:flex-row flex-col 350px:justify-between gap-6 350px:gap-0 mt-8'>
										{currentStep !== 0 && (
											<button
												type='button'
												onClick={handleBack}
												className='px-6 py-2 text-slate-600 350px:order-1 order-2 dark:text-gray-300 hover:bg-gray-100  dark:hover:bg-gray-700 rounded-lg transition-colors border dark:border-slate-700 border-gray-300'>
												Back to Edit
											</button>
										)}
										{currentStep !== 3 && (
											<button
												type='button'
												disabled={!methods.formState.isValid}
												onClick={handleNext}
												className={`${!methods.formState.isValid ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} px-10 py-2   350px:order-2 order-1   text-white rounded-lg transition-colors`}>
												Next
											</button>
										)}
										{currentStep === 3 && (
											<button
												type='submit'
												disabled={!methods.formState.isValid || isUpdateLoading || methods.formState.isSubmitting}
												className={`${!methods.formState.isValid ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} px-8 py-2 350px:order-2 order-1  text-white rounded-lg transition-colors disabled:cursor-not-allowed ${!methods.formState.isValid ? "cursor-not-allowed" : "cursor-pointer"}`}>
												{isUpdateLoading ?  <ThreeDots height="20" width="40" radius="9" color="#fff" /> : "Submit"}
											</button>
										)}
									</div>
								</div>
							</form>
						</FormProvider>
					</div>
				</div>
			</div>
			<DevTool control={methods.control}/>
		</div>
	);
};
export default EditCourse;
