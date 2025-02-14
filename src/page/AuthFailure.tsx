import {Link, useSearchParams} from "react-router-dom";
import {IoWarning} from "react-icons/io5";

const AuthFailure = () => {
	const [queryParams] = useSearchParams();

	const error = queryParams.get("error");

	const message = error ? decodeURIComponent(error) : "Something went wrong. Please try again later";
	return (
		<div className="h-screen grid place-items-center">
			<div className="">
				<div className="flex justify-center items-center my-3">
					<IoWarning size={100} />
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
export default AuthFailure;
