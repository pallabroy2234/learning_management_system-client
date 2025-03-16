import {useEffect, useMemo, useState} from "react";
import {CustomError} from "../../../types/@types.ts";
import {useDeleteUserByAdminMutation, useGetAllUsersByAdminQuery} from "../../../store/features/user/userApi.ts";
import toast from "react-hot-toast";
import Loader from "../../../components/shared/Loader.tsx";
import Table from "../../../components/shared/Table.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {motion} from "framer-motion";
import {FiTrash} from "react-icons/fi";
import {MdOutlineMail} from "react-icons/md";
import Modal from "../../../components/shared/Modal.tsx";

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
	// Fetch all users data with an admin query
	const {data: getAllUser, isLoading, isSuccess, isError, error} = useGetAllUsersByAdminQuery({});

	// State to control modal visibility and track selected user for deletion
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [deleteUser, {isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError, data: deleteData}] =
		useDeleteUserByAdminMutation();


	/**
	 * @summary Handles errors when fetching users.
	 *
	 * @description
	 * If the fetch request fails, this effect extracts the error message
	 * and displays it using `react-hot-toast`.
	 *
	 * @dependencies [isError]
	 */
	useEffect(() => {
		if (isError) {
			if ("data" in error) {
				const err = error as CustomError;
				const message = err.data.message || "An error occurred";
				toast.error(message);
			}
		}
	}, [isError]);


	/**
	 * @summary Triggers user deletion when confirmed.
	 *
	 * @description
	 * Calls the `deleteUser` mutation with the selected user ID.
	 * Ensures a user ID is selected before executing.
	 *
	 * @returns {Promise<void>} - A promise resolving when deletion completes.
	 */
	const handleDeleteUser = async () => {
		if (selectedUserId) {
			await deleteUser(selectedUserId);
		}
	};


	/**
	 * @summary Handles success and error states after user deletion.
	 *
	 * @description
	 * - If deletion succeeds, it shows a success toast and resets state.
	 * - If deletion fails, it extracts the error message and displays a toast.
	 *
	 * @dependencies [isDeleteSuccess, isDeleteError, deleteData, deleteError]
	 */
	useEffect(() => {
		if (isDeleteSuccess) {
			const message = deleteData?.message || "User deleted successfully";
			toast.success(message);
			setIsOpen(false);
			setSelectedUserId(null);
		}
		if (isDeleteError) {
			if ("data" in deleteError) {
				const err = deleteError as CustomError;
				const message = err.data.message || "An error occurred";
				toast.error(message);
			}
		}
	}, [isDeleteError, isDeleteSuccess, deleteData, deleteError]);

	/**
	 * @summary Defines table columns for the user management list.
	 *
	 * @description
	 * Each column corresponds to a user field and custom cell rendering.
	 *
	 * @returns {Array<ColumnDef<IUser>>} - Array of column definitions.
	 */

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
				cell: ({row}) => (
					<div className='flex items-center  gap-2'>
						<motion.button
							onClick={() => {
								setIsOpen(true);
								setSelectedUserId(row.original._id);
							}}
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
					<motion.button
						onClick={() => (window.location.href = `mailto:${row.original.email}`)}
						whileHover={{scale: 0.9}}
						whileTap={{scale: 1.05}}
						type='button'
						className='ml-2'>
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
				{isLoading ? (
					<Loader />
				) : (
					<Table
						data={isSuccess ? getAllUser?.payload : []}
						columns={columns}
						isHeader={true}
						placeholder='Search Users'
						headerContent='Users'
					/>
				)}
			</div>

			{/* Delete user Modal	 */}
			<Modal
				isModalOpen={isOpen}
				setIsModalOpen={setIsOpen}
				children={
					<div className='pt-2 pb-3'>
						<h3 className='text-xl text-center font-bold  mb-4 text-gray-800 dark:text-gray-200 capitalize'>Confirm User Deletion</h3>
						<p className='text-gray-600 dark:text-gray-400 mb-6'>
							Are you sure you want to delete this user? This action cannot be undo.
						</p>

						<div className='flex justify-end gap-3'>
							<button
								onClick={() => {
									setIsOpen(false);
									setSelectedUserId(null);
								}}
								type='button'
								className='px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors'>
								Cancel
							</button>
							<button
								onClick={handleDeleteUser}
								type='button'
								disabled={isDeleteLoading}
								className={`${isDeleteLoading ? "cursor-not-allowed" : "cursor-pointer"} px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50`}>
								{isDeleteLoading ? <div className='flex items-center gap-2'>Deleting...</div> : "Confirm Delete"}
							</button>
						</div>
					</div>
				}
			/>
		</div>
	);
};
export default Users;
