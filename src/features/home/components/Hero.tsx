import {BiSearch} from "react-icons/bi";
import {Link} from "react-router-dom";

const Hero = () => {
	return (
		<div className="w-[95%] 800px:w-[92%] m-auto  h-full 800px:mt-[80px] 800px:pb-[50px] 320px:pb-[300px]   lg:pt-0 pt-[90px]">
			<div className="grid grid-cols-1 1000px:grid-cols-2 h-screen 1000px:gap-2">
				<div className="relative flex 1000px:items-center 1000px:justify-start justify-center items-center">
					<div className="relative flex justify-center items-center 1500px:w-[600px] 1500px:h-[600px] 1200px:w-[500px] 1200px:h-[500px] 1000px:h-[400px] 1000px:w-[400px] 700px:w-[500px] 700px:h-[500px] 500px:w-[400px] 500px:h-[400px] w-[300px] h-[300px]  before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-blue-500 before:to-transparent before:animate-opacityChange">
						<img src="../../../../public/hero.png" alt="" className="1500px:max-w-[70%] 1200px:max-w-[60%] 1000px:max-w-[60%] max-w-[60%] object-contain relative z-10" />
					</div>
				</div>


				<div className="flex flex-col items-start justify-center">
					<h2 className="dark:text-white text-[#0000007c] text-[30px] w-full 1500px:text-[70px] 1200px:text-[50px] 1000px:text-[40px] font-[600] font-Josefin py-2 1200px:leading-[75px] 1000px:leading-[50px]">
						Improve Your Online Learning Experience Better Instantly
					</h2>

					<br />

					<p className="dark:text-[#edfff4] text-[#0000007c] font-Josefin font-[600] text-[18px] ">
						We have 40k+ Online courses & 500K+ registered student. Find your desired Courses from them.
					</p>

					<br />
					<br />
					{/* Search Input */}
					<div className="bg-transparent relative flex 1500px:w-[80%] 1000px:w-[100%] 700px:w-[70%]  w-[100%] h-[50px]">
						<input type="search" placeholder="Search Courses..." className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin" />
						<div className="absolute flex items-center justify-center h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] w-[50px] cursor-pointer">
							<BiSearch size={30} className="text-white" />
						</div>
					</div>

					<br />
					<br />

					<div className="sm:flex sm:items-center sm:justify-center sm:gap-4 gap-9">
						<div className="flex items-center">
							<img src="../../../../public/1.jpg" alt="user1" className="rounded-full w-[50px] h-[50px] object-cover ring-[3px]  dark:ring-white ring-[#39c1f3] z-[1]" />
							<img src="../../../../public/4.jpeg" alt="user2" className="rounded-full w-[50px] h-[50px] object-cover ring-[3px]  dark:ring-white ring-[#39c1f3] -ml-3 z-[2]" />
							<img src="../../../../public/3.jpg" alt="user3" className="rounded-full w-[50px] h-[50px] object-cover ring-[3px]  dark:ring-white ring-[#39c1f3] -ml-3 z-[3]" />
						</div>
						<div className="mt-5 sm:mt-0">
							<p className="font-Josefin dark:text-[#edfff4] text-[#000000b3]  text-[18px] font-[600]">
								500k+ People already trusted us. <Link to="/course" className="dark:text-[#46e256] text-[crimson]">View Courses</Link>
							</p>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};
export default Hero;
