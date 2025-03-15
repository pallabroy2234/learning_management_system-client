import {useEffect, useState} from "react";
import CoursesTable from "./component/CoursesTable.tsx";
import {useGetCoursesQuery} from "../../../store/features/course/courseApi.ts";
import {CustomError} from "../../../types/@types.ts";
import toast from "react-hot-toast";
import Loader from "../../../components/shared/Loader.tsx";

const LiveCourse = () => {


	const {data:getAllCourses, isLoading, isSuccess, isError, error} = useGetCoursesQuery({})


	const [courses, setCourses] = useState<any>([]);



	useEffect(()=> {
		if(isSuccess){
			setCourses(getAllCourses?.payload)
		}
		if(isError){
			if("data" in error){
				const err = error as CustomError;
				const message = err.data.message || "An error occurred";
				toast.error(message);
			}
		}
	},[isSuccess, isError])
	


	// course: any
	const handleEdit = () => {
		// Implement edit logic
	};

	// courseId: string
	const handleDelete = () => {
		// Implement delete logic
	};
	return (
		<div className='mt-[120px]'>
			{/*<CoursesTable data={courses} onEdit={handleEdit} onDelete={handleDelete} />*/}
			<div className='px-4 sm:px-6 min-h-screen mb-[80px]'>
				{
                       isLoading ? <Loader/> : <CoursesTable data={courses} onEdit={handleEdit} onDelete={handleDelete} />
				}
			</div>
		</div>
	);
};
export default LiveCourse;
