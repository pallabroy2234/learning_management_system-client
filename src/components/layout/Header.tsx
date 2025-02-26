import {FC, useState, useEffect, useRef} from "react";
import {Link, useLocation} from "react-router-dom";
import NavItems from "./NavItems.tsx";
import ThemeSwitcher from "../ui/ThemeSwitcher.tsx";
import {HiOutlineMenuAlt3, HiOutlineUserCircle} from "react-icons/hi";
import CustomModal from "../shared/CustomModal.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../types/@types.ts";
import avatar from "../../../public/avatar.jpg";
import Login from "../auth/Login.tsx";
import SignUp from "../auth/SignUp.tsx";
import Verification from "../auth/Verification.tsx";


type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	activeItem: number;
	setActiveItem: (activeItem: number) => void;
	route: string;
	setRoute: (route: string) => void;
};

const Header: FC<Props> = ({activeItem, setOpen, route, open, setRoute}) => {
	const {pathname} = useLocation();
	const [showHeader, setShowHeader] = useState(true);
	const lastScrollY = useRef(0);
	const [openSidebar, setOpenSidebar] = useState(false);
	const {user} = useSelector((state: RootState) => state.auth);


	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > lastScrollY.current) {
				setShowHeader(false);
			} else {
				setShowHeader(true);
			}
			lastScrollY.current = window.scrollY;
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);


	useEffect(() => {
		if (openSidebar) {
			document.body.style.overflowX = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [openSidebar]);

	return (
		<>
			<header
				className={`fixed top-0 left-0 w-full h-[80px] z-[80] border-b
				transition-transform duration-300 backdrop-blur-lg shadow-md
				${showHeader ? "translate-y-0" : "-translate-y-full"}
				bg-gradient-to-b from-white/30 to-white/10 dark:from-[#0a192f]/60 dark:to-[#172a45]/30
				border-gray-200 dark:border-gray-700`}
			>
				<div className="w-[95%] 800px:w-[92%] mx-auto py-2 h-full flex items-center justify-between">
					{/* Logo */}
					<Link to="/" className="text-[25px] font-Poppins font-[500] text-black dark:text-white">
						E-Learning
					</Link>

					{/* Navigation */}
					<div className="flex items-center gap-4">
						<NavItems isMobile={false} />
						<ThemeSwitcher />

						{/* Mobile Menu */}
						<div className="800px:hidden">
							<HiOutlineMenuAlt3 onClick={() => setOpenSidebar(true)} size={25} className="cursor-pointer dark:text-white text-black" />
						</div>

						{/* User Profile */}
						<div className={`800px:block hidden w-[30px] h-[30px] rounded-full overflow-hidden ${pathname === "/profile" ? "ring  dark:ring-[#37a39a]  ring-[crimson]" : "ring-0"}`}>
							{
								user ? (
									<Link to={"/profile"} className={`w-[30px] h-[30px] rounded-full cursor-pointer overflow-hidden`}>
										<img src={user?.avatar?.url ? user?.avatar?.url : avatar} alt={user?.name} className="w-full h-full object-cover" />
									</Link>
								) : (
									<HiOutlineUserCircle onClick={() => setOpen(true)} size={30} className="cursor-pointer hidden 800px:block dark:text-white text-black" />
								)
							}
						</div>
					</div>
				</div>
			</header>

			{/*---------------------Start Small Screen Sidebar----------------------*/}

			<div className="overflow-hidden">
				<div className={`fixed   bg-white dark:bg-slate-900 z-[999999]  transition-transform duration-300 top-0  bottom-0 right-0 overflow-y-auto  ${openSidebar ? "translate-x-0  max-w-[360px]" : "translate-x-full w-0 max-w-0 transition-all ease-in-out"}`}>
					<div className="mt-5">
						<div className="flex flex-col gap-4 mt-4 flex-1">
							<Link onClick={() => setOpenSidebar(false)} to={"/"} className="px-6 text-[25px] font-Poppins font-[500] text-black dark:text-white">E-Learning</Link>
							<Link onClick={() => setOpenSidebar(false)} to="/" className={`${pathname === "/" ? "dark:text-[#37a39a] text-[crimson] " : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>Home</Link>
							<Link onClick={() => setOpenSidebar(false)} to="/courses" className={`${pathname === "/courses" ? "dark:text-[#37a39a] text-[crimson] " : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>Courses</Link>
							<Link onClick={() => setOpenSidebar(false)} to="/about" className={`${pathname === "/about" ? "dark:text-[#37a39a] text-[crimson] " : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>About</Link>
							<Link onClick={() => setOpenSidebar(false)} to="/policy" className={`${pathname === "/policy" ? "dark:text-[#37a39a] text-[crimson] " : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>Policy</Link>
							<Link onClick={() => setOpenSidebar(false)} to="/faq" className={`${pathname === "/faq" ? "dark:text-[#37a39a] text-[crimson] " : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>FAQ</Link>
							<div className="px-6" onClick={() => setOpenSidebar(false)}>
								{
									user ? (
										<Link to={"/profile"} className={`${pathname === "/profile" ? "dark:text-[#37a39a] text-[crimson] " : "dark:text-white text-black"} text-[18px]  font-Poppins font-[400]`}>
											Profile
										</Link>
									) : (
										<span className="">
											<HiOutlineUserCircle onClick={() => setOpen(true)} size={25} className="cursor-pointer  dark:text-white text-black" />
										</span>
									)
								}
							</div>
						</div>
						<p className={`px-6 my-10`}>© 2025 Copyright: Pallab Roy Tushar</p>
					</div>
				</div>
			</div>

			<div onClick={() => setOpenSidebar(false)} className={`backdrop-overlay ${openSidebar ? "visible" : "invisible"}`}>
			</div>


			{/*	SignUp and LogIn Modal */}
			<div>
				{
					route === "Login" && (
						<div>
							{
								open &&
								<CustomModal open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} component={Login} />
							}
						</div>
					)
				}

				{
					route === "Sign-up" && (
						<div>
							{
								open &&
								<CustomModal open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} component={SignUp} />
							}
						</div>
					)
				}

				{
					route === "Verification" && (
						<div>
							{
								open &&
								<CustomModal open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} component={Verification} />
							}
						</div>
					)
				}
			</div>

		</>
	);
};

export default Header;
