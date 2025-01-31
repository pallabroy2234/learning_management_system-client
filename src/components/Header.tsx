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
	const [openSidebar, setOpenSidebar] = useState(false);

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

	const handleSideBarClose = (e: any) => {
		if (e.target.id === "screen") {
			setOpenSidebar(false);
		}
	};

	return (
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

			{/* --------------------- Small Screen Sidebar----------------------    */}
			{
				openSidebar && (
					<div>
						<div onClick={handleSideBarClose} id="screen" className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]">
							<div className="w-[70%] fixed z-[9999999] h-screen bg-white dark:bg-slate-900 dark:opacity-90 top-0 right-0">
								<NavItems activeItem={activeItem} isMobile={true} />
								<HiOutlineUserCircle className="cursor-pointer ml-5 my-6 text-black dark:text-white" size={25} />
								<br />
								<br />
								<p className="text-[16px] px-2 pl-5 text-black dark:text-white">© 2025 Copyright: Pallab Roy Tushar</p>
							</div>
						</div>
						{/*<div className="fixed bg-black blur-md opacity-[0.3] top-0 left-0 bottom-0 right-0 z-[99998]"></div>*/}
					</div>
				)
			}
		</header>
	);
};

export default Header;
