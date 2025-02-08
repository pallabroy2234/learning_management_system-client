import {FC, KeyboardEvent, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {VscWorkspaceTrusted} from "react-icons/vsc";
import {useActivationMutation} from "../../store/features/auth/authApi.ts";
import {useSelector} from "react-redux";
import {CustomError, RootState} from "../../types/@types.ts";
import toast from "react-hot-toast";
import {ActivationRequest} from "../../store/features/auth/authTypes.ts";
import {ThreeDots} from "react-loader-spinner";

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
	const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes countdown
	const [isExpired, setIsExpired] = useState<boolean>(false);
	const {token} = useSelector((state: RootState) => state.auth);
	const [activation, {isLoading, isSuccess, isError, error, data}] = useActivationMutation();
	const {
		register,
		handleSubmit,
		setValue,
		setFocus,
		formState: {errors}
	} = useForm<VerifyNumber>({});


	useEffect(() => {
		if (timeLeft > 0) {
			const timer = setInterval(() => {
				setTimeLeft((prev) => prev - 1);
			}, 1000);

			return () => clearInterval(timer);
		} else {
			setIsExpired(true);
			toast.error("Your token has expired. Please request a new one.");
		}
	}, [timeLeft]);

	useEffect(() => {
		if (isSuccess) {
			const message = data?.message;
			toast.success(message);
			setRoute("Login");
		}
		if (isError) {
			if ("data" in error) {
				const err = error as CustomError;
				toast.error(err?.data?.message || "Account activation failed");
				setInvalidError(true);
			}
		}
	}, [isSuccess, isError]);

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


	const onSubmit: SubmitHandler<VerifyNumber> = async (data): Promise<void> => {
		const otp = Object.values(data).join("");
		try {
			await activation({
				activation_token: token,
				activation_code: otp
			} as ActivationRequest).unwrap();
		} catch (e: any) {
			console.log(e.message);
		}
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
					{/*<button*/}
					{/*	type="submit"*/}
					{/*	className="w-full flex justify-center items-center py-2 text-[13px] 500px:text-[16px] font-Poppins rounded transition-all duration-300 ease-in-out bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 shadow-md"*/}
					{/*>*/}
					{/*	{isLoading ? <ThreeDots height="20" width="40" radius="9" color="#fff" /> : "Verify OTP"}*/}
					{/*</button>*/}
					<button
						type="submit"
						disabled={isExpired || isLoading}
						className={`w-full flex justify-center items-center py-2 text-[13px] 500px:text-[16px] font-Poppins rounded transition-all duration-300 ease-in-out 
                  ${isExpired ? "bg-blue-300 border-blue-400 text-blue-100 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white shadow-md"}
                  `}
					>
						{isLoading ? <ThreeDots height="20" width="40" radius="9" color="#fff" /> : "Verify OTP"}
					</button>
				</div>

				<h5 className="text-center text-[14px] font-Poppins text-black dark:text-white mt-2">
					{isExpired ? (
						<div className="flex flex-col ">
							<span className="text-red-500">Your token has expired. Request a new one. </span>
							<span>Go back to <span className="text-blue-500 cursor-pointer" onClick={() => setRoute("Sign-up")}>Sign Up</span></span>
						</div>
					) : (
						<span className={timeLeft <= 30 ? "text-red-500" : "text-blue-500"}>
            Token expires in {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </span>
					)}
				</h5>
			</form>
			<h5 className="text-center pt-4 font-Poppins text[14px] text-black dark:text-white">
				Go back to sign in?
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









