import {FC, SyntheticEvent, useRef, useState} from "react";
import ReactCrop, {centerCrop, Crop, makeAspectCrop, PixelCrop} from "react-image-crop";
import canvasPreview from "../../../../lib/canvasPreview.ts";
import Loader from "../../../../components/shared/Loader.tsx";


type Props = {
	showModal: boolean;
	setShowModal: (showModal: boolean) => void;
	imageSrc: string;
	setImageSrc: (imageSrc: string) => void;
	// setUploadImageFile: (file: any) => void;
	uploadProfileImage: any;
	isLoading: boolean;
}

const ImageCropModal: FC<Props> = ({setShowModal, imageSrc, setImageSrc, uploadProfileImage, isLoading}) => {
	const MIN_DIMENSIONS = 150;
	const ASPECT_RATIO = 1;
	const [error, setError] = useState<string>("");
	const [crop, setCrop] = useState<Crop>();
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
	const [isCropped, setIsCropped] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);
	const previewCanvasRef = useRef<HTMLCanvasElement>(null);


	/**
	 * @summary Initializes image crop configuration on image load
	 * @description Calculates initial crop area based on minimum dimensions and aspect ratio,
	 *              centering the crop selection on the loaded image
	 * @param {SyntheticEvent<HTMLImageElement>} e - Image load event
	 */
	const handleOnLoadImage = (e: SyntheticEvent<HTMLImageElement>) => {
		const {width, height} = e.currentTarget;
		const cropWidthInPercentage = (MIN_DIMENSIONS / width) * 100;

		const newCrop = makeAspectCrop({
			unit: "%",
			width: cropWidthInPercentage
		}, ASPECT_RATIO, width, height);

		setCrop(centerCrop(newCrop, width, height));
	};

	/**
	 * @summary Finalizes image cropping operation
	 * @description Renders cropped image preview to canvas element and switches to preview mode
	 * @throws {string} Displays error message if cropping fails
	 */
	const handleCropComplete = () => {
		try {
			if (imgRef.current && previewCanvasRef.current && completedCrop) {
				// Ensure canvas is visible before drawing
				canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
				setIsCropped(true);
			}
		} catch (e) {
			setError("Error cropping image. Please try again.");
		}
	};


	/**
	 * @summary Saves cropped image as profile picture
	 * @description Converts canvas preview to data URL and updates parent component state,
	 *              then resets modal state and closes dialog
	 * @returns {void} Exits early if canvas reference is unavailable
	 */
	const handleProfilePicture = async (): Promise<void> => {
		if (!previewCanvasRef.current) return;
		previewCanvasRef.current.toBlob(async (blob) => {
			if (!blob) return;

			// 	convert blob to file
			const file = new File([blob], "profile-image.jpg", {type: "image/jpeg"});

			// upload image to server
			const formData = new FormData();
			formData.append("avatar", file);
			await uploadProfileImage(formData);

			//  reset state
			setShowModal(false);
			setIsCropped(false);
			setCrop(undefined);


			// reset image src
			setImageSrc("");

		}, "image/jpeg", 1);
	};


	/**
	 * @summary Handles modal cancellation/exit
	 * @description Either returns to crop editing mode or fully closes modal based on current state,
	 *              resetting relevant state values
	 */
	const handleCancel = () => {
		if (isCropped) {
			setIsCropped(false);
		} else {
			setShowModal(false);
			setImageSrc("");
		}
	};

	return (
		<div>
			<div className="bg-white w-[400px] h-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 z-[999999] rounded-lg shadow-xl overflow-hidden">
				{
					isLoading ? (
						<Loader />
					) : (
						<div className="flex flex-col p-4 h-full">
							{/* Image Preview/Crop Area */}
							<div className="flex-1 relative border-2 border-dashed border-gray-200 rounded-lg overflow-hidden">
								{imageSrc && (
									<div className="w-full h-full flex items-center justify-center">
										{/* Crop Interface Container */}
										<div className={`w-full h-full ${!isCropped ? "block" : "hidden"}`}>
											<ReactCrop
												onChange={(_, percentageCrop) => setCrop(percentageCrop)}
												onComplete={(c: PixelCrop) => setCompletedCrop(c)}
												crop={crop}
												circularCrop
												keepSelection
												aspect={ASPECT_RATIO}
												minWidth={MIN_DIMENSIONS}
											>
												<img
													ref={imgRef}
													src={imageSrc}
													alt="avatar"
													onLoad={handleOnLoadImage}
													className="max-w-full max-h-full object-contain"
												/>
											</ReactCrop>
										</div>

										{/* Preview Canvas Container */}
										<div className={`w-full h-full ${isCropped ? "block" : "hidden"} flex justify-center items-center`}>
											<canvas
												ref={previewCanvasRef}
												className="max-w-full max-h-full rounded-full"
											/>
										</div>
									</div>
								)}
							</div>

							{error && (
								<p className="text-red-500 text-sm mt-2 text-center">{error}</p>
							)}

							<div className="flex justify-between mt-4">
								<button onClick={handleCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
									{isCropped ? "Back to Edit" : "Cancel"}
								</button>
								{!isCropped ? (
									<button onClick={handleCropComplete} className="px-4 text-[13px]  bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
										Crop Image
									</button>
								) : (
									<button onClick={handleProfilePicture} className="px-4 py-1 text-[13px] bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
										Set Profile Picture
									</button>
								)}
							</div>
						</div>
					)
				}
			</div>

			<div
				onClick={() => setShowModal(false)}
				className="fixed bg-black/80 opacity-50 dark:opacity-60 inset-0 w-full h-screen z-[999998] cursor-pointer backdrop-blur-[100px]"
			/>
		</div>
	);
};

export default ImageCropModal;