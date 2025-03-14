import {FC} from "react";
import {useFieldArray} from "react-hook-form";
import {AnimatePresence, motion} from "framer-motion";
import {CiLink} from "react-icons/ci";
import {FiTrash} from "react-icons/fi";
import {CgMathPlus} from "react-icons/cg";

interface ILinkContent {
	index: number;
	control: any;
	register: any;
	err: any;
}

const CourseLinks: FC<ILinkContent> = ({index, control, err, register}) => {
	const {
		fields: linkFields,
		append: linkAppends,
		remove: linkRemove,
	} = useFieldArray({
		control: control,
		name: `courseData.${index}.links`,
		shouldUnregister: false,
	});
	// const err = errors?.courseData as ICourseContentErrors;
	const buttonAnimation = {
		whileHover: {scale: 1.1},
		whileTap: {scale: 0.95},
	};

	const errorInputAnimation = (hasError: any) => {
		return {
			initial: {x: 0},
			animate: hasError ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0},
			transition: {duration: 0.5},
		};
	};
	const errorMessageAnimation = {
		initial: {opacity: 0, x: 15},
		animate: {opacity: 1, x: 0},
		exit: {opacity: 0, x: -15},
	};



	return (
		<div className='flex flex-col gap-8'>
			<AnimatePresence>
				{linkFields.map((link, linkIndex) => (
						<motion.div
							key={link.id}
							initial={{opacity: 0, y: 15}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							exit={{opacity: 0, x: -15}}>
							<div className='flex justify-between items-center dark:bg-slate-600 bg-gray-100 px-3 py-2 rounded-md'>
								<h3 className='flex items-center gap-2 dark:text-white text-gray-900'>
								<span>
									<CiLink className='text-2xl' />
								</span>
									<span className='text-base '>Link {linkIndex + 1}</span>
								</h3>
								<motion.button
									{...buttonAnimation}
									type='button'
									className='bg-red-400 p-[10px] rounded-lg'
									onClick={() => linkRemove(linkIndex)}>
									<FiTrash className='text-white' />
								</motion.button>
							</div>
							<div className='mt-5 flex 800px:flex-row flex-col 800px:gap-6 gap-5'>
								{/* Link Title */}
								<div className='flex flex-col gap-2 w-full'>
									<label htmlFor={`courseData.${index}.links.${linkIndex}.title`} className='dark:text-slate-400 text-gray-600'>
										Video Title <span className='text-red-500'>*</span>
									</label>
									<motion.input
										{...register(`courseData.${index}.links.${linkIndex}.title`)}
										{...errorInputAnimation(err?.[index]?.links?.[linkIndex]?.title)}
										type='text'
										placeholder='Enter link title'
										className={`${err?.[index]?.links?.[linkIndex]?.title ? "border-red-500" : "dark:border-slate-500 border-gray-400"}  focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
									/>
									{err?.[index]?.links?.[linkIndex]?.title && (
										<motion.div {...errorMessageAnimation} className='text-red-500 text-sm'>
											<p>{err?.[index]?.links?.[linkIndex]?.title?.message}</p>
										</motion.div>
									)}
								</div>

								<div className='flex flex-col gap-2 w-full'>
									<label htmlFor={`courseData.${index}.links.${linkIndex}?.url`} className='dark:text-slate-400 text-gray-600'>
										URL<span className='text-red-500'>*</span>
									</label>
									<motion.input
										{...register(`courseData.${index}.links.${linkIndex}.url`)}
										{...errorInputAnimation(err?.[index]?.links?.[linkIndex]?.url)}
										type='text'
										placeholder='https://react-icons.github.io/react-icons/'
										className={`${err?.[index]?.links?.[linkIndex]?.url ? "border-red-500" : "dark:border-slate-500 border-gray-400"}  focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
									/>
									{err?.[index]?.links?.[linkIndex]?.url && (
										<motion.div {...errorMessageAnimation} className='text-red-500 text-sm'>
											<p>{err?.[index]?.links?.[linkIndex]?.url?.message}</p>
										</motion.div>
									)}
								</div>
							</div>
						</motion.div>
				))}
			</AnimatePresence>

			<div className='mt-3'>
				<motion.button
					className='flex items-center justify-center gap-3'
					type='button'
					onClick={() =>
						linkAppends({
							title: "",
							url: "",
						})
					}>
					<span>
						<CgMathPlus />
					</span>
					<span>Add Link</span>
				</motion.button>
			</div>
		</div>
	);
};

export default CourseLinks;
