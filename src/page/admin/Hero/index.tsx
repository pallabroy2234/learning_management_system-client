import {motion} from "framer-motion";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {FiEdit, FiSave, FiX} from "react-icons/fi";
import {heroSchema} from "../../../schema/heroContentSchema.tsx";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCreateBannerMutation, useGetBannerQuery, useUpdateBannerMutation} from "../../../store/features/customization/customizationApi.ts";
import toast from "react-hot-toast";
import {CustomError} from "../../../types/@types.ts";
import {DevTool} from "@hookform/devtools";
import {ThreeDots} from "react-loader-spinner";
import Loader from "../../../components/shared/Loader.tsx";

const defaultBannerImage = "/hero.png";

const Hero = () => {
	// * Define mutations and queries for banner operations
	const [uploadBanner, {isLoading: isBannerLoading, isSuccess: isBannerSuccess, isError: isBannerError, error: bannerError, data: bannerData}] =
		useCreateBannerMutation();
	const {data: getBannerData, isLoading: isGetBannerLoading} = useGetBannerQuery("banner");
	const [
		updateBanner,
		{
			isLoading: isUpdateBannerLoading,
			isSuccess: isUpdateBannerSuccess,
			isError: isUpdateBannerError,
			error: updateBannerError,
			data: updateBannerData,
		},
	] = useUpdateBannerMutation();

	// * State Define
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<string | null>(null);
	const [, setIsValidationImage] = useState(false);

	// * Initialize the form with react-hook-form and yup schema validation
	const {
		register,
		control,
		handleSubmit,
		reset,
		watch,
		trigger,
		formState: {errors, isValid, isSubmitting, isDirty},
	} = useForm({
		defaultValues: {
			img: "",
			title: "",
			subTitle: "",
		},
		resolver: yupResolver(heroSchema),
		mode: "onChange",
	});

	// Watch for changes in the image field
	const imageWatch: any = watch("img");

	/**
	 * @summary       Handle Image Preview and Validation
	 * @description   Handles the preview and validation of the selected image
	 * @method        useEffect
	 * @dependencies  [imageWatch, trigger, getBannerData]
	 * @returns       void
	 */
	useEffect(() => {
		const handleImage = async () => {
			if (imageWatch?.url as any) {
				setPreviewImage(getBannerData?.payload?.bannerImage?.image?.url);
				return;
			}

			if (!imageWatch?.[0]) {
				setPreviewImage(null);
				return;
			}
			setIsValidationImage(true);

			try {
				// Validate only the thumbnail field
				const isValid = await trigger("img");
				if (isValid) {
					const reader = new FileReader();
					reader.onload = () => setPreviewImage(reader.result as string);
					reader.readAsDataURL(imageWatch[0] as any);
				} else {
					setPreviewImage(null);
				}
			} finally {
				setIsValidationImage(false);
			}
		};

		handleImage();
	}, [imageWatch, trigger, getBannerData]);

	/**
	 * @summary       Handle Form Submission
	 * @description   Processes the form data and submits it to the appropriate API endpoint
	 * @method        onSubmit
	 * @param {any} data - The form data to be submitted
	 * @returns       void
	 */
	const onSubmit = async (data: any) => {
		if (data) {
			const formData = new FormData();
			formData.append("type", "banner");

			if (getBannerData?.success) {
				formData.append("banner", data.img[0]);
				formData.append("title", data.title);
				formData.append("subtitle", data.subTitle);
				await updateBanner({
					bannerId: getBannerData?.payload?._id,
					data: formData,
				});
			} else {
				formData.append("banner", data.img[0]);
				formData.append("bannerImage[title]", data.title);
				formData.append("bannerImage[subtitle]", data.subTitle);
				await uploadBanner(formData);
			}
		}
	};

	/**
	 * @summary       Handle Banner Data Fetching
	 * @description   Fetches the banner data and sets the form fields to the retrieved data
	 * @method        useEffect
	 *  @dependencies  [getBannerData, reset]
	 * @returns       void
	 */
	useEffect(() => {
		if (getBannerData) {
			reset({
				img: getBannerData?.payload?.bannerImage?.image,
				title: getBannerData?.payload?.bannerImage?.title,
				subTitle: getBannerData?.payload?.bannerImage?.subtitle,
			});
		}
	}, [getBannerData, reset]);

	/**
	 * @summary       Handle Banner Update Success/Error
	 * @description   Displays a success or error toast message when the banner update operation is completed
	 * @method        useEffect
	 * @dependencies  [isUpdateBannerError, isUpdateBannerSuccess, updateBannerError, updateBannerData]
	 * @returns       void
	 * */
	useEffect(() => {
		if (isUpdateBannerSuccess) {
			const message = updateBannerData?.message || "Banner updated successfully";
			toast.success(message);
			setIsEditing(false);
		}
		if (isUpdateBannerError) {
			if ("data" in updateBannerError) {
				const err = updateBannerError as CustomError;
				toast.error(err.data.message || "Error updating banner");
			}
		}
	}, [isUpdateBannerError, isUpdateBannerSuccess, updateBannerError, updateBannerData]);

	/**
	 * @summary       Handle Banner Creation Success/Error
	 * @description   Displays a success or error toast message when the banner creation operation is completed
	 * @method        useEffect
	 * @dependencies  [isBannerError, isBannerSuccess, bannerError, bannerData]
	 * @returns       void
	 *
	 * */
	useEffect(() => {
		if (isBannerSuccess) {
			const message = bannerData?.message || "Banner created successfully";
			toast.success(message);
			setIsEditing(false);
		}
		if (isBannerError) {
			if ("data" in bannerError) {
				const err = bannerError as CustomError;
				toast.error(err.data.message);
			}
		}
	}, [isBannerError, isBannerSuccess, bannerError, bannerData]);

	/**
	 * @summary       Animation Variants
	 * @description   Defines the animation variants for container, item, and image elements
	 * @container     containerVariants - Animation settings for the container element
	 * @item          itemVariants - Animation settings for individual items
	 * @image         imageVariants - Animation settings for image elements
	 */
	const containerVariants = {
		hidden: {opacity: 0},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.8,
				staggerChildren: 0.3,
				delayChildren: 0.4,
			},
		},
	};

	const itemVariants = {
		hidden: {opacity: 0, y: 30},
		visible: {
			opacity: 1,
			y: 0,
			transition: {type: "spring", stiffness: 120, damping: 15},
		},
	};

	const imageVariants = {
		hidden: {scale: 0.9, opacity: 0},
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				mass: 0.5,
			},
		},
	};

	return (
		<>
			{isGetBannerLoading ? (
				<Loader />
			) : (
				<div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900'>
					<div className='px-6 sm:px-4 mx-auto 500px:py-[180px] py-[150px]'>
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className='flex 1100px:flex-row flex-col justify-center items-center 1100px:gap-0 gap-[120px]'>
								{/* Image Section	 */}
								<motion.div
									variants={containerVariants}
									initial='hidden'
									animate='visible'
									className='relative  1500px:flex-1 1500px:pl-0 1100px:pl-[3%]'>
									<motion.div
										variants={imageVariants}
										initial='hidden'
										animate='visible'
										className='relative mx-auto 650px:h-[400px] 650px:w-[400px]  500px:w-[300px] 500px:h-[300px] 400px:w-[250px] 400px:h-[250px] 350px:w-[200px] 350px:h-[200px] w-[180px] h-[180px]'>
										{/*	Rotating Gradient Background */}
										<motion.div
											animate={{rotate: 360, scale: [1, 1, 0.5, 1]}}
											transition={{
												duration: 20,
												repeat: Infinity,
												ease: "linear",
											}}
											className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-900/30 dark:to-purple-900/30 '
										/>

										{/*	Main Image Container */}
										<motion.div
											whileHover={{scale: 1.02}}
											transition={{
												type: "spring",
												stiffness: 300,
											}}
											className='absolute inset-0 overflow-hidden rounded-full border-8 border-white/50 shadow-2xl dark:border-gray-600/50'>
											{previewImage ? (
												<img src={previewImage} alt='Learning' className='h-full w-full object-cover' />
											) : (
												<img src={defaultBannerImage} alt='Learning' className='h-full w-full object-cover' />
											)}
										</motion.div>
										{/*  Image Edit */}

										<input type='file' {...register("img")} hidden id='banner' className='hidden' />

										<label
											htmlFor='banner'
											className='cursor-pointer absolute 650px:bottom-[50px] 650px:right-[40px]  400px:right-[10px] bottom-[40px] right-0 z-20 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg dark:shadow-none'>
											<FiEdit className='text-xl' />
										</label>

										{/*	Floating Particles */}

										{[...Array(8)].map((_, index) => (
											<motion.div
												animate={{
													x: [0, 40, 0],
													scale: [1, 1.5, 1],
													opacity: [0.8, 1, 0.8],
												}}
												transition={{
													duration: 3 + Math.random() * 4,
													repeat: Infinity,
													delay: Math.random() * 3,
												}}
												style={{
													top: `${Math.random() * 100}%`,
													left: `${Math.random() * 100}%`,
												}}
												key={index}
												className='absolute h-3 w-3 rounded-full bg-blue-400/50 dark:bg-blue-400/50'
											/>
										))}

										{/* Rotation Border	 */}
										<motion.div
											animate={{rotate: 360}}
											transition={{
												duration: 20,
												repeat: Infinity,
												ease: "linear",
											}}
											className='absolute -inset-8 rounded-full border-8  border-t-blue-300 border-r-purple-300  border-transparent dark:border-t-blue-500 dark:border-r-purple-500'
										/>

										{errors.img && (
											<motion.p
												initial={{opacity: 0, y: 20}}
												animate={{opacity: 1, y: 0}}
												className='text-red-500 dark:text-red-400 text-sm mt-2 absolute -bottom-[60px] '>
												{errors.img.message}
											</motion.p>
										)}
									</motion.div>

									{/* Error Message */}
								</motion.div>

								{/* Content Section	 */}

								<motion.div className='900px:space-y-8 space-y-4  flex-1 1500px:pl-0 1100px:pl-[10%] relative w-full'>
									{!isEditing && (
										<button
											type='button'
											onClick={() => setIsEditing(true)}
											className='absolute -top-8 right-0 p-2 dark:text-white text-black rounded-lg hover:text-white hover:bg-blue-700 transition-colors'>
											<FiEdit className='text-xl' />
										</button>
									)}
									{isEditing ? (
										<div className='w-full mx-auto space-y-6'>
											{/* Title Input */}
											<div className='flex flex-col'>
												<motion.textarea
													{...register("title")}
													rows={3}
													className='w-full font-bold leading-tight text-gray-900 dark:text-white text-3xl 400px:text-4xl 500px:text-5xl 600px:text-6xl 900px:text-7xl bg-transparent outline-none resize-none border dark:border-slate-700 rounded border-gray-300 p-2 transition-all
                      '
												/>
												{errors.title && (
													<motion.p
														initial={{opacity: 0, y: 20}}
														animate={{opacity: 1, y: 0}}
														className='text-red-500 dark:text-red-400 text-sm mt-2'>
														{errors.title.message}
													</motion.p>
												)}
											</div>

											{/* Subtitle Input */}
											<div className='flex flex-col'>
												<motion.textarea
													{...register("subTitle")}
													rows={3}
													className=' w-full 500px:text-lg text-base text-gray-600 dark:text-gray-300 bg-transparent outline-none border-b-2 focus:border-blue-600 mt-4 p-2 resize-y
                      '
												/>
												{errors.subTitle && (
													<motion.p
														initial={{opacity: 0, y: 20}}
														animate={{opacity: 1, y: 0}}
														className='text-red-500 dark:text-red-400 text-sm mt-2'>
														{errors.subTitle.message}
													</motion.p>
												)}
											</div>

											{/* Buttons */}
											<div className='flex flex-col 500px:flex-row gap-4 mt-6'>
												<button
													type='button'
													onClick={() => {
														setIsEditing(false);
														reset();
													}}
													className='px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center justify-center order-1 500px:order-2'>
													<FiX className='mr-2' /> Cancel
												</button>
											</div>
										</div>
									) : (
										<motion.div variants={containerVariants} initial='hidden' animate='visible' className='space-y-4'>
											<motion.h1
												variants={itemVariants}
												className='font-bold leading-tight text-gray-900 dark:text-white   900px:text-7xl 600px:text-6xl 500px:text-5xl 400px:text-4xl text-3xl'>
												<motion.div className='block bg-gradient-to-r from-blue-600 py-5 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-300'>
													{getBannerData?.payload?.bannerImage?.title}
												</motion.div>
												<motion.div
													initial={{opacity: 0, x: 20}}
													animate={{
														opacity: 1,
														x: 0,
													}}
													className='block'></motion.div>
											</motion.h1>

											<motion.p variants={itemVariants} className='500px:text-lg text-gray-600 dark:text-gray-300 text-base'>
												{getBannerData?.payload?.bannerImage?.subtitle}
											</motion.p>
										</motion.div>
									)}
								</motion.div>
							</div>

							{getBannerData?.success ? (
								<div className='1100px:mt-[100px] mt-8 flex  1100px:justify-end'>
									<button
										type='submit'
										disabled={!isValid || isUpdateBannerLoading || isSubmitting || !isDirty}
										className={`${!isValid || isUpdateBannerLoading || isSubmitting || !isDirty ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center 500px:w-auto w-full`}>
										{isUpdateBannerLoading ? (
											<ThreeDots height='20' width='40' radius='9' color='#fff' />
										) : (
											<>
												<FiSave className='mr-2' /> Update
											</>
										)}
									</button>
								</div>
							) : (
								<div className='1100px:mt-[100px] mt-8 flex  1100px:justify-end'>
									<button
										type='submit'
										disabled={!isValid || isBannerLoading || isSubmitting}
										className={`${!isValid || isBannerLoading || isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center 500px:w-auto w-full`}>
										{isBannerLoading ? (
											"Loading..."
										) : (
											<>
												<FiSave className='mr-2' /> Save
											</>
										)}
									</button>
								</div>
							)}
						</form>
					</div>
					<DevTool control={control} placement='top-right' />
				</div>
			)}
		</>
	);
};
export default Hero;
