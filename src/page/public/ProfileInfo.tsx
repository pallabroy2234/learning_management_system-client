import {CustomError, RootState} from "../../types/@types.ts";
import defaultAvatar from "../../../public/avatar.jpg";
import {ChangeEvent, useEffect, useState} from "react";
import {FaEdit} from "react-icons/fa";
import ImageCropModal from "../../features/ProfileInfo/components/ImageCropModal.tsx";
import {useUpdateUserInfoMutation, useUploadProfileImageMutation} from "../../store/features/user/userApi.ts";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {ThreeDots} from "react-loader-spinner";
import {useSelector} from "react-redux";


const userUpdateSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().optional()
});


const ProfileInfo = () => {
	const {user} = useSelector((state: RootState) => state.auth);
	const [showModal, setShowModal] = useState(false);
	const [error, setError] = useState("");
	const [imageSrc, setImageSrc] = useState("");
	const [uploadProfileImage, {
		isLoading,
		isSuccess,
		isError,
		error: uploadError,
		data
	}] = useUploadProfileImageMutation();
	const [updateInfo, {
		isLoading: isUpdateLoading,
		isSuccess: isUpdateSuccess,
		isError: isUpdateError,
		error: updateError,
		data: updateData
	}] = useUpdateUserInfoMutation();


	const {handleSubmit, register, formState: {errors, isValid, isDirty, isSubmitting}} = useForm({
		values: {
			name: user?.name || "",
			email: user?.email
		},

		resolver: yupResolver(userUpdateSchema),
		mode: "onChange"
	});


	/**
	 * @summary Handles form submission
	 * @description Updates user profile info
	 * @param {Object} data - Form data
	 * @param {string} data.name - User's full name
	 *
	 * */
	const onSubmit = async (data: {name: string, email?: string}) => {
		const {name} = data;
		await updateInfo({name});
	};

	/**
	 * @summary Display success or error toast messages
	 * @description Displays success or error toast messages when user profile is updated
	 * @param {boolean} isUpdateSuccess - Update success status
	 * @param {boolean} isUpdateError - Update error status
	 * @param {Object} updateData - Update success data
	 * @param {Object} updateError - Update error data
	 * */
	useEffect(() => {
		if (isUpdateSuccess) {
			const message = updateData?.message || "Profile updated successfully";
			toast.success(message);
		}
		if (isUpdateError) {
			if ("data" in updateError) {
				const err = updateError as CustomError;
				toast.error(err?.data?.message);
			}
		}
	}, [isUpdateError, isUpdateSuccess]);


	/**
	 * @summary Handles image selection from file input
	 * @description Validates selected image file type and size before displaying crop modal
	 * @param {ChangeEvent<HTMLInputElement>} e - File input change event
	 *
	 * */
	const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// File type validation
		const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
		if (!validTypes.includes(file.type)) {
			setError("Invalid file type. Please upload PNG, JPEG, JPG, or WebP");
			e.target.value = ""; // Clear invalid file selection
			return;
		}

		// File size validation (2MB)
		const MAX_SIZE_MB = 2;
		if (file.size > MAX_SIZE_MB * 1024 * 1024) {
			setError(`File size exceeds ${MAX_SIZE_MB}MB limit`);
			e.target.value = ""; // Clear invalid file selection
			return;
		}

		const reader = new FileReader();
		reader.addEventListener("load", () => {
			const imageElement = new Image();
			const imageUrl = reader?.result?.toString() || "";

			// Handle image loading errors
			imageElement.onerror = () => {
				setError("Failed to load image");
				e.target.value = "";
				setImageSrc("");
			};
			imageElement.src = imageUrl;

			// check if image is less than 150px x 150px
			imageElement.addEventListener("load", (e) => {
				if (error) setError("");
				const {width, height} = e.currentTarget as HTMLImageElement;
				if (width < 150 || height < 150) {
					setError("Image must be at least 150px x 150px pixels");
					return setImageSrc("");
				}
			});
			setImageSrc(imageUrl);
			if (imageUrl) {
				setShowModal(true);
			}
		});
		reader.readAsDataURL(file);
	};
	useEffect(() => {
		if (imageSrc) {
			setShowModal(true);
		}
	}, [imageSrc]);


	useEffect(() => {
		if (isSuccess) {
			const message = data?.message || "Profile image updated successfully";
			toast.success(message);
		}
		if (isError) {
			if ("data" in uploadError) {
				const err = uploadError as CustomError;
				toast.error(err?.data?.message);
			}
		}
	}, [isSuccess, isError]);

	return (
		<div>
			<div className="w-full flex justify-center">
				<div className="relative">
					<div>
						{
							error && <span className="text-red-500 text-[13px] font-Poppins">{error}</span>
						}
						<div className="w-[120px] h-[120px] cursor-pointer rounded-full  overflow-hidden">
							<img src={user?.avatar?.url || defaultAvatar} alt={user?.name} className="w-full h-full object-cover" />
						</div>
						<div className=" bg-white dark:text-black border border-gray-400 absolute bottom-3 rounded px-2  -right-3 flex justify-center items-center cursor-pointer">
							<input onChange={handleSelectImage} type="file" name="" id="avatar" className="hidden" accept="image/png, image/jpeg, image/jpg, image/webp, image/webp" />
							<label htmlFor="avatar" className="flex justify-center items-center gap-2 text-[13px] cursor-pointer">Edit <span><FaEdit /></span></label>
						</div>
					</div>
				</div>
			</div>

			{/* Modal */}
			{
				showModal &&
				<ImageCropModal uploadProfileImage={uploadProfileImage} isLoading={isLoading} showModal={showModal} setShowModal={setShowModal} imageSrc={imageSrc} setImageSrc={setImageSrc} />
			}

			<br />
			<br />

			<div className="w-full pl-6 800px:pl-10">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="800px:w-[50%] mx-auto  pb-4 flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label htmlFor="name" className="text-[14px] 500px:text-[16px] font-Poppins text-black dark:text-white">Full Name</label>
							<input {...register("name")} type="text" id="name" placeholder="Your Full Name" className={`w-full rounded text-[14px] 500px:text-base text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none font-Poppins `} />
							{errors?.name &&
								<span className="text-red-500 text-[13px] font-Poppins">{errors.name.message}</span>}
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="email" className="text-[14px] 500px:text-[16px] font-Poppins text-black dark:text-white">Email Address</label>
							<input {...register("email")} readOnly={true} type="text" id="name" placeholder="Your Email" className={`w-full rounded text-[14px] cursor-not-allowed 500px:text-base text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none font-Poppins `} />
						</div>


						<div className="w-full flex justify-center items-center">
							<button type="submit" disabled={!isValid || !isDirty || isSubmitting}
									className={`w-full flex justify-center items-center py-2 text-[13px] 500px:text-[16px] font-Poppins  rounded  transition-all duration-300 ease-in-out disabled:cursor-not-allowed ${
										isValid
											? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 shadow-md"
											: "bg-blue-300 border-blue-400 text-blue-100 cursor-not-allowed"
									}`}
							>
								{isUpdateLoading ?
									<ThreeDots height="20" width="40" radius="9" color="#fff" /> : "Update"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default ProfileInfo;


// ${errors?.email ? "border-red-500" : "dark:border-white border-black"}