import * as yup from "yup";
import {object} from "yup";

/**
 * @summary        Get Image Dimensions
 * @description    Get the dimensions of an image
 * @param          {any} file
 * @returns        {Promise<{width: number, height: number}>}
 * */

const getImageDimensions = (file: any) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			URL.revokeObjectURL(img.src);
			resolve({width: img.width, height: img.height});
		};
		img.onerror = reject;
		img.src = URL.createObjectURL(file);
	});
};

/**
 * @summary        Course Info Schema
 * @description    Schema for validating course information
 * @type           {yup.ObjectSchema<object>}
 *
 * */

export const courseInfoSchema = yup.object().shape({
	thumbnail: yup
		.mixed()
		.required("Thumbnail is required")
		.test("fileType", "Unsupported file format", (value: any) => {
			return value && ["image/jpeg", "image/png", "image/jpg, image/webp"].includes(value[0].type as string);
		})
		.test("fileSize", "File size is too large(Max 2MB)", (value: any) => {
			return value && value[0]?.size <= 2 * 1024 * 1024;
		})
		.test("dimension", "Minimum dimensions 1280x720", async (value: any) => {
			if (!value || !value[0]) return false;
			try {
				const dimensions: any = await getImageDimensions(value[0]);
				return dimensions.width >= 1280 && dimensions.height >= 720;
			} catch {
				return false;
			}
		}),
	name: yup.string().required("Course name is required").min(3, "Course name must be at least 3 characters"),
	description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
	price: yup.number().required("Price is required").min(0, "Price cannot be negative"),
	estimatedPrice: yup.number().required("Estimated price is required").min(0, "Estimated price cannot be negative"),
	tags: yup.string().required("Tags are required"),
	level: yup.string().required("Level is required").oneOf(["beginner", "intermediate", "advanced", "expert"], "Invalid level"),
	demoUrl: yup.string().required("Demo URL is required"),
});

export const requirementsSchema = yup.object().shape({
	benefits: yup
		.array()
		.of(
			object({
				title: yup.string().required("Benefit title is required").min(10, "Minimum 10 characters"),
			}),
		)
		.min(1, "At least one benefit is required")
		.required(),
	prerequisites: yup
		.array()
		.of(
			object({
				title: yup.string().when("$isPrerequisiteAdded", (isPrerequisiteAdded, schema) => {
					if (isPrerequisiteAdded) {
						return schema.required("Prerequisite title is required");
					} else {
						return schema;
					}
				}),
			}),
		)
		.required(),
});

export const courseContentSchema = yup.object().shape({
	courseData: yup.array().of(
		object({
			title: yup.string().required("Video Title is required").min(3, "Title must be at least 3 characters"),
			videoSection: yup.string().required("Video Section is required"),
			videoUrl: yup.string().required("Video URL is required"),
			videoLength: yup
				.number()
				.required("Video Length is required")
				.typeError("Video Length must be a number")
				.min(1, "Video Length must be at least 1 minute"),
			suggestion: yup.string().optional(),
			videoPlayer: yup.string().required("Video Player is required"),
			videoDescription: yup.string().required("Video Description is required").min(10, "Description must be at least 10 characters"),
			links: yup.array().of(
				object().when("$isLinkAdded", (isLinkAdded, schema)=> {
					if(isLinkAdded){
						return schema.shape({
							title: yup.string().required("Link Title is required"),
							url: yup.string().required("Link URL is required").url("Invalid URL"),
						})
					}
					return schema;
				})
			)
		}),
	),
});


export const combinedSchema = yup.object().shape({
    ...courseInfoSchema.fields,
    ...requirementsSchema.fields,
	...courseContentSchema.fields
});



// import {mixed, object, array, string, number} from 'yup';

// কমন ফিল্ডস ডিফাইন করুন
// const baseSchema = object().shape({
//     thumbnail: mixed(),
//     name: string().required("Course name is required").min(3, "Course name must be at least 3 characters"),
//     price: number(),
//     estimatedPrice: number(),
//     tags: string(),
//     level: string(),
//     description: string(),
//     benefits: array().of(object().shape({title: string()})),
//     prerequisites: array().of(object().shape({title: string()})),
//     demoUrl: string(),
//     courseData: array().of(
//         object().shape({
//             title: string(),
//             videoDescription: string(),
//             videoUrl: string(),
//             videoSection: string(),
//             videoLength: mixed(),
//             videoPlayer: string(),
//             links: array().of(object().shape({title: string(), url: string()}))
//         })
//     )
// });


// export const courseInfoSchema = baseSchema.pick([
//     'thumbnail',
//     'name',
//     'price',
//     'estimatedPrice',
//     'tags',
//     'level',
//     'description'
// ]).required();
//
//
// export const requirementsSchema = baseSchema.pick([
//     'benefits',
//     'prerequisites'
// ]).required();

