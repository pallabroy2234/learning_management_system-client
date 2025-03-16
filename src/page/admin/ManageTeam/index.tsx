import Modal from "../../../components/shared/Modal.tsx";
import {useEffect, useMemo, useState} from "react";
import {useGetAllUsersByAdminQuery, useUpdateRoleByAdminMutation} from "../../../store/features/user/userApi.ts";
import {ColumnDef} from "@tanstack/react-table";
import {motion} from "framer-motion";
import {FiTrash} from "react-icons/fi";
import {MdOutlineMail} from "react-icons/md";
import Loader from "../../../components/shared/Loader.tsx";
import Table from "../../../components/shared/Table.tsx";
import {CustomError} from "../../../types/@types.ts";
import toast from "react-hot-toast";
import {Controller, useForm} from "react-hook-form";
import Select, {StylesConfig} from "react-select";
import {getSelectStyle} from "../../../lib/SelectStyle.ts";
import {useTheme} from "next-themes";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {IUpdateRoleRequest} from "../../../store/features/user/userTypes.ts";
import {ThreeDots} from "react-loader-spinner";


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


const updateRoleSchema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	role: yup.string().required("Role is required").oneOf(["admin", "user"], "Invalid Role"),
})

const ManageTeam = () => {
	const {theme} = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const customStyles = getSelectStyle({theme});
	const [onlyAdmin, setOnlyAdmin] = useState([]);
	const {data: getAdminUsers, isLoading, isSuccess, isError, error} = useGetAllUsersByAdminQuery({});
	const [updateRole, {isLoading:updateRoleLoading, isSuccess:updateRoleSuccess, isError:isUpdateRoleError, error:updateRoleError, data:updateRoleData}] =useUpdateRoleByAdminMutation()

	/**
	 * @summary      define form state (react-hook-form)
	 * @description  define form state (react-hook-form)
	 *
	* */
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: {errors , isValid,isSubmitting},
	} = useForm({
		defaultValues: {
			email: "",
			role: "",
		},
		resolver: yupResolver(updateRoleSchema),
        mode: "onChange"
	});


	/**
	 * @summary      handle success and error response for get all users by admin
	 * @description  handle success and error response for get all users by admin (react-query) and set only admin users
	 * @sideEffects  set only admin users
	 *
	* */
	useEffect(() => {
		if (isSuccess) {
			const admins = getAdminUsers?.payload.filter((user: IUser) => user.role === "admin");
			setOnlyAdmin(admins);
		}
		if (isError) {
			if ("data" in error) {
				const err = error as CustomError;
				const message = err?.data?.message || "An error occurred";
				setOnlyAdmin([]);
				toast.error(message);
			}
		}
	}, [isSuccess, isError, error,getAdminUsers]);



	/**
	 * @summary      define options for select input
	 * @description  define options for select input (react-select)
	 * @constant    options
	 * @type        {Array}
	* */
	const options = [
		{value: "user", label: "User"},
		{value: "admin", label: "Admin"},
	];




	/**
	 * @summary      handle form submit
	 * @description  handle form submit (react-hook-form)
	 * @param        {IUpdateRoleRequest} data
	 *
	* */
	const onSubmit  = async (data:IUpdateRoleRequest)=> {
         if(data){
			 await  updateRole(data)
		 }
	}

	/**
	 * @summary      handle success and error response for update role
	 * @description  handle success and error response for update role (react-query)
	 * @sideEffects  show toast message
	 * @sideEffects  reset form
	 * @sideEffects  close modal
	 * @constant    message
	* */
	useEffect(() => {
		if(updateRoleSuccess){
			const message = updateRoleData?.message || "Role updated successfully";
			toast.success(message);
			reset();
			setIsOpen(false);
		}
		if(isUpdateRoleError){
			if("data" in updateRoleError){
				const err = updateRoleError as CustomError;
				const message = err?.data?.message || "An error occurred";
				toast.error(message);
			}
		}
	}, [updateRoleSuccess, isUpdateRoleError, updateRoleError, updateRoleData]);


	/**
	 * @summary      define columns for table
	 * @description  define columns for table (react-table)
	 *
	* */
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
				{/* Table */}
				{isLoading ? <Loader /> : <Table data={onlyAdmin} columns={columns}  children={
					<button onClick={()=> setIsOpen(true)} type="button" className="dark:bg-gray-600 bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 px-8 py-[8px] rounded dark:text-gray-200 text-gray-700 transition-all duration-200 text-[16px]">
						Add New Member
					</button>
				} />}
			</div>

			{/* Modal */}
			<Modal
				isModalOpen={isOpen}
				setIsModalOpen={setIsOpen}
				children={
					<div className='px-2 h-[350px]'>
						{/* Modal Header */}
						<h3 className='text-center text-lg tracking-wider dark:text-gray-200 text-gray-700 font-semibold mt-3 mb-2'>
							Change User Role
						</h3>
						{/* Form */}
						<form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-5'>
							<div className='flex flex-col gap-2'>
								<label htmlFor='email' className='dark:text-slate-300 text-gray-600'>
									Email
								</label>
								<input
									{...register("email")}
									type='email'
									id='email'
									placeholder='Enter Email'
									className={`${errors?.email ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
								/>
								{errors?.email && <span className='text-red-500 text-sm'>{errors.email?.message}</span>}
							</div>

							{/* Select */}
							<div>
								<Controller
									control={control}
									name={"role"}
									rules={{required: "Role is required"}}
									render={({field}) => (
										<motion.div className='flex flex-col gap-2'>
											<label htmlFor='role' className='dark:text-slate-300 text-gray-600'>
												Role
											</label>
											<Select
												{...field}
												value={options.find((option) => option.value === field.value)}
												onChange={(selectedOption: any) => field.onChange(selectedOption?.value?.toString())}
												styles={customStyles as StylesConfig}
												options={options}
												placeholder='Select Role'
												menuPortalTarget={document.body}
												className={`${errors?.role ? "border-red-500" : "dark:border-slate-500 border-gray-400"} border rounded`}
											/>
										</motion.div>
									)}
								/>
							</div>

							{/* Update Role Button */}
							<button
								disabled={!isValid || isSubmitting}
								type='submit'
								className={`${!isValid || isSubmitting ? "cursor-not-allowed" : "cursor-pointer"} flex justify-center py-2 mt-10 dark:bg-gray-600 dark:hover:bg-gray-700   dark:text-gray-300 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 rounded-lg`}>
								{updateRoleLoading ?  <ThreeDots height="20" width="40" radius="9" color="#fff" /> : "Update Role" }
							</button>
						</form>
					</div>
				}
			/>
		</div>
	);
};
export default ManageTeam;
