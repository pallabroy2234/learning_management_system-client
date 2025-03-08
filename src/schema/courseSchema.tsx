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
            resolve({width: img.width, height: img.height})
        }
        img.onerror = reject;
        img.src = URL.createObjectURL(file);

    })
}


/**
 * @summary        Course Info Schema
 * @description    Schema for validating course information
 * @type           {yup.ObjectSchema<object>}
 *
 * */

export const courseInfoSchema = yup.object().shape({
    thumbnail: yup.mixed().required("Thumbnail is required").test("fileType", "Unsupported file format", (value: any) => {
        return value && ["image/jpeg", "image/png", "image/jpg, image/webp"].includes(value[0].type as string)
    }).test("fileSize", "File size is too large(Max 2MB)", (value: any) => {
        return value && value[0]?.size <= 2 * 1024 * 1024;
    }).test("dimension", "Minimum dimensions 1280x720", async (value: any) => {
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
    price: yup
        .number()
        .transform((_, originalValue) => {
            // Convert empty string or undefined to null
            if (originalValue === "" || originalValue === undefined || originalValue === null) {
                return null;
            }
            return Number(originalValue);
        })
        .nullable()
        .required("Price is required")
        .typeError("Price must be a number")
        .min(0, "Price cannot be negative"),
    estimatedPrice:
        yup.number().transform((_, originalValue) => {
            if (originalValue === "" || originalValue === undefined || originalValue === null) {
                return null
            }
            return Number(originalValue);
        }).nullable().required("Estimated price is required").typeError("Estimated price must be a number").min(0, "Estimated price cannot be negative"),
    tags:
        yup.string().required("Tags are required"),
    level:
        yup.string().required("Level is required").oneOf(["beginner", "intermediate", "advanced", "expert"], "Invalid level"),
});


export const requirementsSchema = yup.object().shape({
    benefits: yup.array().of(
        object({
            title: yup.string().required("Benefit title is required").min(10, "Minimum 10 characters")
        })
    ).min(1, "At least one benefit is required").required(),
    prerequisites: yup.array().of(
        object({
            title: yup.string().when('$isPrerequisiteAdded', (isPrerequisiteAdded, schema) => {
                if (isPrerequisiteAdded) {
                    return schema.required("Prerequisite title is required");
                } else {
                    return schema;
                }
            })
        })
    ).optional()
});





//
// export const combinedSchema = yup.object().shape({
//     ...courseInfoSchema.fields,
//     ...requirementsSchema.fields,
// });
//


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

