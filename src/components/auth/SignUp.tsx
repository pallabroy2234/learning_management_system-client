import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";


type Props = {
	setRoute: (route: string) => void;
}


const schema = Yup.object().shape({
	name: Yup.string().required("Please enter your name").min(3, "Name must be at least 3 characters"),
	email: Yup.string().required("Please enter your email").email("Invalid email"),
	password: Yup.string().required("Please enter your password").min(6, "Password must be at least 6 characters")
});


const SignUp: FC<Props> = ({setRoute}) => {
	const [show, setShow] = useState(false);
	const {handleSubmit, register, formState: {errors, isValid}} = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: ""
		},
		resolver: yupResolver(schema),
		mode: "all"

	});

	// Form handle submit
	const onSubmit = (data: any) => {
		setRoute("Verification");
		console.log(data);
	};


	return (
		<div className="w-full ">
			<h1 className="text-[17px] 500px:text-[20px]  text-black dark:text-white font-[500] font-Poppins text-center py-2">
				Join with E-Learning
			</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-3">
				<div className="flex flex-col gap-3">
					<label htmlFor="name" className="text-[14px] 500px:text-[16px] font-Poppins text-black dark:text-white">Enter your Name</label>
					<input {...register("name")} type="text" id="name" placeholder="John Doe" className={`${errors?.name ? "border-red-500" : "dark:border-blue-500 border-black"} w-full rounded text-[14px] 500px:text-base text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none font-Poppins `} />
					{errors?.name &&
						<span className="text-red-500 text-[13px] 500px:text-[14px] font-Poppins">{errors?.name?.message}</span>}
				</div>

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
							className={`w-full py-2 text-[13px] 500px:text-[16px] font-Poppins font-semibold rounded  transition-all duration-300 ease-in-out ${
								isValid
									? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 shadow-md"
									: "bg-blue-300 border-blue-400 text-blue-100 cursor-not-allowed"
							}`}
					>
						Sign Up
					</button>
				</div>

				<h5 className="text-center mt-4 text-[14px] text-black dark:text-white">Or join with</h5>
				<div className="flex items-center justify-center mt-3 gap-3">
					<FcGoogle size={30} className="cursor-pointer" />
					<AiFillGithub size={30} className="cursor-pointe" />
				</div>
				<h5 onClick={() => setRoute("Login")} className="text-center pt-4 font-Poppins text-[14px]">Already have an account?<span className="text-[#2190ff] pl-2 cursor-pointer">Log In</span>
				</h5>
			</form>
			<br />
		</div>
	);
};
export default SignUp;
