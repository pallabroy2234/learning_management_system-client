import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {ThreeDots} from "react-loader-spinner";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {ICreatePasswordSocialAuthRequest} from "../../../store/features/user/userTypes.ts";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useCreatePasswordSocialAuthMutation} from "../../../store/features/user/userApi.ts";
import toast from "react-hot-toast";
import {CustomError} from "../../../types/@types.ts";

const createPasswordSchema = yup.object().shape({
	newPassword: yup
		.string()
		.required("New Password is required")
		.min(6, "Password must be at least 6 characters"),
	confirmPassword: yup
		.string()
		.required("Confirm Password is required")
		.oneOf([yup.ref("newPassword")], "Password does not match"),
});

const CreatePassword = () => {
	const [showPassword, setShowPassword] = useState({
		newPassword: false,
		confirmPassword: false,
	});
	const [createPassword, {isLoading, isSuccess, isError, error, data}] =
		useCreatePasswordSocialAuthMutation();

	const {
		handleSubmit,
		register,
		reset,
		formState: {errors, isValid, isDirty, isSubmitting},
	} = useForm({
		defaultValues: {
			newPassword: "",
			confirmPassword: "",
		},
		mode: "onChange",
		resolver: yupResolver(createPasswordSchema),
	});

	useEffect(() => {
		if (isSuccess) {
			const message = data?.message || "Password created successfully";
			toast.success(message);
			reset();
		}
		if (isError) {
			if ("data" in error) {
				const err = error as CustomError;
				toast.error(err?.data?.message || "An error occurred");
			}
		}
	}, [isSuccess, isError]);

	const onsubmit = async (data: ICreatePasswordSocialAuthRequest) => {
		await createPassword(data);
	};

	return (
		<div>
			<form onSubmit={handleSubmit(onsubmit)}>
				<div className='800px:w-[50%] mx-auto  pb-4 flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<label
							htmlFor='old-password'
							className='text-[14px] 500px:text-[16px] font-Poppins text-black dark:text-white'>
							New Password
						</label>
						<div className='relative w-full h-full'>
							<input
								{...register("newPassword")}
								type={`${showPassword.newPassword ? "text" : "password"}`}
								id='new-password'
								placeholder='New Passwrod'
								className={`w-full rounded text-[14px] 500px:text-base text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none font-Poppins `}
							/>
							<span
								className='absolute cursor-pointer bottom-3 right-3 z-1'
								onClick={() =>
									setShowPassword((prev) => ({
										...prev,
										newPassword: !prev.newPassword,
									}))
								}>
								{showPassword.newPassword ? (
									<AiOutlineEyeInvisible size={20} />
								) : (
									<AiOutlineEye size={20} />
								)}
							</span>
						</div>
						{errors?.newPassword && (
							<span className='text-red-500 text-[13px] font-Poppins'>
								{errors?.newPassword.message}
							</span>
						)}
					</div>

					<div className='flex flex-col gap-2'>
						<label
							htmlFor='confirm-password'
							className='text-[14px] 500px:text-[16px] font-Poppins text-black dark:text-white'>
							Confirm Password
						</label>
						<div className='relative h-full w-full'>
							<input
								{...register("confirmPassword")}
								type={`${showPassword.confirmPassword ? "text" : "password"}`}
								id='confirm-password'
								placeholder='Confrim Password'
								className={`w-full rounded text-[14px]  500px:text-base text-black dark:text-white bg-transparent border h-[40px] px-2 outline-none font-Poppins `}
							/>
							<span
								className='absolute cursor-pointer bottom-3 right-3 z-1'
								onClick={() =>
									setShowPassword((prev) => ({
										...prev,
										confirmPassword: !prev.confirmPassword,
									}))
								}>
								{showPassword.confirmPassword ? (
									<AiOutlineEyeInvisible size={20} />
								) : (
									<AiOutlineEye size={20} />
								)}
							</span>
						</div>
						{errors?.confirmPassword && (
							<span className='text-red-500 text-[13px] font-Poppins'>
								{errors.confirmPassword.message}
							</span>
						)}
					</div>

					<div className='w-full flex justify-center items-center'>
						<button
							type='submit'
							disabled={!isValid || !isDirty || isSubmitting}
							className={`w-full flex justify-center items-center py-2 text-[13px] 500px:text-[16px] font-Poppins  rounded  transition-all duration-300 ease-in-out disabled:cursor-not-allowed ${
								isValid
									? "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 shadow-md"
									: "bg-blue-300 border-blue-400 text-blue-100 cursor-not-allowed"
							}`}>
							{isLoading ? (
								<ThreeDots height='20' width='40' radius='9' color='#fff' />
							) : (
								"Create Password"
							)}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
export default CreatePassword;
