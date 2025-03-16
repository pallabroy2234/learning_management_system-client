import UserTable from "./components/UserTable.tsx";
import {useEffect, useState} from "react";
import {CustomError, IUser} from "../../../types/@types.ts";
import {useGetAllUsersByAdminQuery} from "../../../store/features/user/userApi.ts";
import toast from "react-hot-toast";
import Loader from "../../../components/shared/Loader.tsx";

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




	return (
		<div className='mt-[120px]'>
			<div className='px-4 sm:px-6 min-h-screen mb-[80px]'>
				{
					isLoading ? <Loader/> : <UserTable data={users} />
				}
			</div>
		</div>
	);
};
export default Users;
