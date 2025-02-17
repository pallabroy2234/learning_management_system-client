import {PixelCrop} from "react-image-crop";


const canvasPreview = (image: HTMLImageElement, canvas: HTMLCanvasElement, crop: PixelCrop) => {
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("No 2d context");

	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;

	canvas.width = crop.width * scaleX;
	canvas.height = crop.height * scaleY;

	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width * scaleX,
		crop.height * scaleY
	);
};
export default canvasPreview;

