// import {useGoogleLogin} from "@react-oauth/google";
// import toast from "react-hot-toast";
// // import {useGoogleLoginMutation} from "../../store/features/auth/authApi.ts";
// import {FC, useEffect} from "react";
// import {CustomError} from "../../types/@types.ts";
// import {FcGoogle} from "react-icons/fc";
//
// type Props = {
// 	setOpen: (open: boolean) => void;
// }
// const GoogleLogin: FC<Props> = ({setOpen}) => {
// 	// const [googleLogin, {
// 	// 	isSuccess,
// 	// 	isError,
// 	// 	error,
// 	// 	data
// 	// }] = useGoogleLoginMutation();
//
// 	const handleGoogleLogin = useGoogleLogin({
// 		onSuccess: async (response) => {
// 			try {
// 				const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
// 					headers: {
// 						Authorization: `Bearer ${response?.access_token}`
// 					},
// 					credentials: "same-origin"
// 				});
// 				const userData = await res.json();
// 				const {email, name, picture} = userData;
//
// 				await googleLogin({
// 					name,
// 					email,
// 					picture
// 				});
// 			} catch (error: any) {
// 				if (error instanceof Error) {
// 					console.error("Google login error:", error.message);
//
// 					// User-friendly messages
// 					if (error.message.includes("Network Error")) {
// 						toast.error("Network error - please check your internet connection");
// 					} else if (error.message.includes("400")) {
// 						toast.error("Invalid Google authentication - please try again");
// 					} else {
// 						toast.error("Failed to authenticate with Google");
// 					}
// 				} else {
// 					console.error("Unknown error:", error);
// 					toast.error("An unexpected error occurred");
// 				}
// 			}
// 		},
// 		onError: (error) => {
// 			console.log("Google login error:", error);
// 			toast.error("Google login failed");
// 		}
// 	});
//
//
// 	useEffect(() => {
// 		if (isSuccess) {
// 			const message = data?.message || "Login successful";
// 			toast.success(message);
// 			setOpen(false);
// 		}
// 		if (isError) {
// 			if ("data" in error) {
// 				const err = error as CustomError;
// 				toast.error(err?.data.message);
// 			}
// 		}
// 	}, [isError, isSuccess]);
// 	return (
// 		<div>
// 			<FcGoogle onClick={() => handleGoogleLogin()} size={30} className="cursor-pointer" />
// 		</div>
// 	);
// };
// export default GoogleLogin;
