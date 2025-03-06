import {FormProvider, Resolver, useForm} from "react-hook-form";
import {useState} from "react";
import Stepper from "./Stepper.tsx";
import CourseInformation from "./CourseInformation.tsx";
import {AnimatePresence} from "framer-motion";
import {yupResolver} from "@hookform/resolvers/yup";
import {ICourseFormValues} from "../../../../types/@types.ts";
import {courseInfoSchema} from "../../../../schema/courseSchema.tsx";


const Create = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ["Course Info", "Course Option", "Course Content", "Course Preview"];
    const stepsSchemas = [courseInfoSchema];


    const methods = useForm<ICourseFormValues>({
        defaultValues: {
            thumbnail: '',
            name: '',
            price: NaN,
            estimatedPrice: NaN,
            tags: '',
            level: '',
            description: '',
            demoUrl: '',
            benefits: [{title: ''}],
            prerequisites: [{title: ''}],
            courseData: [{
                title: '',
                videoDescription: '',
                videoUrl: '',
                videoSection: '',
                videoLength: null,
                videoPlayer: '',
                links: [{title: '', url: ''}]
            }]
        },
        mode: 'onChange',
        resolver: yupResolver(stepsSchemas[currentStep]) as unknown as Resolver<ICourseFormValues>
    });

    const onSubmit = (data: any) => {
        console.log(data);
    }


    return (
        <div className="mt-[60px] px:-4 px-6 mx-auto">
            <div className="py-[30px] flex justify-center items-center  mt-[80px]">
                <Stepper steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep}/>
            </div>
            <div className="mt-[50px]">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6  border dark:bg-slate-800 border-gray-300 dark:border-slate-700/80 rounded pb-[80px] mb-[100px]">
                        {/* Course Step Menu */}
                        <div>
                            <AnimatePresence mode="wait">
                                {
                                    currentStep === 0 && (
                                        <CourseInformation setStep={setCurrentStep}/>
                                    )
                                }
                            </AnimatePresence>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}
export default Create