import * as yup from "yup";
//
// const getImageDimensions = (file: any) => {
// 	return new Promise((resolve, reject) => {
// 		const img = new Image();
// 		img.onload = () => {
// 			URL.revokeObjectURL(img.src);
// 			resolve({width: img.width, height: img.height});
// 		};
// 		img.onerror = reject;
// 		img.src = URL.createObjectURL(file);
// 	});
// };

// Hero Component Schema

export const heroSchema = yup.object().shape({
	img: yup
		.mixed()
		.required("Image is required")
		// .test("fileExists", "Image is required", (value: any) => {
		// 	if (value && value?.url) return true;
		// 	return value && value[0];
		// })
		.test("fileType", "Unsupported file format", (value: any) => {

			if (value === "" || value.length === 0 ) return true;
			if (value && value?.url) return true;
			if (!value || !value[0]) return false;
			return value || ["image/jpeg", "image/png", "image/jpg, image/webp , image/*"].includes(value[0].type as string as string);
		})
		.test("fileSize", "File size is too large(Max 2MB)", (value: any) => {
			if (value === "" || value.length === 0) return true;
			if (value && value?.url) return true;
			if (!value || !value[0]) return false;
			return value[0].size <= 2 * 1024 * 1024;
		}),
	title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters").max(80, "Title must be at most 80 characters"),
	subTitle: yup
		.string()
		.required("Sub Title is required")
		.min(10, "Sub Title must be at least 10 characters")
		.max(150, "Sub Title must be at most 150 characters"),
});
