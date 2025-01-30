import {FC, useState} from "react";
import {Link} from "react-router-dom";
import NavItems from "./NavItems.tsx";
import ThemeSwitcher from "./ThemeSwitcher.tsx";
import {HiOutlineMenuAlt3, HiOutlineUserCircle, HiUserCircle} from "react-icons/hi";


type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
	activeItem: number
}


const Header: FC<Props> = ({activeItem, setOpen}) => {
	const [active, setActive] = useState(false);
	const [openSidebar, setOpenSidebar] = useState(false);


	if (typeof window !== "undefined") {
		window.onscroll = () => {
			if (window.scrollY > 80) {
				setActive(true);
			} else {
				setActive(false);
			}
		};
	}

	const handleSideBarClose = (e: any) => {
		if (e.target.id === "screen") {
			setOpenSidebar(false);
		}
	};

	return (
		<div className="w-full relative">
			<div className={`${active ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-no-repeat fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffff]" : "w-full h-[80px] border-b dark:border-[#fffff1c] z-[80] dark:shadow"}`}>
				<div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
					<div className="w-full h-[80px] flex items-center justify-between p-3">
						{/* Logo */}
						<div>
							<Link to="/" className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
								E-Learning
							</Link>
						</div>

						{/*	 */}
						<div className="flex items-center 800px:gap-0 gap-2">
							<NavItems activeItem={activeItem} isMobile={false} />
							<ThemeSwitcher />

							{/* small device only  */}
							<div className="800px:hidden">
								<HiOutlineMenuAlt3 onClick={() => setOpenSidebar(true)} size={25} className="cursor-pointer dark:text-white text-black" />
							</div>

							{/* User Profile */}
							<HiUserCircle  onClick={() => setOpen(true)} size={25} className="cursor-pointer 800px:block hidden dark:text-white text-black" />
						</div>
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
							<div className="fixed bg-black blur-md opacity-[0.3] top-0 left-0 bottom-0 right-0 z-[99998]"></div>
						</div>
					)
				}
			</div>
		</div>
	);
};
export default Header;
