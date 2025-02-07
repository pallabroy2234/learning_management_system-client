// import {FC, useState, useRef} from "react";
// import {VscWorkspaceTrusted} from "react-icons/vsc";
//
// type Props = {
// 	setRoute: (route: string) => void;
// }
//
//
// type VerifyNumber = {
// 	"0": string;
// 	"1": string;
// 	"2": string;
// 	"3": string;
// }
//
// const Verification: FC<Props> = ({setRoute}) => {
// 	const [invalidError, setInvalidError] = useState<boolean>(false);
// 	const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
// 		"0": "",
// 		"1": "",
// 		"2": "",
// 		"3": ""
// 	});
//
//
// 	const inputRefs = [
// 		useRef<HTMLInputElement>(null),
// 		useRef<HTMLInputElement>(null),
// 		useRef<HTMLInputElement>(null),
// 		useRef<HTMLInputElement>(null)
// 	];
//
// 	const verificationHandler = async () => {
// 		console.log("Verification");
// 		setInvalidError(true)
// 	};
//
// 	const handleChange = (index: number, value: string) => {
// 		setInvalidError(false);
// 		const newVerifyNumber = {...verifyNumber, [index]: value};
// 		setVerifyNumber(newVerifyNumber);
// 		if (value === "" && index < 0) {
// 			inputRefs[index - 1].current?.focus();
// 		} else if (value.length === 1 && index < 3) {
// 			inputRefs[index + 1].current?.focus();
// 		}
// 	};
//
// 	return (
// 		<div>
// 			<h1 className="text-[17px] 500px:text-[20px]  text-black dark:text-white font-[500] font-Poppins text-center py-2">Verify Your Account</h1>
// 			<br />
// 			<div className="w-full flex items-center justify-center mt-2">
// 				<div className="w-[80px] h-[80px]  rounded-full bg-blue-500 flex items-center justify-center">
// 					<VscWorkspaceTrusted size={40} className="text-white" />
// 				</div>
// 			</div>
// 			<br />
// 			<br />
// 			<div className="m-auto flex items-center justify-around">
// 				{
// 					Object.keys(verifyNumber).map((key, index) => (
// 						<input
// 							type="number"
// 							key={key}
// 							ref={inputRefs[index]}
// 							className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${invalidError ? "animate-shake  border-red-500" : "dark:border-white border-[#0000004a]"}`}
// 							placeholder=""
// 							maxLength={1}
// 							value={verifyNumber[key as keyof VerifyNumber]}
// 							onChange={(e) => handleChange(parseInt(key), e.target.value)}
// 						/>
// 					))
// 				}
// 			</div>
// 			<br />
// 			<br />
// 			<div className="w-full flex justify-center items-center">
// 				<button onClick={verificationHandler} type="submit"
// 						className={`w-full py-2 text-[13px] 500px:text-[16px] font-Poppins  rounded  transition-all duration-300 ease-in-out bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 shadow-md}`}
// 				>
// 					Verify OTP
// 				</button>
// 			</div>
// 			<h5 className="text-center pt-4 font-Poppins text[14px] text-black dark:text-white">
// 				Go back to sign in? <span onClick={() => setRoute("Login")} className="text-blue-500 pl-1 cursor-pointer">Sign in</span>
// 			</h5>
// 		</div>
// 	);
// };
// export default Verification;


import {FC, KeyboardEvent, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {VscWorkspaceTrusted} from "react-icons/vsc";

type Props = {
	setRoute: (route: string) => void;
}
type VerifyNumber = {
	"0": string;
	"1": string;
	"2": string;
	"3": string;
}

const Verification: FC<Props> = ({setRoute}) => {
	const [invalidError, setInvalidError] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		setValue,
		setFocus,
		formState: {errors}
	} = useForm<VerifyNumber>();


	const handleInputChange = (index: number, value: string) => {
		const numericValue = value.replace(/\D/g, "");
		if (numericValue) {
			setValue(index.toString() as keyof VerifyNumber, numericValue);
			console.log(numericValue);
			if (index < 3) {
				setFocus((index + 1).toString() as keyof VerifyNumber);
			}
		}
	};

	const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace") {
			e.preventDefault();
			const currentValue = (e.target as HTMLInputElement).value;

			if (!currentValue && index > 0) {
				setValue(index.toString() as keyof VerifyNumber, "");
				setFocus((index - 1).toString() as keyof VerifyNumber);
			} else if (currentValue) {
				setValue(index.toString() as keyof VerifyNumber, "");
			}
		}
	};


	const onSubmit: SubmitHandler<VerifyNumber> = async (data) => {
		const otp = Object.values(data).join("")
		console.log(otp);
		setInvalidError(true);

	};

	return (
		<div>
			<h1 className="text-[17px] 500px:text-[20px] text-black dark:text-white font-[500] font-Poppins text-center py-2">
				Verify Your Account
			</h1>

			<br />

			<div className="w-full flex items-center justify-center mt-2">
				<div className="w-[80px] h-[80px] rounded-full bg-blue-500 flex justify-center items-center">
					<VscWorkspaceTrusted size={40} className="text-white" />
				</div>
			</div>

			<br />
			<br />

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="m-auto flex items-center justify-around">
					{[0, 1, 2, 3].map((index) => (
						<input
							key={index}
							{...register(index.toString() as keyof VerifyNumber, {
								required: true,
								pattern: /^[0-9]$/
							})}
							inputMode="numeric"
							maxLength={1}
							onChange={(e) => handleInputChange(index, e.target.value)}
							onKeyDown={(e) => handleKeyDown(index, e)}
							onInput={(e) => {
								const target = e.target as HTMLInputElement;
								target.value = target.value.replace(/\D/g, "");
							}}
							className={`w-[65px] h-[65px] bg-transparent border-[2px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${errors[index.toString() as keyof VerifyNumber] || invalidError ? "animate-shake border-red-500" : "dark:border-white border-black"}`}
						/>
					))}
				</div>
				<br />
				<br />
				<div className="w-full flex justify-center items-center">
					<button
						type="submit"
						className="w-full py-2 text-[13px] 500px:text-[16px] font-Poppins rounded transition-all duration-300 ease-in-out bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 shadow-md"
					>
						Verify OTP
					</button>
				</div>
			</form>
			<h5 className="text-center pt-4 font-Poppins text[14px] text-black dark:text-white">
				Go back to sign in?{" "}
				<span
					onClick={() => setRoute("Login")}
					className="text-blue-500 pl-1 cursor-pointer"
				>
          Sign in
        </span>
			</h5>

		</div>
	);
};
export default Verification;









