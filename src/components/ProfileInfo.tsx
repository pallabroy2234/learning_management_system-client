import {CustomError, RootState} from "../types/@types.ts";
import defaultAvatar from "../../public/avatar.jpg";
import {ChangeEvent, FC, useEffect, useState} from "react";
import {FaEdit} from "react-icons/fa";
import ImageCropModal from "./ImageCropModal.tsx";
import {useUploadProfileImageMutation} from "../store/features/user/userApi.ts";
import toast from "react-hot-toast";

type Props = {
	user: RootState["auth"]["user"];
}

const ProfileInfo: FC<Props> = ({user}) => {
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

	const errors = {
		email: false
	};

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
				<form>
					<div className="800px:w-[50%] mx-auto  pb-4 flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<label htmlFor="name" className="text-[14px] 500px:text-[16px] font-Poppins text-black dark:text-white">Full Name</label>
							<input type="text" id="name" placeholder="Your Full Name" className={`${errors?.email ? "border-red-500" : "dark:border-white border-black"} w-full rounded text-[14px] 500px:text-base text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none font-Poppins `} />
							{/*{errors?.email &&*/}
							{/*	<span className="text-red-500 text-[13px] 500px:text-[14px] font-Poppins">{errors?.email?.message}</span>}*/}
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="email" className="text-[14px] 500px:text-[16px] font-Poppins text-black dark:text-white">Email Address</label>
							<input type="text" id="name" readOnly={true} placeholder="Your Email" className={`${errors?.email ? "border-red-500" : "dark:border-white border-black"} w-full rounded text-[14px]  500px:text-base text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none font-Poppins `} />
						</div>

						<div className="w-full">
							<button type="submit" className="px-12 py-1 border border-black dark:border-white rounded">
								Update
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default ProfileInfo;
