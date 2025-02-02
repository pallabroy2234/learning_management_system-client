import {FC, useState, useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import NavItems from "./NavItems.tsx";
import ThemeSwitcher from "./ThemeSwitcher.tsx";
import {HiOutlineMenuAlt3, HiOutlineUserCircle, HiUserCircle} from "react-icons/hi";

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	activeItem: number;
};

const Header: FC<Props> = ({activeItem, setOpen}) => {
	const [showHeader, setShowHeader] = useState(true);
	const lastScrollY = useRef(0);
	const [openSidebar, setOpenSidebar] = useState(true);

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
			document.body.style.overflow = "hidden";
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
						<NavItems activeItem={activeItem} isMobile={false} />
						<ThemeSwitcher />

						{/* Mobile Menu */}
						<div className="800px:hidden">
							<HiOutlineMenuAlt3 onClick={() => setOpenSidebar(true)} size={25} className="cursor-pointer dark:text-white text-black" />
						</div>

						{/* User Profile */}
						<HiUserCircle onClick={() => setOpen(true)} size={30} className="cursor-pointer hidden 800px:block dark:text-white text-black" />
					</div>
				</div>
			</header>

			{/*--------------------- Small Screen Sidebar----------------------*/}
			<div className={`fixed   bg-white dark:bg-slate-900  z-[99999] right-0 top-0 bottom-0 opacity-90 shadow-lg transition-all duration-300  ease-in-out ${openSidebar ? "translate-x-0" : "translate-x-full"}`}>
				{
					openSidebar && (
						<>
							<NavItems activeItem={activeItem} isMobile={true} />
							<HiOutlineUserCircle className="cursor-pointer ml-5 my-6 text-black dark:text-white" size={25} />
							<br />
							<br />
							<p className="text-[16px] px-2 pl-5 text-black dark:text-white">© 2025 Copyright: Pallab Roy Tushar</p>
						</>
					)
				}
			</div>
			<div onClick={() => setOpenSidebar(false)} className={`absolute cursor-pointer top-0 right-0 bottom-0 left-0 overflow-hidden bg-black/50 opacity-50 inset-0 z-[99998] backdrop-blur-lg ${openSidebar ? "visible" : "invisible"}`}>
			</div>
		</>
	);
};

export default Header;
