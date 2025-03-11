import {FC, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {FiInfo, FiTrash} from "react-icons/fi";
import {useFieldArray, useFormContext} from "react-hook-form";
import {MdKeyboardArrowDown} from "react-icons/md";
import {ICourseContentErrors} from "../../../../types/@types.ts";
import {CgMathPlus} from "react-icons/cg";
import CourseLinks from "./CourseLinks.tsx";

interface IProps {
	setStep: (step: number) => void;
}

const CourseContent: FC<IProps> = ({setStep}) => {
	const [activeIndex, setActiveIndex] = useState<number | null | string>(0);

	const {
		register,
		trigger,
		control,
		formState: {errors, isValid},
	} = useFormContext();
	const err = errors?.courseData as ICourseContentErrors;

	// * ============================= Course Data Field Array ============================ * //
	const {
		fields: courseDataField,
		append: courseDataAppend,
		remove: courseDataRemove,
	} = useFieldArray({
		control,
		name: "courseData",
		shouldUnregister: false,
	});

	const handlePrevious = () => {
		setStep(1);
	};

	const handleNext = async () => {
		const isValid = await trigger();
		if (isValid) {
			setStep(3);
		}
	};

	// * ============================= Animations ============================ * //

	const accordionAnimation = {
		open: {
			opacity: 1,
			height: "auto",
			transition: {
				duration: 0.4,
				ease: "easeInOut",
			},
		},
		closed: {
			opacity: 0,
			height: 0,
			transition: {
				duration: 0.4,
				ease: "easeInOut",
			},
		},
	};

	const initialAnimation = {
		initial: {y: -15, opacity: 0},
		animate: {y: 0, opacity: 1},
		exit: {
			opacity: 0,
			x: -20,
		},
	};

	const errorInputAnimation = (hasError: any) => {
		return {
			initial: {x: 0},
			animate: hasError ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0},
			transition: {duration: 0.5},
		};
	};
	const errorMessageAnimation = {
		initial: {opacity: 0, x: 15},
		animate: {opacity: 1, x: 0},
		exit: {opacity: 0, x: -15},
	};

	return (
		<motion.div {...initialAnimation}  className='1200px:w-[65%] 1000px:w-[90%]  w-[100%] mx-auto'>
			{/* ----------------------- Heading ------------------------ */}
			<motion.div className='400px:text-2xl text-lg font-bold mb-6 dark:text-white flex items-center'>
				<FiInfo className='inline-block mr-2 text-purple-500 dark:text-purple-400 ' />
				<h2>Course Content</h2>
			</motion.div>

			{/* ----------------------- Form Body ------------------------ */}

			<motion.div className='flex  flex-col gap-5' {...initialAnimation}>
				<AnimatePresence>
					{courseDataField.map((item, index) => {
						return (
							<motion.div
								initial={{opacity:0, y:15}}
								animate={{opacity:1, y:0}}
								exit={{opacity:0, x:-15}}
								key={item.id}
								className='flex flex-col gap-5'>
								<div className='dark:bg-slate-600 bg-gray-100 flex justify-center items-center rounded-md'>
									{/* Accordion Button  */}
									<button
										type='button'
										onClick={() => setActiveIndex(activeIndex === index ? null : index)}
										className='w-full flex justify-between  items-center p-3'>
										<span className='500px:text-lg text-base'>Lesson - {index + 1}</span>
										<motion.div animate={{rotate: activeIndex === index ? 180 : 0}} transition={{duration: 0.2}}>
											<MdKeyboardArrowDown className='text-2xl' />
										</motion.div>
									</button>

									{/*  Trash Button */}
									<div className='mr-3'>
										{
											courseDataField.length > 1 && (
												<motion.button
													onClick={() => courseDataRemove(index)}
													type='button'>
													<div className='bg-red-400 py-2 px-2 rounded-lg text-white'>
														<FiTrash className='text-lg' />
													</div>
												</motion.button>
											)
										}
									</div>
								</div>

								{/* Form Body  */}
								<motion.div
									initial={false}
									animate={activeIndex === index ? "open" : "closed"}
									variants={accordionAnimation}
									className='overflow-hidden flex  flex-col gap-6'>
									{/* Video Title and Video Section */}
									<div className='flex 800px:flex-row flex-col 800px:gap-6 gap-5'>
										<div className='flex flex-col gap-2 w-full'>
											<label htmlFor={`courseData${index}.title`} className='dark:text-slate-400 text-gray-600'>
												Video Title <span className='text-red-500'>*</span>
											</label>
											<motion.input
												{...register(`courseData.${index}.title`)}
												{...errorInputAnimation(err?.[index]?.title)}
												type='text'
												placeholder='Enter Video Title'
												className={`${err?.[index]?.title ? "border-red-500" : "dark:border-slate-500 border-gray-400"}  focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
											/>
											{err?.[index]?.title && (
												<motion.div {...errorMessageAnimation} className='text-red-500 text-sm'>
													<p>{err?.[index]?.title?.message}</p>
												</motion.div>
											)}
										</div>

										<div className='flex flex-col gap-2 w-full'>
											<label htmlFor={`courseData${index}.videoSection`} className='dark:text-slate-400 text-gray-600'>
												Video Section<span className='text-red-500'>*</span>
											</label>
											<motion.input
												{...register(`courseData.${index}.videoSection`)}
												{...errorInputAnimation(err?.[index]?.videoSection)}
												type='text'
												placeholder='Introduction, Demo, etc'
												className={`${err?.[index]?.videoSection ? "border-red-500" : "dark:border-slate-500 border-gray-400"}  focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
											/>
											{err?.[index]?.videoSection && (
												<motion.div {...errorMessageAnimation} className='text-red-500 text-sm'>
													<p>{err?.[index]?.videoSection?.message}</p>
												</motion.div>
											)}
										</div>
									</div>

									{/*  Video URL and Video Length */}
									<div className='flex 800px:flex-row flex-col 800px:gap-6 gap-5'>
										<div className='flex flex-col gap-2 w-full'>
											<label htmlFor={`courseData${index}.videoUrl`} className='dark:text-slate-400 text-gray-600'>
												Video URL <span className='text-red-500'>*</span>
											</label>
											<motion.input
												{...register(`courseData.${index}.videoUrl`)}
												{...errorInputAnimation(err?.[index]?.videoUrl)}
												type='text'
												placeholder='https://www.youtube.com'
												className={`${err?.[index]?.videoUrl ? "border-red-500" : "dark:border-slate-500 border-gray-400"}  focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
											/>
											{err?.[index]?.videoUrl && (
												<motion.div {...errorMessageAnimation} className='text-red-500 text-sm'>
													<p>{err?.[index]?.videoUrl?.message}</p>
												</motion.div>
											)}
										</div>

										<div className='flex flex-col gap-2 w-full'>
											<label htmlFor={`courseData${index}.videoLength`} className='dark:text-slate-400 text-gray-600'>
												Video Length<span className='text-red-500'>*</span>
											</label>
											<motion.input
												{...register(`courseData.${index}.videoLength`, {
													setValueAs: (value) => (value === "" ? undefined : Number(value)),
												})}
												onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
												{...errorInputAnimation(err?.[index]?.videoLength)}
												type='number'
												placeholder='18.43'
												className={`${err?.[index]?.videoLength ? "border-red-500" : "dark:border-slate-500 border-gray-400"}  focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
											/>
											{err?.[index]?.videoLength && (
												<motion.div {...errorMessageAnimation} className='text-red-500 text-sm'>
													<p>{err?.[index]?.videoLength?.message}</p>
												</motion.div>
											)}
										</div>
									</div>

									{/*  Suggestion and Video Player  */}

									<div className='flex 800px:flex-row flex-col 800px:gap-6 gap-5'>
										<div className='flex flex-col gap-2 w-full'>
											<label htmlFor={`courseData${index}.suggestion`} className='dark:text-slate-400 text-gray-600'>
												Suggestion
											</label>
											<motion.input
												{...register(`courseData.${index}.suggestion`)}
												{...errorInputAnimation(err?.[index]?.suggestion)}
												type='text'
												placeholder='Practive more to better understand'
												className={`${err?.[index]?.suggestion ? "border-red-500" : "dark:border-slate-500 border-gray-400"}  focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
											/>
											{err?.[index]?.suggestion && (
												<motion.div {...errorMessageAnimation} className='text-red-500 text-sm'>
													<p>{err?.[index]?.suggestion?.message}</p>
												</motion.div>
											)}
										</div>
										<div className='flex flex-col gap-2 w-full'>
											<label htmlFor={`courseData${index}.videoPlayer`} className='dark:text-slate-400 text-gray-600'>
												Video Player<span className='text-red-500'>*</span>
											</label>
											<motion.input
												{...register(`courseData.${index}.videoPlayer`)}
												{...errorInputAnimation(err?.[index]?.videoPlayer)}
												type='text'
												placeholder='Youtube, Vimeo, etc'
												className={`${err?.[index]?.videoPlayer ? "border-red-500" : "dark:border-slate-500 border-gray-400"}  focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
											/>
											{err?.[index]?.videoPlayer && (
												<motion.div {...errorMessageAnimation} className='text-red-500 text-sm'>
													<p>{err?.[index]?.videoPlayer?.message}</p>
												</motion.div>
											)}
										</div>
									</div>

									<div className='flex flex-col gap-2 w-full'>
										<label htmlFor={`courseData${index}.videoDescription`} className='dark:text-slate-400 text-gray-600'>
											Video Description<span className='text-red-500'>*</span>
										</label>
										<motion.textarea
											{...register(`courseData.${index}.videoDescription`)}
											{...errorInputAnimation(err?.[index]?.videoDescription)}
											rows={8}
											className={`${err?.[index]?.videoDescription ? "border-red-500" : "dark:border-slate-500 border-gray-400"}  focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded resize-none`}
										/>
										{err?.[index]?.videoDescription && (
											<motion.div {...errorMessageAnimation} className='text-red-500 text-sm'>
												<p>{err?.[index]?.videoDescription?.message}</p>
											</motion.div>
										)}
									</div>

									{/*Link Content*/}
									<div className='mt-3'>
										<CourseLinks index={index} control={control} register={register} err={err} />
									</div>
								</motion.div>

								<div className='w-full border-[1px]  my-4 border-y-gray-300 dark:border-gray-600 '></div>
							</motion.div>
						);
					})}

					<motion.button
						type='button'
						onClick={() =>
							courseDataAppend({
								title: "",
								videoSection: "",
								videoUrl: "",
								videoLength: undefined,
								videoPlayer: "",
								suggestion: "",
								videoDescription: "",
								links: [],
							})
						}
						className='bg-blue-400 text-white py-[10px]  rounded-md flex items-center justify-center gap-2 400px:text-base text-sm'>
						<span>
							<CgMathPlus />
						</span>
						<span>Add Lesson</span>
					</motion.button>
				</AnimatePresence>
			</motion.div>

			<div className='flex justify-between mt-10 items-center'>
				<motion.button
					onClick={handlePrevious}
					whileHover={{scale: 1.05}}
					whileTap={{scale: 0.9}}
					type='button'
					className={`bg-transparent 600px:px-[100px] 400px:px-[50px] px-8 py-2  rounded border border-blue-500 text-blue-500 dark:text-white 600px:text-base text-sm`}>
					Previous
				</motion.button>
				<motion.button
					disabled={!isValid}
					onClick={handleNext}
					whileHover={!isValid ? {scale: 1} : {scale: 1.05}}
					whileTap={!isValid ? {scale: 1} : {scale: 0.95}}
					type='button'
					className={`${isValid ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400 cursor-not-allowed"}  600px:px-[100px] 400px:px-[50px] px-8 py-2  rounded text-white 600px:text-base text-sm`}>
					Next
				</motion.button>
			</div>
		</motion.div>
	);
};
export default CourseContent;


