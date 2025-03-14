import {AnimatePresence, motion} from "framer-motion";
import {FiInfo} from "react-icons/fi";
import {useFieldArray, useFormContext} from "react-hook-form";
import {ICourseFormErrors} from "../../../../types/@types.ts";
import {AiOutlinePlus} from "react-icons/ai";
import {MdDelete} from "react-icons/md";


const CourseRequirements = () => {
	const {
		register,
		formState: {errors},
		control,
	} = useFormContext();
	const err = errors as ICourseFormErrors;

	/**
	 * @summary    Benefits Field Array
	 * @description    Field Array for benefits
	 *
	* */
	const {
		fields: benefitsFields,
		append: benefitsAppend,
		remove: benefitsRemove,
	} = useFieldArray({
		control,
		name: "benefits",
		shouldUnregister: false,
	});

	/**
	 * @summary    Prerequisites Field Array
	 * @description    Field Array for prerequisites
	* */
	const {
		fields: prerequisitesFields,
		append: prerequisitesAppend,
		remove: prerequisitesRemove,
	} = useFieldArray({
		control,
		name: "prerequisites",
		shouldUnregister: false,
	});

	/**
	 *@summary    Animation
	 * */
	const errorInputAnimation = (hasError: any) => {
		return {
			initial: {x: 0},
			animate: hasError ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0},
			transition: {duration: 0.5},
		};
	};

	const errorTextAnimation = {
		initial: {opacity: 0, x: 15},
		animate: {opacity: 1, x: 0},
		exit: {
			opacity: 0,
			x: 15,
		},
	};

	const itemVariants = {
		hidden: {opacity: 0, y: 10},
		visible: {opacity: 1, y: 0},
	};

	return (
		<div className='1200px:w-[65%] 1000px:w-[90%]  w-[100%] mx-auto'>
			{/* ----------------------- Heading ------------------------ */}
			<motion.div
				initial={{opacity: 0, y: -15}}
				animate={{opacity: 1, y: 0}}
				exit={{
					opacity: 0,
					x: -20,
				}}
				className='400px:text-2xl text-lg font-bold mb-6 dark:text-white flex items-center'>
				<FiInfo className='inline-block mr-2 text-purple-500 dark:text-purple-400 ' />
				<h2>Requirements</h2>
			</motion.div>

			{/* ---------------------------- Form Body -------------------  */}
			<motion.div
				initial={{opacity: 0, y: -15}}
				animate={{opacity: 1, y: 0}}
				exit={{
					opacity: 0,
					x: -20,
				}}>
				<div className='flex flex-col gap-10'>
					{/* ==================== Benefits Section ==========================   */}
					<div>
						<h3 className='text-base font-semibold mb-6 dark:text-gray-200 flex items-center gap-2'>
							<span className='bg-blue-100 dark:bg-blue-900/40 px-3 rounded'>✨ Benefits</span>
						</h3>

						<div className='flex flex-col gap-4'>
							<label htmlFor='' className='400px:text-base text-sm '>
								What are the benefits for students in this course?
							</label>
							<AnimatePresence>
								{benefitsFields.map((field, index) => (
									<motion.div
										variants={itemVariants}
										initial='hidden'
										animate='visible'
										exit={{
											opacity: 0,
											x: -50,
										}}
										key={field.id}
										className='flex  flex-row  items-center justify-center'>
										<div className='w-full flex flex-col gap-2'>
											<motion.input
												type='text'
												{...register(`benefits.${index}.title`)}
												{...errorInputAnimation(err?.benefits?.[index]?.title)}
												className={`${err.benefits?.[index]?.title ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded w-full 400px:placeholder:text-base placeholder:text-base`}
												placeholder='You will be able to build a full stack LMS platform...'
											/>
											{(errors as ICourseFormErrors).benefits?.[index]?.title && (
												<motion.div {...errorTextAnimation} className='text-red-500 text-sm'>
													<p>{err?.benefits?.[index]?.title?.message}</p>
												</motion.div>
											)}
										</div>
										<div className='flex self-start justify-center h-full '>
											{index > 0 && (
												<motion.button
													onClick={() => benefitsRemove(index)}
													whileHover={{scale: 1.1}}
													whileTap={{scale: 0.9}}
													type='button'
													className='bg-red-400  rounded  px-2 py-[10px]  text-white ml-4'>
													<MdDelete size={22} />
												</motion.button>
											)}
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
						<motion.button
							whileHover={{scale: 1.05}}
							whileTap={{scale: 0.95}}
							onClick={() => benefitsAppend({title: ""})}
							type='button'
							className='flex items-center justify-between gap-3 mt-[40px]'>
							<span>
								<AiOutlinePlus />
							</span>
							<span>Add Benefit</span>
						</motion.button>
					</div>

					{/* ==================== Prerequisites Section ==========================   */}

					<div className='mt-10'>
						<h3 className='text-base font-semibold mb-6 dark:text-gray-200 flex items-center gap-2'>
							<span className='bg-blue-100 dark:bg-blue-900/40 px-3 rounded'> 📚 Prerequisites</span>
						</h3>

						<div className='flex flex-col gap-4'>
							{prerequisitesFields.length > 0 && (
								<label htmlFor='' className='400px:text-base text-sm'>
									What are the prerequisites for starting this course?
								</label>
							)}
							<AnimatePresence>
								{prerequisitesFields.map((field, index) => (
									<motion.div
										variants={itemVariants}
										initial='hidden'
										animate='visible'
										exit={{
											opacity: 0,
											x: -50,
										}}
										key={field.id}
										className='flex items-center'>
										<div className='w-full flex flex-col gap-2'>
											<motion.input
												type='text'
												{...register(`prerequisites.${index}.title`)}
												{...errorInputAnimation(err?.prerequisites?.[index]?.title)}
												className={`${err?.prerequisites?.[index]?.title ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded w-full 400px:placeholder:text-base placeholder:text-sm mb-2`}
												placeholder='You need to  basic knowledge about MERN Stack..'
											/>
											{(errors as ICourseFormErrors).prerequisites?.[index]?.title && (
												<motion.div {...errorTextAnimation} className='text-red-500 text-sm'>
													{((errors as ICourseFormErrors).prerequisites?.[index]?.title as any)?.message}
												</motion.div>
											)}
										</div>
										<div className='flex self-start justify-center h-full '>
											{index > 0 && (
												<motion.button
													onClick={() => prerequisitesRemove(index)}
													whileHover={{scale: 1.1}}
													whileTap={{scale: 0.9}}
													type='button'
													className='bg-red-400  rounded  px-2 py-[10px]  text-white ml-4'>
													<MdDelete size={22} />
												</motion.button>
											)}
										</div>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
						<motion.button
							whileHover={{scale: 1.05}}
							whileTap={{scale: 0.95}}
							onClick={() => prerequisitesAppend({title: ""})}
							type='button'
							className='flex items-center justify-between gap-3 mt-3'>
							<span>
								<AiOutlinePlus />
							</span>
							<span>Add Prerequisite</span>
						</motion.button>
					</div>

					{/*  ========================= Previous and Next Button =======================   */}
					{/*<div className="flex justify-between mt-10 items-center">*/}
					{/*    <motion.button onClick={handlePrevious} whileHover={{scale: 1.05}} whileTap={{scale: 0.9}} type="button" className={`bg-transparent 600px:px-[100px] 400px:px-[50px] px-8 py-2  rounded border border-blue-500 text-blue-500 dark:text-white 600px:text-base text-sm`}>Previous</motion.button>*/}
					{/*    <motion.button disabled={!isValid} onClick={handleNext} whileHover={!isValid ? {scale: 1} : {scale: 1.05}} whileTap={!isValid ? {scale: 1} : {scale: 0.95}} type="button" className={`${isValid ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-400 cursor-not-allowed"}  600px:px-[100px] 400px:px-[50px] px-8 py-2  rounded text-white 600px:text-base text-sm`}>Next</motion.button>*/}
					{/*</div>*/}
				</div>
			</motion.div>
		</div>
	);
};
export default CourseRequirements;
