import {FC} from "react";
import {useFormContext} from "react-hook-form";
import {motion} from "framer-motion";

interface InputProps {
	name: string;
	label: string;
	type?: "text" | "number" | "textarea";
	placeholder?: string;
	required?: boolean;
	rows?: number;
	disabled?: boolean;
	className?: string;
}

const Input: FC<InputProps> = ({name, label, type = "text", placeholder = "", required = false, rows = 4, className = "", ...props}) => {
	const {
		register,
		formState: {errors}
	} = useFormContext();

	const error = name.split(".").reduce((err: any, key: string) => err && err[key], errors);

	const getInputComponent = () => {
		const commonProps = {
			...register(name),
			id: name,
			placeholder,
			className: `w-full focus:outline-none px-3 py-2 dark:bg-transparent border rounded ${
				error ? "border-red-500" : "dark:border-slate-500 border-gray-400"
			} ${className}`,
			...props
		};

		switch (type) {
			case "textarea":
				return <motion.textarea rows={rows} {...commonProps} />;
			case "number":
				return (
					<motion.input
						type="number"
						onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
						{...commonProps}
					/>
				);
			default:
				return <motion.input type={type} {...commonProps} />;
		}
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<label htmlFor={name} className="dark:text-slate-400 text-gray-600">
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>

			<motion.div
				initial={{borderColor: "#9CA3AF"}}
				animate={{borderColor: error ? "#EF4444" : "#6B7280"}}
				transition={{duration: 0.2}}
			>
				{getInputComponent()}
			</motion.div>

			{error && (
				<motion.div
					initial={{opacity: 0, y: -5}}
					animate={{opacity: 1, y: 0}}
					className="text-red-500 text-sm"
				>
					{error?.message}
				</motion.div>
			)}
		</div>
	);
};

export default Input;


// import {FC} from "react";
// import {useFormContext} from "react-hook-form";
// import {motion} from "framer-motion";
//
// interface IInputProps {
// 	type: string;
// 	name: string;
// 	placeholder: string;
// 	label: string;
// 	isRequired: boolean;
// 	rows?: number;
// }
//
// const Input: FC<IInputProps> = ({type, name, label, rows, placeholder, isRequired = true}) => {
// 	const {
// 		register,
// 		formState: {errors},
// 	} = useFormContext();
//
// 	const errorInputAnimation = (hasError: boolean) => {
// 		return {
// 			initial: {x: 0},
// 			animate: hasError ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0},
// 			transition: {duration: 0.5},
// 		};
// 	};
// 	const errorMessageAnimation = {
// 		initial: {opacity: 0, x: 15},
// 		animate: {opacity: 1, x: 0},
// 		exit: {opacity: 0, x: -15},
// 	};
//
// 	const getNestedError = (errors: any, path: string) => {
// 		return path.split(".").reduce((err, key) => err?.[key], errors);
// 	};
// 	const error = getNestedError(errors, name);
//
// 	return (
//
// 			<div  className='flex flex-col gap-2 w-full'>
// 				<label htmlFor={name} className='dark:text-slate-400 text-gray-600'>
// 					{label} {isRequired && <span className='text-red-500'>*</span>}
// 				</label>
// 				{type === "text" && (
// 					<motion.input
// 						{...errorInputAnimation(!!error)}
// 						{...register(name)}
// 						type={type}
// 						id={name}
// 						className={`${error ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
// 						placeholder={placeholder}
// 					/>
// 				)}
//
// 				{type === "number" && (
// 					<motion.input
// 						{...errorInputAnimation(!!error)}
// 						{...register(name , {setValueAs: (value) => (value === "" ? undefined : Number(value))})}
// 						type={type}
// 						onKeyDown={(e) => {
// 							// 	Block e, E, +, - and . from input
// 							if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
// 								e.preventDefault();
// 							}
// 						}}
// 						id={name}
// 						className={`${error ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
// 						placeholder={placeholder}
// 					/>
// 				)}
// 				{type === "textarea" && (
// 					<motion.textarea
// 						{...errorInputAnimation(!!error)}
// 						{...register(name)}
// 						rows={rows}
// 						id={name}
// 						className={`${error ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded resize-none`}
// 						placeholder={placeholder}
// 					/>
// 				)}
// 				{error && (
// 					<motion.div {...errorMessageAnimation} className='text-red-500 text-sm'>
// 						<p>{error?.message}</p>
// 					</motion.div>
// 				)}
// 			</div>
// 	);
// };
//
// export default Input;
