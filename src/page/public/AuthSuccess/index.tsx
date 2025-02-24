import {Link, Navigate, useSearchParams} from "react-router-dom";
import {MdVerified} from "react-icons/md";

const AuthSuccess = () => {
	const [queryParams] = useSearchParams();

	const success = queryParams.get("success");

	const message = success ? decodeURIComponent(success) : "Thank you for logging in";

	if (!success) {
		return <Navigate to={"/"} />;
	}

	return (
		<div className="h-screen grid place-items-center">
			<div className="">
				<div className="flex justify-center items-center my-3">
					<MdVerified size={100} />
				</div>
				<h1 className="text-base font-bold text-center mb-5">
					{message}
				</h1>
				<div className="flex justify-center items-center mt-3">
					<Link to={"/"} className="bg-transparent border-black dark:border-white text-black dark:text-white border px-8 py-1 rounded">Go Back</Link>
				</div>
			</div>
		</div>
	);
};
export default AuthSuccess;
