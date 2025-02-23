import {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {useLoginMutation} from "../../../store/features/auth/authApi.ts";
import toast from "react-hot-toast";
import {ILoginRequest} from "../../../store/features/auth/authTypes.ts";
import {ThreeDots} from "react-loader-spinner";
import {FcGoogle} from "react-icons/fc";
import {baseURL} from "../../../store/features/api.ts";
import {CustomError} from "../../../types/@types.ts";


type Props = {
	setRoute: (route: string) => void;
	setOpen: (open: boolean) => void;
}


const schema = Yup.object().shape({
	email: Yup.string().required("Please enter your email").email("Invalid email"),
	password: Yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters")
});


const Login: FC<Props> = ({setRoute, setOpen}) => {
	const [show, setShow] = useState(false);
	const [userLogin, {isLoading, isSuccess, isError, error, data}] = useLoginMutation();
	const {handleSubmit, register, reset, formState: {errors, isValid}} = useForm({
		defaultValues: {
			email: "",
			password: ""
		},
		resolver: yupResolver(schema),
		mode: "all"
	});

	useEffect(() => {
		if (isSuccess) {
			const message = data?.message || "Login successful";
			toast.success(message);
			setOpen(false);
			reset();
		}
		if (isError) {
			if ("data" in error) {
				const err = error as CustomError;
				toast.error(err?.data.message);
			}
		}
	}, [isError, isSuccess]);


	// Form handle submit
	const onSubmit = async (data: ILoginRequest) => {
		await userLogin({
			email: data.email,
			password: data.password
		});
	};

	const handleOAuthLogin = (provider: "google" | "github") => {
		window.location.href = `${baseURL}/user/auth/${provider}`;
	};


	return (
		<div className="w-full ">
			<h1 className="text-[17px] 500px:text-[20px]  text-black dark:text-white font-[500] font-Poppins text-center py-2">
				Login with E-Learning
			</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-3">
				<div className="flex flex-col gap-3">
					<label htmlFor="email" className="text-[14px] 500px:text-[16px] font-Poppins text-black dark:text-white">Enter your Email</label>
					<input {...register("email")} type="email" id="email" placeholder="loginemail@gmail.com" className={`${errors?.email ? "border-red-500" : "dark:border-blue-500 border-black"} w-full rounded text-[14px] 500px:text-base text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none font-Poppins `} />
					{errors?.email &&
						<span className="text-red-500 text-[13px] 500px:text-[14px] font-Poppins">{errors?.email?.message}</span>}
				</div>
				<div className="flex flex-col gap-3 relative">
					<label htmlFor="password" className="text-[14px] 500px:text-[16px] font-Poppins text-black dark:text-white">Enter your Password</label>
					<div className="relative h-full w-full">
						<input {...register("password")} type={`${show ? "text" : "password"}`} id="passwrod" placeholder="password!@%" className={`${errors?.password ? "border-red-500" : "dark:border-blue-500 border-black"} w-full rounded text-[14px] 500px:text-base text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none font-Poppins appearance-none`} />
						{show ?
							<AiOutlineEyeInvisible onClick={() => setShow(false)} size={20} className="absolute cursor-pointer bottom-3 right-3 z-1" /> :
							<AiOutlineEye onClick={() => setShow(true)} size={20} className="absolute cursor-pointer bottom-3 right-3 z-1" />}
					</div>
					{errors?.password &&
						<span className="text-red-500 text-[13px] 500px:text-[14px] font-Poppins">{errors?.password?.message}</span>}
				</div>
				<div className="w-full flex justify-center items-center">
					<button type="submit" disabled={!isValid}
							className={`w-full flex justify-center items-center py-2 text-[13px] 500px:text-[16px] font-Poppins font-semibold rounded  transition-all duration-300 ease-in-out ${
								isValid
									? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 shadow-md"
									: "bg-blue-300 border-blue-400 text-blue-100 cursor-not-allowed"
							}`}
					>
						{isLoading ? <ThreeDots height="20" width="40" radius="9" color="#fff" /> : "Log in"}
					</button>
				</div>

				<h5 className="text-center mt-4 text-[14px] text-black dark:text-white">Or join with</h5>
				<div className="flex items-center justify-center mt-3 gap-3">
					<FcGoogle onClick={() => handleOAuthLogin("google")} size={30} className="cursor-pointer" />
					<AiFillGithub onClick={() => handleOAuthLogin("github")} size={30} className="cursor-pointer" />
				</div>
				<h5 onClick={() => setRoute("Sign-up")} className="text-center pt-4 font-Poppins text-[14px]">Not have any account?<span className="text-[#2190ff] pl-2 cursor-pointer">Sign up</span>
				</h5>
			</form>
			<br />
		</div>
	);
};
export default Login;
