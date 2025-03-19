import {motion} from "framer-motion";
import {BiSearch} from "react-icons/bi";
import {Link} from "react-router-dom";

const Hero = () => {
	const containerVariants = {
		hidden: {opacity: 0},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.8,
				staggerChildren: 0.3,
				delayChildren: 0.4,
			},
		},
	};

	const itemVariants = {
		hidden: {opacity: 0, y: 30},
		visible: {
			opacity: 1,
			y: 0,
			transition: {type: "spring", stiffness: 120, damping: 15},
		},
	};

	const avatarItem = (index: number) => ({
		hidden: {scale: 0, opacity: 0},
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 260,
				damping: 20,
				delay: index * 0.2,
			},
		},
	});

	const imageVariants = {
		hidden: {scale: 0.9, opacity: 0},
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				mass: 0.5,
			},
		},
	};

	const counterVariants = {
		hidden: { scale: 0, opacity: 0 },
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 260,
				damping: 20,
				delay: 0.8
			}
		}
	};

	// mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900'>
			<div className='w-[92%] mx-auto 500px:py-[180px] py-[150px]'>
				<div className='flex 1100px:flex-row flex-col justify-center items-center 1100px:gap-0 gap-[120px]'>
					{/* Image Section	 */}
					<motion.div variants={containerVariants} initial='hidden' animate='visible' className='relative  1500px:flex-1 1500px:pl-0 1100px:pl-[3%]'>
						<motion.div variants={imageVariants} initial='hidden' animate='visible' className='relative mx-auto 650px:h-[400px] 650px:w-[400px]  500px:w-[300px] 500px:h-[300px] 400px:w-[250px] 400px:h-[250px] 350px:w-[200px] 350px:h-[200px] w-[180px] h-[180px]'>
							{/*	Rotating Gradient Background */}
							<motion.div
								animate={{rotate: 360, scale: [1, 1, 0.5, 1]}}
								transition={{
									duration: 20,
									repeat: Infinity,
									ease: "linear",
								}}
								className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-900/30 dark:to-purple-900/30 '
							/>

							{/*	Main Image Container */}
							<motion.div
								whileHover={{scale: 1.02}}
								transition={{
									type: "spring",
									stiffness: 300,
								}}
								className='absolute inset-0 overflow-hidden rounded-full border-8 border-white/50 shadow-2xl dark:border-gray-600/50'>
								<img src='/hero.png' alt='Learning' className='h-full w-full object-cover' />
							</motion.div>

							{/*	Floating Particles */}

							{[...Array(8)].map((_, index) => (
								<motion.div
									animate={{
										x: [0, 40, 0],
										scale: [1, 1.5, 1],
										opacity: [0.8, 1, 0.8],
									}}
									transition={{
										duration: 3 + Math.random() * 4,
										repeat: Infinity,
										delay: Math.random() * 3,
									}}
									style={{
										top: `${Math.random() * 100}%`,
										left: `${Math.random() * 100}%`,
									}}
									key={index}
									className='absolute h-3 w-3 rounded-full bg-blue-400/50 dark:bg-blue-400/50'
								/>
							))}

							{/* Rotation Border	 */}
							<motion.div
								animate={{rotate: 360}}
								transition={{
									duration: 20,
									repeat: Infinity,
									ease: "linear",
								}}
								className='absolute -inset-8 rounded-full border-8  border-t-blue-300 border-r-purple-300  border-transparent dark:border-t-blue-500 dark:border-r-purple-500'
							/>
						</motion.div>
					</motion.div>

					{/* Content Section	 */}
					<motion.div variants={containerVariants} initial='hidden' animate='visible' className='900px:space-y-8 space-y-4  flex-1 1500px:pl-0 1100px:pl-[10%]'>
						<motion.h1
							variants={itemVariants}
							className='font-bold leading-tight text-gray-900 dark:text-white   900px:text-7xl 600px:text-6xl 500px:text-5xl 400px:text-4xl text-3xl'>
							<motion.div
								initial={{opacity: 0, x: -20}}
								animate={{
									opacity: 1,
									x: 0,
								}}
								className='block bg-gradient-to-r from-blue-600 py-5 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-300'>
								Master Skills Through Interactive Learning
							</motion.div>
							<motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} className='block'>

							</motion.div>
						</motion.h1>

						<motion.p variants={itemVariants} className='500px:text-lg text-gray-600 dark:text-gray-300 text-base'>
							Join 500,000+ professionals in our immersive learning community. Transform your career with expert-led courses.
						</motion.p>

						{/* Search Input */}
						<motion.div variants={itemVariants}>
							<motion.div
								className="group relative  max-w-2xl rounded-xl bg-white shadow-lg dark:bg-gray-800 800px:my-0 my-10"
							>
								<div className="flex items-center px-6 py-3">
									<BiSearch className="h-6 w-6 text-gray-400 transition-colors group-hover:text-blue-500 dark:text-gray-500" />
									<input
										type="text"
										placeholder="Search courses, topics, or instructors..."
										className="ml-4 h-12 w-full bg-transparent text-gray-900 placeholder-gray-400 outline-none dark:text-white dark:placeholder-gray-500"
									/>
									<motion.button
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
										className="ml-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-medium text-white shadow-lg transition-transform dark:from-blue-500 dark:to-purple-500"
									>
										Search
									</motion.button>
								</div>
							</motion.div>
						</motion.div>


						<motion.div
							variants={itemVariants}
							className="flex 500px:flex-row flex-col 500px:items-center gap-6"
						>
							<div className="flex -space-x-4">
								{[1, 2, 3].map((item, index) => (
									<motion.img
										key={item}
										variants={avatarItem(index)}
										initial="hidden"
										animate="visible"
										src={`/${item}.jpg`}
										alt="User"
										className="h-14 w-14  rounded-full  object-cover border-2 border-white dark:border-gray-300"
										whileHover={{ scale: 1.1, zIndex: 10 }}
										transition={{ type: 'spring', stiffness: 300 }}
									/>
								))}
								<motion.div variants={counterVariants}  animate={{
									scale: [1, 1.05, 1],
									rotate: [0, 5, -5, 0]
								}}  transition={{duration: 4, repeat:Infinity}} className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-blue-100 font-medium text-blue-600 dark:border-gray-800 dark:bg-blue-900 dark:text-blue-200">
									500K+
								</motion.div>
							</div>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Join our global community.{' '}
								<Link
									to="/courses"
									className="font-medium text-blue-600 underline transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
								>
									Start learning →
								</Link>
							</p>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};
