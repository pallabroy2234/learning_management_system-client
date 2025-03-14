import {FieldValues, useFormContext} from "react-hook-form";
import {FC, ReactNode, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {FiAlertTriangle, FiChevronDown, FiClock, FiDollarSign, FiFilm, FiList, FiTag, FiLink} from "react-icons/fi";
import VideoPlayer from "./VideoPlayer.tsx";

const CoursePreview = () => {
	const {getValues} = useFormContext();
	const contentData: FieldValues = getValues();
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const discountPercentage = ((contentData?.estimatedPrice - contentData?.price) / contentData?.estimatedPrice) * 100;
	const discount = discountPercentage.toFixed(0);

	const Section: FC<{title: string; icon: ReactNode; children: ReactNode}> = ({title, icon, children}) => {
		return (
			<motion.div className='mb-8'>
				<div className='flex items-center mb-4'>
					<span className='mr-2 text-purple-500 dark:text-purple-400'>{icon}</span>
					<h3 className='text-base 500px:text-xl font-semibold dark:text-gray-200'>{title}</h3>
				</div>
				<AnimatePresence>{children}</AnimatePresence>
			</motion.div>
		);
	};

	const accordionAnimation = {
		open: {
			opacity: 1,
			height: "auto",
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
		closed: {
			opacity: 0,
			height: 0,
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
	};

	return (
		<div className="1200px:w-[65%]  1000px:w-[90%]  w-[100%] mx-auto">
			<motion.div
				initial={{opacity: 0, y: -15}}
				animate={{opacity: 1, y: 0}}
				exit={{opacity: 0, x: -20}}
				className='   rounded-lg'>
				{/* Header Section */}
				<div className='mb-8 text-center dark:bg-slate-700 bg-gray-100  py-2 rounded px-2'>
					<h1 className='600px:text-2xl  font-bold  dark:text-white mb-2'>{contentData?.name}</h1>
					<div className='flex 600px:flex-row flex-col  items-center justify-center 600px:gap-4 gap-0 text-gray-600 dark:text-gray-400 text-ellipsis mt-3 '>
					<span className='flex items-center 600px:text-base text-[12px]'>
						<FiTag className='mr-1' /> {contentData?.level} Level
					</span>
						<span>•</span>
						<span className='flex items-center 600px:text-base text-[12px]'>
						<FiClock className='mr-1' />
							{contentData?.courseData?.reduce((acc: number, curr: any) => acc + curr.videoLength, 0)} mins
					</span>
					</div>
				</div>

				{/* Video Preview */}
				<Section title='Course Preview' icon={<FiFilm />} >
					<div className='rounded-xl  overflow-hidden shadow'>
						<VideoPlayer videoUrl={contentData?.demoUrl || ""} title={contentData?.name || ""} />
					</div>
				</Section>

				{/* Pricing Section */}
				<Section title='Pricing' icon={<FiDollarSign />}>
					<div className='bg-gray-100 dark:bg-slate-700 p-6 rounded-lg'>
						<div className='flex 400px:flex-row flex-col 400px:items-center  400px:gap-0 gap-4 justify-between mb-4'>
							<div>
								<span className='text-2xl font-bold dark:text-white'>{contentData?.price === 0 ? "Free" : `${contentData?.price}`}</span>
								{contentData?.estimatedPrice > 0 && (
									<span className='ml-3 text-gray-500 dark:text-gray-400 line-through'>${contentData?.estimatedPrice}</span>
								)}
							</div>
							{contentData?.estimatedPrice > 0 && (
								<span className='bg-green-100 text-center dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm'>
								{discount}% OFF{" "}
							</span>
							)}
						</div>
						<button className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-[14px] 500px:text-base transition-colors'>Purchase Now</button>
					</div>
				</Section>

				{/* Benefits and Prerequisites */}
				<div className='grid md:grid-cols-2 md:gap-8 gap-6 mb-8'>
					{/* What You'll Learn Section */}
					<div className='bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-sm'>
						<div className='flex items-center mb-4'>
							<FiAlertTriangle className='w-5 h-5 mr-2 text-green-500 shrink-0' />
							<h4 className='600px:text-lg text-base font-semibold dark:text-white'>What You'll Learn</h4>
						</div>

						<ul className='space-y-3'>
							{contentData?.benefits?.map((benefit: any, index: number) => (
								<li key={index} className='flex items-start text-gray-700 dark:text-gray-300'>
									<span className='w-2 h-2 mt-2 bg-green-500 rounded-full shrink-0 mr-3' />
									<p className='text-sm leading-relaxed'>{benefit?.title}</p>
								</li>
							))}
							{(!contentData?.benefits?.length || contentData?.benefits.every((b: any) => !b.title)) && (
								<li className='text-gray-500 dark:text-gray-400 text-sm'>No benefits listed</li>
							)}
						</ul>
					</div>

					{/* Divider for mobile */}
					<div className='md:hidden w-full h-px bg-gray-200 dark:bg-gray-600 my-2' />

					{/* Requirements Section */}
					<div className='bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-sm'>
						<div className='flex items-center mb-4'>
							<FiAlertTriangle className='w-5 h-5 mr-2 text-red-500 shrink-0' />
							<h4 className='600px:text-lg text-base font-semibold dark:text-white'>Requirements</h4>
						</div>

						<ul className='space-y-3'>
							{contentData?.prerequisites?.map((preReq: any, index: number) => (
								<li key={index} className='flex items-start text-gray-700 dark:text-gray-300'>
									<span className='w-2 h-2 mt-2 bg-red-500 rounded-full shrink-0 mr-3' />
									<p className='text-sm leading-relaxed'>{preReq?.title}</p>
								</li>
							))}
							{(!contentData.prerequisites?.length || contentData.prerequisites.every((p: any) => !p.title)) && (
								<li className='text-gray-500 dark:text-gray-400 text-sm'>No prerequisites required</li>
							)}
						</ul>
					</div>
				</div>

				{/* Course Curriculum */}
				<div className="">
					<div className='flex items-center mb-4'>
					<span className='mr-2 text-purple-500 dark:text-purple-400'>
						<FiList />
					</span>
						<h3 className='500px:text-xl text-base font-semibold dark:text-gray-200'>Course Content</h3>
					</div>
					<motion.div className='border rounded-lg dark:border-gray-700 max-h-[600px] overflow-y-auto course-content'>
						{contentData?.courseData?.map((section: any, index: number) => (
							<div key={index} className='border-b dark:border-gray-900 last:border-b-0'>
								<button
									onClick={() => setActiveIndex(activeIndex === index ? null : index)}
									type='button'
									className='p-4 bg-gray-50 w-full dark:bg-gray-800 sticky top-0 flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
								<span className='font-medium dark:text-white text-left text-ellipsis overflow-hidden whitespace-nowrap'>
									Lesson {index + 1} : {section.videoSection}
								</span>
									<motion.div animate={{rotate: activeIndex === index ? 180 : 0}} transition={{duration: 0.2}}>
										<FiChevronDown className='text-gray-600 dark:text-gray-300' />
									</motion.div>
								</button>
								<motion.div initial="closed" animate={activeIndex === index ? "open" : "closed"} variants={accordionAnimation} className='overflow-hidden'>
									<div className='p-4 space-y-6 bg-white  overflow-hidden dark:bg-gray-900'>
										{/* Section Content */}
										{section.title && (
											<div className='space-y-1'>
												<span className='text-sm font-semibold text-gray-500 dark:text-gray-400'>Title</span>
												<p className='text-gray-700 dark:text-gray-200'>{section.title}</p>
											</div>
										)}

										{section.videoDescription && (
											<div className='space-y-1'>
												<span className='text-sm font-semibold text-gray-500 dark:text-gray-400'>Description</span>
												<p className='text-gray-700 dark:text-gray-200 whitespace-pre-line'>{section.videoDescription}</p>
											</div>
										)}

										{section.suggestion && (
											<div className='space-y-1'>
												<span className='text-sm font-semibold text-gray-500 dark:text-gray-400'>Suggestion</span>
												<p className='text-gray-700 dark:text-gray-200'>{section.suggestion}</p>
											</div>
										)}

										{section.links?.length > 0 && (
											<div className='space-y-2'>
												<span className='text-sm font-semibold text-gray-500 dark:text-gray-400'>Resources</span>
												<div className='space-y-2'>
													{section.links.map((link: any, idx: number) => (
														<div
															key={idx}
															className='flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'>
															<FiLink className='flex-shrink-0 text-gray-500 dark:text-gray-400' />
															<div className='flex-1 min-w-0'>
																<p className='text-gray-700 dark:text-gray-300 truncate'>{link.title}</p>
																{link.url && (
																	<p className='text-sm text-gray-500 dark:text-gray-400 truncate'>{link.url}</p>
																)}
															</div>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								</motion.div>
							</div>
						))}

						{!contentData.courseData?.length && (
							<div className='p-6 text-center text-gray-500 dark:text-gray-400'>No course content available</div>
						)}
					</motion.div>
				</div>


			</motion.div>
			{/*<div className="flex justify-between mt-8">*/}
			{/*	<button*/}

			{/*		className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"*/}
			{/*	>*/}
			{/*		Back to Edit*/}
			{/*	</button>*/}
			{/*	<button*/}

			{/*		className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"*/}
			{/*	>*/}
			{/*		Submit Course*/}
			{/*	</button>*/}
			{/*</div>*/}
		</div>
	);
};

export default CoursePreview;

// const formateVidoeDuration = (seconds?:number) => {
// 	if(!seconds) return "0:00";
// 	const hours = Math.floor(seconds / 3600);
// 	const minutes = Math.floor((seconds % 3600) / 60);
// 	const remainingSeconds = seconds % 60;
//
//
// 	return [
// 		hours > 0 ? String(hours).padStart(2, "0") : null,
// 		String(minutes).padStart(2, "0"),
// 		String(remainingSeconds).padStart(2, "0")
// 	].filter(Boolean).join(":");
//
// }
// import { FC, useState } from "react";
// import { motion } from "framer-motion";
// import { FiDollarSign, FiTag, FiBook, FiList, FiFilm, FiClock, FiAlertTriangle, FiChevronDown } from "react-icons/fi";
// import VideoPlayer from "./VideoPlayer.tsx";
// import { FieldValues, useFormContext } from "react-hook-form";
//
// interface Props {
// 	setStep: (index: number) => void;
// 	onSubmit: () => void;
// }
//
// const CoursePreview: FC<Props> = ({ setStep, onSubmit }) => {
// 	const { getValues } = useFormContext();
// 	const contentData: FieldValues = getValues();
// 	const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
//
// 	const discountPercentage = ((contentData?.estimatedPrice - contentData?.price) / contentData?.estimatedPrice) * 100;
// 	const discount = discountPercentage.toFixed(0);
//
// 	const toggleSection = (index: number) => {
// 		const newExpanded = new Set(expandedSections);
// 		newExpanded.has(index) ? newExpanded.delete(index) : newExpanded.add(index);
// 		setExpandedSections(newExpanded);
// 	};
//
// 	const Section: FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
// 		<div className="mb-8">
// 			<div className="flex items-center mb-4">
// 				<span className="mr-2 text-purple-500 dark:text-purple-400">{icon}</span>
// 				<h3 className="text-xl font-semibold dark:text-gray-200">{title}</h3>
// 			</div>
// 			{children}
// 		</div>
// 	);
//
// 	const formatVideoDuration = (seconds?: number) => {
// 		if (!seconds) return '0:00';
// 		const hours = Math.floor(seconds / 3600);
// 		const minutes = Math.floor((seconds % 3600) / 60);
// 		const remainingSeconds = seconds % 60;
//
// 		return [
// 			hours > 0 ? String(hours).padStart(2, '0') : null,
// 			String(minutes).padStart(2, '0'),
// 			String(remainingSeconds).padStart(2, '0')
// 		].filter(Boolean).join(':');
// 	};
//
//
// 	return (
// 		<motion.div
// 			initial={{ opacity: 0, y: -15 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			exit={{ opacity: 0, x: -20 }}
// 			className="max-w-4xl mx-auto p-6 dark:bg-gray-900 rounded-lg"
// 		>
// 			{/* Header Section */}
// 			<div className="mb-8 text-center">
// 				<h1 className="text-3xl font-bold dark:text-white mb-2">{contentData.name}</h1>
// 				<div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
//           <span className="flex items-center">
//             <FiTag className="mr-1" /> {contentData.level} Level
//           </span>
// 					<span>•</span>
// 					<span className="flex items-center">
//             <FiClock className="mr-1" />
// 						{contentData.courseData?.reduce((acc: number, curr: any) =>
// 							acc + (curr.links?.reduce((acc: number, curr: any) => acc + (curr.videoLength || 0), 0) || 0), 0 )}
//           </span>
// 				</div>
// 			</div>
//
// 			{/* Video Preview */}
// 			<Section title="Course Preview" icon={<FiFilm />}>
// 				<div className="rounded-xl overflow-hidden shadow-lg">
// 					<VideoPlayer videoUrl={contentData.demoUrl || ""} title={contentData.name} />
// 				</div>
// 			</Section>
//
// 			{/* Pricing Section */}
// 			<Section title="Pricing" icon={<FiDollarSign />}>
// 				<div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
// 					<div className="flex items-center justify-between mb-4">
// 						<div>
//               <span className="text-2xl font-bold dark:text-white">
//                 {contentData.price === 0 ? "Free" : `$${contentData.price}`}
//               </span>
// 							{contentData.estimatedPrice > 0 && (
// 								<span className="ml-3 text-gray-500 dark:text-gray-400 line-through">
//                   ${contentData.estimatedPrice}
//                 </span>
// 							)}
// 						</div>
// 						{contentData.estimatedPrice > 0 && (
// 							<span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
//                 {discount}% OFF
//               </span>
// 						)}
// 					</div>
// 					<button
// 						className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors"
// 						onClick={onSubmit}
// 					>
// 						Purchase Now
// 					</button>
// 				</div>
// 			</Section>
//
// 			{/* Course Details */}
// 			<Section title="Description" icon={<FiBook />}>
// 				<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
// 					{contentData.description || "No description provided"}
// 				</p>
// 			</Section>
//
// 			{/* Benefits & Prerequisites */}
// 			<div className="grid md:grid-cols-2 gap-6 mb-8">
// 				<div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
// 					<h4 className="flex items-center text-lg font-semibold mb-4 dark:text-white">
// 						<FiAlertTriangle className="mr-2 text-green-500" />
// 						What You'll Learn
// 					</h4>
// 					<ul className="space-y-2">
// 						{contentData.benefits?.map((benefit: any, index: number) => (
// 							<li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
// 								<span className="w-2 h-2 bg-green-500 rounded-full mr-2" />
// 								{benefit.title}
// 							</li>
// 						))}
// 						{(!contentData.benefits?.length || contentData.benefits.every((b: any) => !b.title)) && (
// 							<li className="text-gray-500 dark:text-gray-400">No benefits listed</li>
// 						)}
// 					</ul>
// 				</div>
//
// 				<div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
// 					<h4 className="flex items-center text-lg font-semibold mb-4 dark:text-white">
// 						<FiAlertTriangle className="mr-2 text-red-500" />
// 						Requirements
// 					</h4>
// 					<ul className="space-y-2">
// 						{contentData.prerequisites?.map((prereq: any, index: number) => (
// 							<li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
// 								<span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
// 								{prereq.title}
// 							</li>
// 						))}
// 						{(!contentData.prerequisites?.length || contentData.prerequisites.every((p: any) => !p.title)) && (
// 							<li className="text-gray-500 dark:text-gray-400">No prerequisites required</li>
// 						)}
// 					</ul>
// 				</div>
// 			</div>
//
// 			{/* Course Curriculum */}
// 			<Section title="Course Content" icon={<FiList />}>
// 				<div className="border rounded-lg dark:border-gray-700 max-h-[600px] overflow-y-auto">
// 					{contentData.courseData?.map((section: any, index: number) => (
// 						<div key={index} className="border-b dark:border-gray-700 last:border-b-0">
// 							<div
// 								className="p-4 bg-gray-50 dark:bg-gray-800 sticky top-0 flex items-center justify-between cursor-pointer"
// 								onClick={() => toggleSection(index)}
// 							>
// 								<h4 className="font-medium dark:text-white">
// 									Section {index + 1}: {section.videoSection}
// 								</h4>
// 								<FiChevronDown
// 									className={`transform transition-transform ${
// 										expandedSections.has(index) ? 'rotate-180' : ''
// 									} text-gray-600 dark:text-gray-300`}
// 								/>
// 							</div>
//
// 							{expandedSections.has(index) && (
// 								<div className="p-4 space-y-4">
// 									{section.links?.map((link: any, idx: number) => (
// 										<div
// 											key={idx}
// 											className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
// 										>
// 											<div className="flex items-center gap-3">
//                         <span className="text-gray-500 dark:text-gray-300 text-sm">
//                           {idx + 1}.
//                         </span>
// 												<span className="text-gray-700 dark:text-gray-200">
//                           {link.title}
//                         </span>
// 											</div>
// 											<span className="text-gray-500 dark:text-gray-400 text-sm">
//                         {formatVideoDuration(link.videoLength)}
//                       </span>
// 										</div>
// 									))}
//
// 									{!section.links?.length && (
// 										<div className="text-center py-4 text-gray-500 dark:text-gray-400">
// 											No lessons in this section
// 										</div>
// 									)}
// 								</div>
// 							)}
// 						</div>
// 					))}
//
// 					{!contentData.courseData?.length && (
// 						<div className="p-6 text-center text-gray-500 dark:text-gray-400">
// 							No course content available
// 						</div>
// 					)}
// 				</div>
// 			</Section>
//
// 			{/* Form Navigation */}
// 			<div className="flex justify-between mt-8">
// 				<button
// 					onClick={() => setStep(1)}
// 					className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
// 				>
// 					Back to Edit
// 				</button>
// 				<button
// 					onClick={onSubmit}
// 					className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
// 				>
// 					Submit Course
// 				</button>
// 			</div>
// 		</motion.div>
// 	);
// };
//
// export default CoursePreview;