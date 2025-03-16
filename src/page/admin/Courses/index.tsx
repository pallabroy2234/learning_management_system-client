import {useEffect, useMemo} from "react";
import {useGetCoursesQuery} from "../../../store/features/course/courseApi.ts";
import {CustomError} from "../../../types/@types.ts";
import toast from "react-hot-toast";
import Loader from "../../../components/shared/Loader.tsx";
import Table from "../../../components/shared/Table.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {motion} from "framer-motion";
import {FiEdit, FiTrash2} from "react-icons/fi";

interface Course {
	_id: string;
	name: string;
	description: string;
	price: number;
	level: string;
	createdAt: string;
	rating: number;
	purchased: number;
	thumbnail: {
		url: string;
	};
}

const LiveCourse = () => {
	const {data: getAllCourses, isLoading, isSuccess, isError, error} = useGetCoursesQuery({});

	/**
	 * @summary         Handles API request errors.
	 *
	 * @description    Monitors the isError state and displays a toast notification
	 *                 with an appropriate error message if an error occurs.
	 * @dependency     Runs when `isSuccess`, `isError`, or `error` changes.
	 */
	useEffect(() => {
		if (isError) {
			if ("data" in error) {
				const err = error as CustomError;
				const message = err.data.message || "An error occurred";
				toast.error(message);
			}
		}
	}, [isSuccess, isError, error]);

	/**
	 * @summary   Truncates text beyond a specified length.
	 * @param    text - The original text string to be truncated.
	 * @param    length - The maximum length allowed before truncation.
	 * @returns  The truncated text with an ellipsis if it exceeds the given length.
	 *
	 * @example
	 * truncate("This is a long text", 10); // Output: "This is a..."
	 */
	const truncate = (text: string, length: number) => {
		return text.length > length ? text.substring(0, length) + "..." : text;
	};

	/**
	 * @summary       Defines the column structure for the courses table.
	 * @description  This configuration is used with React Table (ColumnDef) to display
	 *               course-related data such as ID, name, price, rating, and more. Each column
	 *               includes an accessor key and optional custom rendering logic.
	 */

	const columns = useMemo<ColumnDef<Course>[]>(
		() => [
			// {
			// 	id: "Select",
			// 	header: ({table})=> (
			// 		<input type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllPageRowsSelectedHandler()}  className="form-checkbox h-4 w-4 rounded text-purple-600 transition focus:ring-purple-500 dark:bg-gray-700"/>
			// 	),
			// 	cell: ({row})=> (
			// 		<input
			// 			checked={row.getIsSelected()}
			// 			onChange={row.getToggleSelectedHandler()}
			// 			type="checkbox"
			// 			className="form-checkbox h-4 w-4 rounded text-purple-500 transition focus:ring-purple-500 dark:bg-gray-700"
			// 		/>
			// 	)
			// },
			{
				accessorKey: "_id",
				header: "ID",
			},
			{
				accessorKey: "thumbnail",
				header: "Thumbnail",
				cell: ({row}) => (
					<div className=''>
						<img src={row.original.thumbnail.url} alt={row.original.name} className='w-[120px] h-[50px] ' />
					</div>
				),
			},
			{
				accessorKey: "name",
				header: "Course Name",
				cell: ({getValue}) => <span className='font-medium text-gray-800 dark:text-gray-200'>{truncate(getValue<string>(), 50)}</span>,
			},
			{
				accessorKey: "description",
				header: "Description",
				cell: ({getValue}) => <span className='max-w-xs  text-gray-600 dark:text-gray-400'>{truncate(getValue<string>(), 30)}</span>,
			},
			{
				accessorKey: "price",
				header: "Price",
				cell: ({getValue}) => `$${getValue<number>().toLocaleString()}`,
			},
			{
				accessorKey: "level",
				header: "Level",
				cell: ({getValue}) => (
					<span className='inline-block rounded-full bg-purple-500 px-3 py-1 text-sm text-white dark:bg-purple-900/30 dark:text-purple-400'>
						{getValue<string>()}
					</span>
				),
			},
			{
				accessorKey: "createdAt",
				header: "Created Data",
				cell: ({getValue}) => new Date(getValue<string>()).toLocaleDateString(),
			},
			{
				accessorKey: "rating",
				header: "Rating",
				cell: ({getValue}) => (
					<div className='flex items-center'>
						<span className='mr-2 text-yellow-500'>★</span>
						{getValue<number>()}
					</div>
				),
			},
			{
				accessorKey: "purchased",
				header: "Purchased",
			},
			{
				id: "Actions",
				header: "Actions",
				cell: () => (
					<div className='flex space-x-3'>
						<motion.button
							type='button'
							whileHover={{scale: 1.05}}
							whileTap={{scale: 0.95}}
							className='text-blue-500 hover:text-blue-600 dark:text-blue-400'>
							<FiEdit size={18} />
						</motion.button>

						<motion.button
							whileHover={{scale: 1.05}}
							whileTap={{scale: 0.95}}
							className='text-red-500 hover:text-red-600 dark:text-red-400'>
							<FiTrash2 size={18} />
						</motion.button>
					</div>
				),
			},
		],
		[],
	);

	return (
		<div className='mt-[120px]'>
			{/*<CoursesTable data={courses} onEdit={handleEdit} onDelete={handleDelete} />*/}
			<div className='px-4 sm:px-6 min-h-screen mb-[80px]'>
				{isLoading ? <Loader /> : <Table data={isSuccess ? getAllCourses?.payload : []} columns={columns} isDownload={true} />}
			</div>
		</div>
	);
};
export default LiveCourse;