export default Hero;

// import {BiSearch} from "react-icons/bi";
// import {Link} from "react-router-dom";
//
// const Hero = () => {
// 	return (
// 		<div className="w-[95%] 800px:w-[92%] m-auto  h-full 800px:mt-[80px] 800px:pb-[50px] 320px:pb-[300px]   lg:pt-0 pt-[90px]">
// 			<div className="grid grid-cols-1 1000px:grid-cols-2 h-screen 1000px:gap-2">
// 				<div className="relative flex 1000px:items-center 1000px:justify-start justify-center items-center">
// 					<div className="relative flex justify-center items-center 1500px:w-[600px] 1500px:h-[600px] 1200px:w-[500px] 1200px:h-[500px] 1000px:h-[400px] 1000px:w-[400px] 700px:w-[500px] 700px:h-[500px] 500px:w-[400px] 500px:h-[400px] w-[300px] h-[300px]  before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-blue-500 before:to-transparent before:animate-opacityChange">
// 						<img src="../../../../../public/hero.png" alt="" className="1500px:max-w-[70%] 1200px:max-w-[60%] 1000px:max-w-[60%] max-w-[60%] object-contain relative z-10" />
// 					</div>
// 				</div>
//
//
// 				<div className="flex flex-col items-start justify-center">
// 					<h2 className="dark:text-white text-[#0000007c] text-[30px] w-full 1500px:text-[70px] 1200px:text-[50px] 1000px:text-[40px] font-[600] font-Josefin py-2 1200px:leading-[75px] 1000px:leading-[50px]">
// 						Improve Your Online Learning Experience Better Instantly
// 					</h2>
//
// 					<br />
//
// 					<p className="dark:text-[#edfff4] text-[#0000007c] font-Josefin font-[600] text-[18px] ">
// 						We have 40k+ Online courses & 500K+ registered student. Find your desired Courses from them.
// 					</p>
//
// 					<br />
// 					<br />
// 					{/* Search Input */}
// 					<div className="bg-transparent relative flex 1500px:w-[80%] 1000px:w-[100%] 700px:w-[70%]  w-[100%] h-[50px]">
// 						<input type="search" placeholder="Search Courses..." className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin" />
// 						<div className="absolute flex items-center justify-center h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] w-[50px] cursor-pointer">
// 							<BiSearch size={30} className="text-white" />
// 						</div>
// 					</div>
//
// 					<br />
// 					<br />
//
// 					<div className="sm:flex sm:items-center sm:justify-center sm:gap-4 gap-9">
// 						<div className="flex items-center">
// 							<img src="../../../../../public/1.jpg" alt="user1" className="rounded-full w-[50px] h-[50px] object-cover ring-[3px]  dark:ring-white ring-[#39c1f3] z-[1]" />
// 							<img src="../../../../../public/4.jpeg" alt="user2" className="rounded-full w-[50px] h-[50px] object-cover ring-[3px]  dark:ring-white ring-[#39c1f3] -ml-3 z-[2]" />
// 							<img src="../../../../../public/3.jpg" alt="user3" className="rounded-full w-[50px] h-[50px] object-cover ring-[3px]  dark:ring-white ring-[#39c1f3] -ml-3 z-[3]" />
// 						</div>
// 						<div className="mt-5 sm:mt-0">
// 							<p className="font-Josefin dark:text-[#edfff4] text-[#000000b3]  text-[18px] font-[600]">
// 								500k+ People already trusted us. <Link to="/course" className="dark:text-[#46e256] text-[crimson]">View Courses</Link>
// 							</p>
// 						</div>
// 					</div>
//
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
// export default Hero;
