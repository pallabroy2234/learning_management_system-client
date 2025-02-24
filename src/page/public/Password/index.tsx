import {useSelector} from "react-redux";
import {RootState} from "../../../types/@types.ts";
import CreatePassword from "./components/CreatePassword.tsx";
import ChangePassword from "./components/ChangePassword.tsx";

const Password = () => {
	const {user} = useSelector((state: RootState) => state.auth);

	return (
		<div className='w-full pl-7 px-2 800px:px-5 800px:pl-0'>
			<h1 className='block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-[#fff] pb-2'>
				{(user?.password === null || user?.password === "") && "Create Password"}
				{user?.password === undefined && "Change Password"}
			</h1>

			<div className='w-full mt-[40px]'>
				{(user?.password === null || user?.password === "") && <CreatePassword />}
				{user?.password === undefined && <ChangePassword />}
			</div>
		</div>
	);
};
export default Password;
