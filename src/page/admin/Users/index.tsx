
import {useEffect, useMemo, useState} from "react";
import {CustomError} from "../../../types/@types.ts";
import {useGetAllUsersByAdminQuery} from "../../../store/features/user/userApi.ts";
import toast from "react-hot-toast";
import Loader from "../../../components/shared/Loader.tsx";
import Table from "../../../components/shared/Table.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {motion} from "framer-motion";
import {FiTrash} from "react-icons/fi";
import {MdOutlineMail} from "react-icons/md";



interface IUser {
	_id: string;
	avatar: {
		url: string;
	};
	name: string;
	email: string;
	provider: string;
	role: string;
	isVerified: boolean;
	courses: string[];
	createdAt: string;
}

const Users = () => {
	const [users, setUsers] = useState<Array<IUser>>([]);
     const {data:getAllUser , isLoading, isSuccess, isError, error}  = useGetAllUsersByAdminQuery({})


	useEffect(()=> {
		if(isSuccess){
			setUsers(getAllUser?.payload)
		}
		if(isError){
			if("data" in error){
				const err = error as CustomError;
				const message  = err.data.message || "An error occurred";
				toast.error(message);
			}
		}
	},[isError, isSuccess])



	const columns = useMemo<ColumnDef<IUser>[]>(
		() => [
			{
				accessorKey: "_id",
				header: "ID",
				cell: ({getValue}) => <span className='text-sm text-gray-600 dark:text-gray-400'>{getValue<string>()}</span>,
			},
			{
				accessorKey: "avatar",
				header: "Avatar",
				cell: ({row}) => <img src={row.original.avatar.url} alt={row.original.name} className='w-[50px] h-[50px] rounded-full ' />,
			},
			{
				accessorKey: "name",
				header: "Name",
				cell: ({getValue}) => <span className='text-sm text-gray-600 dark:text-gray-400'>{getValue<string>()}</span>,
			},
			{
				accessorKey: "email",
				header: "Email",
				cell: ({getValue}) => <span className='text-sm text-gray-600 dark:text-gray-400'>{getValue<string>()}</span>,
			},
			{
				accessorKey: "role",
				header: "Role",
				cell: ({getValue}) => <span className='text-sm text-gray-600 dark:text-gray-400'>{getValue<string>()}</span>,
			},
			{
				accessorKey: "isVerified",
				header: "Verified",
				cell: ({getValue}) => <span className='text-sm ml-4 text-gray-600 dark:text-gray-400'>{getValue<boolean>() ? "Yes" : "No"}</span>,
			},
			{
				accessorKey: "createdAt",
				header: "Joined",
				cell: ({getValue}) => (
					<span className='text-sm text-gray-600 dark:text-gray-400'>{new Date(getValue<string>()).toLocaleDateString()}</span>
				),
			},
			{
				accessorKey: "courses",
				header: "Purchased Courses",
				cell: ({getValue}) => (
					<span className='text-sm flex ml-[60px]  items-center text-gray-600 dark:text-gray-400'>{getValue<string[]>().length}</span>
				),
			},
			{
				accessorKey: "actions",
				header: "Actions",
				cell: () => (
					<div className='flex items-center  gap-2'>
						<motion.button
							whileHover={{scale: 0.9}}
							whileTap={{scale: 1.05}}
							type='button'
							className='flex ml-4 text-red-500 dark:text-red-400'>
							<FiTrash size={18} />
						</motion.button>
					</div>
				),
			},
			{
				accessorKey: "Email",
				header: "Email",
				cell: ({row}) => (
					<motion.button onClick={() => window.location.href = `mailto:${row.original.email}`} whileHover={{scale: 0.9}} whileTap={{scale: 1.05}} type='button' className='ml-2'>
						<MdOutlineMail size={20} />
					</motion.button>
				),
			},
		],
		[],
	);



	return (
		<div className='mt-[120px]'>
			<div className='px-4 sm:px-6 min-h-screen mb-[80px]'>
				{
					isLoading ? <Loader/> : <Table data={users} columns={columns}  isHeader={true} placeholder="Search Users" headerContent="Users"/>
				}
			</div>
		</div>
	);
};
export default Users;
