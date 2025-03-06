import * as yup from "yup";


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
