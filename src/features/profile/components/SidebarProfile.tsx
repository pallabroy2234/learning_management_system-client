import {RootState} from "../../../types/@types.ts";
import {FC} from "react";
import defaultAvatar from "../../../../public/avatar.jpg";
import {RiLockPasswordLine} from "react-icons/ri";
import {SiCoursera} from "react-icons/si";
import {AiOutlineLogout} from "react-icons/ai";

type Props = {
	user?: RootState["auth"]["user"];
	active?: string;
	setActive?: (active: string) => void;
	handleLogOut?: () => void;
}


const SidebarProfile: FC<Props> = ({handleLogOut, active, setActive, user}) => {


	return (
		<div className="w-full">
			<div onClick={() => setActive?.("account")} className={`w-full flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-slate-800 hover:transition-[background-color] hover:duration-200 px-3 py-4 border-b dark:border-none shadow cursor-pointer ${active === "account" ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent"}`}>
				<div className="w-[20px] h-[20px] 800px:w-[40px] 800px:h-[40px] cursor-pointer rounded-full overflow-hidden">
					<img src={user?.avatar.url || defaultAvatar} alt={user?.name} className="object-cover" />
				</div>
				<h5 className="800px:block hidden font-Poppins dark:text-white">My Account</h5>
			</div>


			<div onClick={() => setActive?.("password")} className={`w-full flex items-center gap-2 px-3 hover:bg-gray-200 dark:hover:bg-slate-800 hover:transition-[background-color] hover:duration-200 py-4 border-b dark:border-none shadow cursor-pointer ${active === "password" ? "dark:bg-slate-800 bg-gray-200" : "bg - transparent"}`}>
				<RiLockPasswordLine size={20} />
				<h5 className="pl-2 800px:block hidden font-Poppins dark:text-white">Change Password</h5>
			</div>

			<div onClick={() => setActive?.("courses")} className={`w-full flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-slate-800 hover:transition-[background-color] hover:duration-200 px-3 py-4 border-b dark:border-none shadow cursor-pointer ${active === "courses" ? "dark:bg-slate-800 bg-gray-200" : "bg - transparent"}`}>
				<SiCoursera size={20} />
				<h5 className="pl-2 800px:block hidden font-Poppins dark:text-white">Enrolled Courses</h5>
			</div>

			<div onClick={handleLogOut} className={`w-full flex items-center gap-2 hover:bg-gray-200  dark:hover:bg-slate-800 hover:transition-[background-color] hover:duration-200 px-3 py-4 border-b dark:border-none shadow cursor-pointer ${active === "logout" ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent"}`}>
				<AiOutlineLogout size={20} />
				<h5 className="pl-2 800px:block hidden font-Poppins dark:text-white">Log Out</h5>
			</div>
		</div>
	);
};
export default SidebarProfile;
