import {useEffect, useState} from "react";
import {FiInfo} from "react-icons/fi";
import {motion} from "framer-motion";
import {Controller, FieldError, FieldErrorsImpl, Merge, useFormContext} from "react-hook-form";
import Select, {StylesConfig} from "react-select";
import {useTheme} from "next-themes";
import {FaImages} from "react-icons/fa";
import {getSelectStyle} from "../../../../lib/SelectStyle.ts";
import Input from "./Input.tsx";


// {StylesConfig}
const CourseInformation = () => {
	const {
		register,
		control,
		watch,
		setValue,
		trigger,
		formState: {errors},
	} = useFormContext();
	const {theme} = useTheme();
	const [previewImage, setPreviewImage] = useState<any>(null);
	const [, setIsValidatingThumbnail] = useState(false);
	const customStyles = getSelectStyle({theme});


	/**
	 * @summary     Options for react-select
	 * @description Options for course level
	 * @type        {Array<{value: string, label: string}>}
	 *
	 * */
	const options = [
		{value: "beginner", label: "Beginner"},
		{value: "intermediate", label: "Intermediate"},
		{value: "advanced", label: "Advanced"},
		{value: "expert", label: "Expert"},
	];

	/**
	 * @summary     Watch Thumbnail
	 * @description Watch the thumbnail field
	 * @type        {any}
	 * */

	const thumbnailWatch: any = watch("thumbnail");
	useEffect(() => {
		if (errors?.thumbnail) {
			setPreviewImage(null);
		}
	}, [errors?.thumbnail]);

	/**
	 * @summary     Handle Thumbnail Validation
	 * @description Validate the thumbnail field
	 * @type        {function}
	 * */
	useEffect(() => {
		const handleThumbnailValidation = async () => {
			if (thumbnailWatch?.url){
				setPreviewImage(thumbnailWatch?.url);
				return;
			}

			if (!thumbnailWatch?.[0]) {
				setPreviewImage(null);
				return;
			}

			setIsValidatingThumbnail(true);

			try {
				// Validate only the thumbnail field
				const isValid = await trigger("thumbnail");
				if (isValid) {
					const reader = new FileReader();
					reader.onload = () => setPreviewImage(reader.result as string);
					reader.readAsDataURL(thumbnailWatch?.[0]);
				} else {
					setPreviewImage(null);
				}
			} finally {
				setIsValidatingThumbnail(false);
			}
		};

		handleThumbnailValidation();
	}, [thumbnailWatch, trigger]);

	/**
	 * @summary     Handle Remove Image
	 * @description Remove the selected image
	 * @type        {function}
	 * */
	const handleRemoveImage = () => {
		setPreviewImage("");
		setValue("thumbnail", null, {shouldValidate: true});
	};



	/**
	 * @summary     Error Input Animation
	 * @description Animate the input field when there is an error
	 * @type        {function}
	 * */
	const errorInputAnimation = (hasError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined) => {
		return {
			initial: {x: 0},
			animate: hasError ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0},
			transition: {duration: 0.5},
		};
	};

	/**
	 * @summary     Error Text Animation
	 * @description Animate the error text when there is an error
	 * @type        {object}
	 * */

	const errorTextAnimation = {
		initial: {opacity: 0, x: 15},
		animate: {opacity: 1, x: 0},
		exit: {
			opacity: 0,
			x: 15,
		},
	};




	return (
		<motion.div
			initial={{opacity: 0, y: -15}}
			animate={{opacity: 1, y: 0}}
			exit={{
				opacity: 0,
				x: -20,
			}}
			className='1200px:w-[65%] 1000px:w-[90%]  w-[100%] mx-auto'>
			{/* ----------------------- Heading ------------------------ */}
			<motion.div className='400px:text-2xl text-lg font-bold mb-6 dark:text-white flex items-center'>
				<FiInfo className='inline-block mr-2 text-purple-500 dark:text-purple-400 ' />
				<h2 className=''>Course Information</h2>
			</motion.div>

			{/* ----------------------- Form Body -------------------------- */}
			<motion.div
				initial={{opacity: 0, y: -15}}
				animate={{opacity: 1, x: 0}}
				exit={{
					opacity: 0,
					x: -15,
				}}
				className='flex flex-col gap-6 mt-10'>
				<div className='flex  800px:flex-row 800px:justify-between 800px:gap-10 flex-col gap-4'>
					{/* ---------------------------- Course Name ---------------------- */}
					
					<Input name="name" label="Course Name" placeholder="Enter Course Name" type="text" isRequired={true}/>

					{/* --------------------------- Course Price ---------------------- */}

					 <Input name="price" label="Price" placeholder="99.99" type="number" isRequired={true}/>

					{/* --------------------------- Course Estimated Price ---------------------- */}

					<Input name="estimatedPrice" label="Estimated Price" placeholder="150.00" type="number"/>
				</div>

				{/* --------------------------- Course Tags ---------------------- */}
				<div className='flex 800px:flex-row 800px:justify-between flex-col gap-4'>

					<Input name="tags" label="Tags" placeholder="MERN Stack, React, Node, Python, Django, Development etc" type="text" isRequired={true}/>


					{/*  --------------------------- Course Level ------------------    */}

					<div className='flex flex-col gap-2 w-full'>
						<label htmlFor='level' className='dark:text-slate-400 text-gray-600'>
							Course Level <span className='text-red-500'>*</span>
						</label>
						<Controller
							control={control}
							name={"level"}
							rules={{required: "Course Level is required"}}
							render={({field}) => (
								<motion.div {...errorInputAnimation(errors?.level)}>
									<Select
										{...field}
										value={options.find((option) => option.value === field.value)}
										onChange={(selectedOption: any) => field.onChange(selectedOption?.value?.toString())}
										styles={customStyles as StylesConfig}
										options={options}
										placeholder='Select Course Level'
										menuPortalTarget={document.body}
										className={`${errors?.level ? "border-red-500" : "dark:border-slate-500 border-gray-400"} border rounded`}
									/>
								</motion.div>
							)}
						/>
						{errors?.level && (
							<motion.div {...errorTextAnimation} className='text-red-500 text-base'>
								<p>{errors?.level?.message?.toString()}</p>
							</motion.div>
						)}
					</div>
				</div>

				{/* -------------------------- Demo Url --------------------------- */}

				<Input name="demoUrl" label="Demo URL" placeholder="Enter Demo URL" type="text"/>


				{/* --------------------------- Course Description ---------------------- */}

				<Input name="description" label="Description" placeholder="Enter Course Description" type="textarea" rows={10} isRequired={true}/>

				{/*  ---------------------------- Course Thumbnail ---------------------------   */}

				<div className='flex flex-col gap-2'>
					<h4 className='text-gray-600 dark:text-slate-400'>
						Upload Thumbnail <span className='text-red-500'>*</span>
					</h4>

					<motion.div
						{...errorInputAnimation(errors?.thumbnail)}
						className={`w-full 800px:min-h-[450px] min-h-[200px]  ${errors?.thumbnail ? "border-red-500 hover:border-red-500" : "border-gray-300 dark:border-slate-500 hover:border-purple-500"} flex items-center border-2 border-dashed  rounded-lg overflow-hidden transition-colors duration-300 relative group`}>
						{previewImage ? (
							<div className='relative w-full h-full'>
								<img src={previewImage} alt='Course Thumbnail' className='w-full h-full object-contain' />
								<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300'>
									<button
										onClick={handleRemoveImage}
										type='button'
										className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'>
										Remove Image
									</button>
								</div>
							</div>
						) : (
							<div className='flex flex-col justify-center items-center w-full h-full space-y-4'>
								<input {...register("thumbnail")} type='file' id='thumbnail' className='hidden' accept='.jpg, .png, .jpeg, .webp' />
								<label htmlFor='thumbnail' className='flex flex-col items-center justify-center w-full h-full cursor-pointer group'>
									<div className='p-4 bg-purple-100 dark:bg-slate-700 rounded-full group-hover:bg-purple-200 transition-colors duration-300'>
										<FaImages className='text-4xl text-purple-600 dark:text-purple-400' />
									</div>
									<div className='mt-4 text-center'>
										<p className='400px:text-lg text-sm font-medium text-gray-700 dark:text-gray-200'>
											Click to upload thumbnail
										</p>
										<p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>Recommended: 1280x720 (16:9 aspect ratio)</p>
										<p className='text-xs text-gray-400 dark:text-gray-500 mt-1'>Supported formats: JPG, PNG, WEBP</p>
									</div>
								</label>
							</div>
						)}
					</motion.div>

					{errors?.thumbnail && (
						<motion.div {...errorTextAnimation} className='text-red-500 text-base'>
							<p>{errors?.thumbnail?.message?.toString()}</p>
						</motion.div>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
};

export default CourseInformation;
