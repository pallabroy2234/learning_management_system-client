import {FC} from "react";
import {Controller, FieldError, FieldErrorsImpl, Merge, useFormContext} from "react-hook-form";
import {motion} from "framer-motion";

type InputProps ={
	name: string
	label: string,
	isRequired?: boolean,
	placeholder: string,
	type: string,
	rows?: number
}

const Input :FC<InputProps>  = ({name,type, label , isRequired=true ,placeholder,rows=8 })=> {
	const {control, formState:{errors} } = useFormContext()


	const error = name.split(".").reduce((err: any, key: string) => err && err[key], errors);

	const errorInputAnimation = (hasError: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined) => {
		return {
			initial: {x: 0},
			animate: hasError ? {x: [0, -3, 3, -3, 3, 0]} : {x: 0},
			transition: {duration: 0.5},
		};
	};



	const errorTextAnimation = {
		initial: {opacity: 0, x: 15},
		animate: {opacity: 1, x: 0},
		exit: {
			opacity: 0,
			x: 15,
		},
	};

	return (
		<Controller  name={name} control={control} render={({field})=> (
			<div className='flex flex-col gap-2 w-full'>
				<label htmlFor={name} className='dark:text-slate-400 text-gray-600'>
					{label} {isRequired && <span className='text-red-500'>*</span>}
				</label>
				{
					type === "text" && (
						<motion.input
							{...field}
							{...errorInputAnimation(error)}
							type={type || "text"}
							id={name}
							className={`${error ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
							placeholder={placeholder}
						/>
					)
				}

				{
					type === "number" && (
						<motion.input
							{...field}
							value={field.value ?? ""}
							onChange={(e) => {
								const value = e.target.value === "" ? undefined : Number(e.target.value);
								field.onChange(value);
							}}
							{...errorInputAnimation(error)}
							onKeyDown={(e) => ["e", "E", "+", "-","ArrowUp", "ArrowDown"].includes(e.key) && e.preventDefault()}
							type='number'
							id={name}
							className={`${error? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded`}
							placeholder={placeholder}
						/>
					)
				}
				{
					type === "textarea" && (
						<motion.textarea
							{...errorInputAnimation(error)}
							{...field}
							id={name}
							rows={rows}
							className={`${error ? "border-red-500" : "dark:border-slate-500 border-gray-400"} focus:outline-none px-3 py-[8px] dark:bg-transparent border rounded resize-none`}
							placeholder={placeholder}
						/>
					)
				}
				{error && (
					<motion.div {...errorTextAnimation} className='text-red-500 text-base'>
						<p>{error.message}</p>
					</motion.div>
				)}
			</div>
		)} />
	)
}

export default Input