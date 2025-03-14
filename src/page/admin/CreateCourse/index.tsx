import SEO from "../../../components/shared/SEO.tsx";
import {useState} from "react";
import {combinedSchema, courseContentSchema, courseInfoSchema, requirementsSchema} from "../../../schema/courseSchema.tsx";
import {FormProvider, Resolver, useForm} from "react-hook-form";
import {ICourseFormValues} from "../../../types/@types.ts";
import {yupResolver} from "@hookform/resolvers/yup";
import Stepper from "./components/Stepper.tsx";
import {AnimatePresence} from "framer-motion";
import CourseInformation from "./components/CourseInformation.tsx";
import CourseRequirements from "./components/CourseRequirements.tsx";
import CourseContent from "./components/CourseContent.tsx";
import CoursePreview from "./components/CoursePreview.tsx";

const CreateCourse = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const steps = ["Basic Info", "Requirements", "Course Content", "Preview"];
	const stepsSchemas = [courseInfoSchema, requirementsSchema, courseContentSchema, combinedSchema];

	const methods = useForm<ICourseFormValues>({
		defaultValues: {
			thumbnail: "",
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
					// links: [{title: "", url: ""}],
				},
			],
		},
		mode: "onChange",
		resolver: yupResolver(stepsSchemas[currentStep] as any) as Resolver<ICourseFormValues>,
		shouldUnregister: false,
	});

	const handleNext = async () => {
		const isValid = await methods.trigger();
		if (isValid) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		setCurrentStep((prev) => prev - 1);
	};

	const onSubmit = (data: any) => {
		console.log(data);
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
								{/* Course Step Menu */}
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
												disabled={!methods.formState.isValid}
												className={`${!methods.formState.isValid ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} px-8 py-2 350px:order-2 order-1  text-white rounded-lg transition-colors`}>
												Submit
											</button>
										)}
									</div>
								</div>
							</form>
						</FormProvider>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CreateCourse;
