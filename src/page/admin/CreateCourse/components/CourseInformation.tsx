import {FC, useEffect, useState} from "react";
import {FiInfo} from "react-icons/fi";
import {motion} from "framer-motion";
import {Controller, useFormContext} from "react-hook-form";
import Select, {StylesConfig} from "react-select";
import {useTheme} from "next-themes";
import {FaImages} from "react-icons/fa";

// {StylesConfig}
interface Props {
    setStep: (index: number) => void;
}

const CourseInformation: FC<Props> = ({setStep}) => {
    const {register, control, watch, setValue, trigger, formState: {errors, isValid}} = useFormContext()
    const {theme} = useTheme()
    const [previewImage, setPreviewImage] = useState<any>(null)
    const [, setIsValidatingThumbnail] = useState(false);


    /**
     * @summary     Custom Styles for react-select
     * @description Custom styles for react-select component
     * @type        {StylesConfig}
     * @property    {object} control
     * @property    {object} option
     * @property    {object} singleValue
     * @property    {object} menu etc...
     * */
    const customStyles: StylesConfig = {
        control: (base: any, state: any) => ({
            ...base,
            border: "none",
            backgroundColor: theme === "dark" ? "transparent" : "transparent",
            borderColor: state.isFocused ? "transparent" : "transparent",
            boxShadow: state.isFocused ? "none" : "none",
            borderRadius: "",

            // color: theme === "dark" ? "white" : "white",
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isSelected
                ? theme === "dark" ? "#64748b" : "#3b82f6"
                : theme === "dark" ? "#4b5563" : "#fff",
            borderColor: theme === "dark" ? "#3b82f6" : "#fff",
            color: state.isSelected ? theme === "dark" ? "white" : "white" : theme === "dark" ? "white" : "black",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: theme === "dark" ? "#64748b   " : "#3b82f6",
                color: theme === "dark" ? "white" : "white",
                // transition: "background-color 0.3s ease-in-out",
            }
        }),
        singleValue: (base: any) => ({
            ...base,
            color: 'inherit',
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: theme === "dark" ? "#4b5563" : "white",
            zIndex: 9999,
        }),
        menuPortal: (base: any) => ({...base, zIndex: 9999}),
        placeholder: (base: any) => ({
            ...base,
            color: "#94a3b8"
        }),
        container: (base: any) => ({
            ...base,
            padding: "1.2px 0 1.2px 0",
        }),
        dropdownIndicator: (base: any) => ({
            ...base,
        }),
        clearIndicator: (base: any) => ({
            ...base,
            // display:"none"
        }),
        indicatorSeparator: (base: any) => ({
            ...base,
            display: "none"
        }),
        input: (base: any) => ({
            ...base,
            color: theme === "dark" ? "white" : "black",
        }),
    }


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
    ]


    /**
     * @summary     Watch Thumbnail
     * @description Watch the thumbnail field
     * @type        {any}
     * */

    const thumbnailWatch: any = watch("thumbnail")

    useEffect(() => {
        if (errors?.thumbnail) {
            setPreviewImage(null)
        }
    }, [errors?.thumbnail])

    /**
     * @summary     Handle Thumbnail Validation
     * @description Validate the thumbnail field
     * @type        {function}
     * */
    useEffect(() => {
        const handleThumbnailValidation = async () => {
            if (!thumbnailWatch?.[0]) {
                setPreviewImage(null);
                return;
            }

            setIsValidatingThumbnail(true);

            try {
                // Validate only the thumbnail field
                const isValid = await trigger('thumbnail');

                if (isValid) {
                    const reader = new FileReader();
                    reader.onload = () => setPreviewImage(reader.result as string);
                    reader.readAsDataURL(thumbnailWatch[0]);
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
    }


    /**
     * @summary     Handle Next
     * @description Handle the next button click
     * @type        {function}
     * */
    const handleNext = async () => {
        const isValid = await trigger();
        if (isValid) {
            setStep(1);
        }
    }


    return (
        <div className="1200px:w-[65%] 1000px:w-[90%]  w-[100%] mx-auto">
            {/* ----------------------- Heading ------------------------ */}
            <motion.div initial={{opacity: 0, y: -15}} animate={{opacity: 1, y: 0}} exit={{
                opacity: 0,
                x: -20
            }} className="400px:text-2xl text-lg font-bold mb-6 dark:text-white flex items-center">
                <FiInfo className="inline-block mr-2 text-purple-500 dark:text-purple-400 "/>
                <h2 className="">Course Information</h2>
            </motion.div>

            {/* ----------------------- Form Body -------------------------- */}
            <motion.div initial={{opacity: 0, x: -15}} animate={{opacity: 1, x: 0}} exit={{
                opacity: 0,
                x: -15
            }} className="flex flex-col gap-6">
                <div className="flex  800px:flex-row 800px:justify-between 800px:gap-10 flex-col gap-4">

                    {/* ---------------------------- Course Name ---------------------- */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="course-name" className="dark:text-slate-400 text-gray-600">Course Name <span className="text-red-500">*</span>
                        </label>
                        <motion.input {...register("name")} initial={{x: 0}} animate={errors?.name ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0}} transition={{duration: 0.5}} type="text" id="course-name" className={`${errors?.name ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`} placeholder="Enter Course Name"/>
                        {errors?.name && (
                            <motion.div initial={{opacity: 0, x: 15}} animate={{opacity: 1, x: 0}} exit={{
                                opacity: 0,
                                x: -15
                            }} className=" text-red-500 text-base">{errors?.name?.message?.toString()}</motion.div>
                        )}
                    </div>

                    {/* --------------------------- Course Price ---------------------- */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="price" className="dark:text-slate-400 text-gray-600">Course Price <span className="text-red-500">*</span>
                        </label>
                        <motion.input {...register("price")} initial={{x: 0}} animate={errors?.price ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0}} transition={{duration: 0.5}} type="number" id="price" className={`${errors?.price ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`} placeholder="99.99"/>
                        {errors?.price && (
                            <motion.div initial={{opacity: 0, x: 15}} animate={{opacity: 1, x: 0}} exit={{
                                opacity: 0,
                                x: -15
                            }} className=" text-red-500 text-base">{errors?.price?.message?.toString()}</motion.div>
                        )}
                    </div>

                    {/* --------------------------- Course Estimated Price ---------------------- */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="estimated-price" className="text-gray-600 dark:text-slate-400">Course Estimated Price <span className="text-red-500">*</span>
                        </label>
                        <motion.input {...register("estimatedPrice")} initial={{x: 0}} animate={errors?.estimatedPrice ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0}} transition={{duration: 0.5}} type="number" id="estimated-price" className={`${errors?.estimatedPrice ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`} placeholder="145.00"/>
                        {errors?.estimatedPrice && (
                            <motion.div initial={{opacity: 0, x: 15}} animate={{opacity: 1, x: 0}} exit={{
                                opacity: 0,
                                x: -15
                            }} className=" text-red-500 text-base">{errors?.estimatedPrice?.message?.toString()}</motion.div>
                        )}
                    </div>
                </div>

                {/* --------------------------- Course Tags ---------------------- */}
                <div className="flex 800px:flex-row 800px:justify-between flex-col gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="tags" className="text-gray-600 dark:text-slate-400">Tags <span className="text-red-500">*</span>
                        </label>
                        <motion.input {...register("tags")} initial={{x: 0}} animate={errors?.tags ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0}} transition={{duration: 0.5}} type="text" id="tags" className={`${errors?.tags ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`} placeholder="MERN Stack, React, Node, Python, Django, Development etc"/>
                        {errors?.tags && (
                            <motion.div initial={{opacity: 0, x: 15}} animate={{opacity: 1, x: 0}} exit={{
                                opacity: 0,
                                x: -15
                            }} className=" text-red-500 text-base">{errors?.tags?.message?.toString()}</motion.div>
                        )}
                    </div>
                    {/*  --------------------------- Course Level ------------------    */}

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="level" className="dark:text-slate-400 text-gray-600">Course Level <span className="text-red-500">*</span></label>
                        <Controller control={control} name={"level"} rules={{required: "Course Level is required"}} render={({field}) => (
                            <motion.div
                                initial={{x: 0}}
                                animate={errors?.level ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0}}
                                transition={{duration: 0.5}}
                            >
                                <Select
                                    {...field}
                                    value={options.find((option) => option.value === field.value)}
                                    onChange={(selectedOption: any) => field.onChange(selectedOption?.value?.toString())}
                                    styles={customStyles}
                                    options={options}
                                    placeholder="Select Course Level"
                                    menuPortalTarget={document.body}
                                    className={`${errors?.level ? "border-red-500" : "dark:border-slate-500 border-gray-400"} border rounded`}
                                />
                            </motion.div>
                        )}/>
                        {errors?.level && (
                            <motion.div
                                initial={{opacity: 0, x: 15}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -15}}
                                className="text-red-500 text-base"
                            >
                                {errors?.level?.message?.toString()}
                            </motion.div>
                        )}
                    </div>

                </div>


                {/* --------------------------- Course Description ---------------------- */}

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="description" className="text-gray-600 dark:text-slate-400">Description <span className="text-red-500">*</span></label>
                    <motion.textarea initial={{x: 0}} animate={errors?.description ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0}} transition={{duration: 0.5}}  {...register("description")} id="description" rows={10} className={`${errors?.description ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded resize-none`} placeholder="Enter Course Description"/>
                    {errors?.description && (
                        <motion.div initial={{opacity: 0, x: 15}} animate={{opacity: 1, x: 0}} exit={{
                            opacity: 0,
                            x: -15
                        }} className=" text-red-500 text-base">{errors?.description?.message?.toString()}</motion.div>
                    )}
                </div>


                {/*  ---------------------------- Course Thumbnail ---------------------------   */}


                <div className="flex flex-col gap-2">
                    <h4 className="text-gray-600 dark:text-slate-400">
                        Upload Thumbnail <span className="text-red-500">*</span>
                    </h4>

                    <motion.div initial={{x: 0}} animate={errors?.thumbnail ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0}} transition={{duration: 0.5}} className={`w-full 800px:min-h-[450px] min-h-[200px]  ${errors?.thumbnail ? "border-red-500 hover:border-red-500" : "border-gray-300 dark:border-slate-500 hover:border-purple-500"} flex items-center border-2 border-dashed  rounded-lg overflow-hidden transition-colors duration-300 relative group`}>
                        {
                            previewImage ? (
                                <div className="relative w-full h-full">
                                    <img src={previewImage} alt="Course Thumbnail" className="w-full h-full object-contain"/>
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <button onClick={handleRemoveImage} type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                                            Remove Image
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center w-full h-full space-y-4">
                                    <input
                                        {...register("thumbnail")}
                                        // onChange={handleSelectImage}
                                        type="file"
                                        id="thumbnail"
                                        className="hidden"
                                        accept=".jpg, .png, .jpeg, .webp"
                                    />
                                    <label
                                        htmlFor="thumbnail"
                                        className="flex flex-col items-center justify-center w-full h-full cursor-pointer group"
                                    >
                                        <div className="p-4 bg-purple-100 dark:bg-slate-700 rounded-full group-hover:bg-purple-200 transition-colors duration-300">
                                            <FaImages className="text-4xl text-purple-600 dark:text-purple-400"/>
                                        </div>
                                        <div className="mt-4 text-center">
                                            <p className="400px:text-lg text-sm font-medium text-gray-700 dark:text-gray-200">
                                                Click to upload thumbnail
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                Recommended: 1280x720 (16:9 aspect ratio)
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                Supported formats: JPG, PNG, WEBP
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            )
                        }

                    </motion.div>

                    {(errors?.thumbnail) && (
                        <motion.div
                            initial={{opacity: 0, x: 15}}
                            animate={{opacity: 1, x: 0}}
                            className="text-red-500 text-base"
                        >
                            {errors?.thumbnail?.message?.toString()}
                        </motion.div>
                    )}
                </div>


                <div className="flex 400px:justify-end justify-start">
                    <motion.button
                        whileHover={!isValid ? {scale: 1}: {scale: 1.05}}
                        whileTap={!isValid ? {scale: 1}: {scale: 0.95}}
                        onClick={handleNext}
                        disabled={!isValid}
                        className={`400px:px-[100px] px-[70px] py-2  text-base   text-white rounded transition-all duration-300  shadow-lg ${
                            !isValid
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                    >
                        Next
                    </motion.button>
                </div>

            </motion.div>
        </div>
    )
}

export default CourseInformation
