import SEO from "../../../components/shared/SEO.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../../types/@types.ts";
import {useState} from "react";
import {useLogOutMutation} from "../../../store/features/auth/authApi.ts";
import toast from "react-hot-toast";
import {Outlet, useNavigate} from "react-router-dom";
import SidebarProfile from "./components/SidebarProfile.tsx";


const Profile = () => {
	const [logOut] = useLogOutMutation();
	const {user} = useSelector((state: RootState) => state.auth);
	const navigate = useNavigate();

	const [scroll, setScroll] = useState<boolean>(false);

	if (typeof window !== "undefined") {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 85) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		});
	}

	//  handle log out
	const handleLogOut = async () => {
		const res = await logOut({});
		if (res.data && res.data.success) {
			toast.success(res?.data?.message || "Logged out successfully");
			navigate("/");
		}
	};

	return (
		<div className='mt-[120px] h-screen'>
			<SEO
				title={`${user?.name || "User"} Profile | Learning Management System`}
				description={`View ${user?.name || "user"}'s profile with ${
					user?.courses?.length || 0
				} enrolled courses and achievements`}
				keywords={[
					"user profile",
					"learning progress",
					"course enrollment",
					"achievements",
				]}
				ogTitle={`${user?.name || "User"} Profile`}
				ogDescription={`Explore ${user?.name || "user"}'s learning journey on our platform`}
				ogImage={user?.avatar?.url || "/default-profile.png"}
				ogUrl={`${window.location.origin}/profile`}
			/>

			<div className='w-full px-4 500px:px-0 500px:w-[85%] flex mx-auto'>
				<div
					className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900  bg-white bg-opacity-90 border dark:border-none   rounded-lg shadow-lg sticky ${scroll ? "top-[120px]" : "top-[30px]"}`}>
					<SidebarProfile
						handleLogOut={handleLogOut}
						user={user}
					/>
				</div>


				<div className='w-full h-full bg-transparent mt-[10px]'>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
export default Profile;
