import {FC} from "react";
import {Link} from "react-router-dom";

export const navItems = [
	{
		name: "Home",
		url: "/"
	},
	{
		name: "Courses",
		url: "/courses"
	},
	{
		name: "About",
		url: "/about"
	},
	{
		name: "Policy",
		url: "/policy"
	},
	{
		name: "FAQ",
		url: "/faq"
	}
];


type Props = {
	activeItem: number;
	isMobile: boolean;
}


const NavItems: FC<Props> = ({activeItem, isMobile}) => {
	return (
		<div>
			<div className="hidden 800px:flex">
				{
					navItems && navItems.map((navItem, index) => (
						<Link to={navItem.url} key={index}>
                          <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>
							  {navItem.name}
						  </span>
						</Link>

					))
				}
			</div>

			{/* Small Screen NavItem	*/}
			{
				isMobile && (
					<div className="800px:hidden mt-3">
						<div className="w-full text-center py-6">
							<Link to="/" className="text-[25px] font-Poppins font-[500] text-black dark:text-white">E-Learning</Link>
						</div>

						<div className="flex flex-col gap-6">
							{
								navItems && navItems.map((navItem, index) => (
									<Link to={navItem.url} key={index} className="">
                          <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>
							  {navItem.name}
						  </span>
									</Link>

								))
							}
						</div>
					</div>
				)
			}

		</div>
	);
};
export default NavItems;
