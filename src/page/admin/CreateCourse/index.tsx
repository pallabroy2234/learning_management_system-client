import SEO from "../../../components/shared/SEO.tsx";
import {useForm} from "react-hook-form";
import Create from "./components/Create.tsx";


const CreateCourse = () => {


    const {} = useForm({
        defaultValues: {},
        mode: "onChange",
        progressive: true,
    })


    return (
        <>
            <SEO
                title="Create Course | Learning Management System"
                description="Easily create and manage courses with our intuitive course builder. Add lessons, quizzes, and course materials effortlessly."
                keywords={[
                    "create course",
                    "course builder",
                    "LMS course creation",
                    "online teaching",
                    "course management",
                    "lesson planning"
                ]}
                ogTitle="Create Course - Build & Manage Online Courses"
                ogDescription="Design and publish courses with ease using our powerful Learning Management System. Add lessons, quizzes, and interactive content."
                ogImage="/create-course.png"
                ogUrl={`${window.location.origin}/create-course`}
            />

            {/* Create Course component  */}
            <div className="mt-[60px]">
                <Create/>
            </div>
        </>

    )
}
export default CreateCourse
