import {Link} from "react-router-dom";

const GoogleAuthFailure = () => {
	return (
		<div className="h-screen grid place-items-center">
			<div className="">
				<h1 className="text-base font-bold text-center">Something went wrong. Google authentication failed</h1>
				<p className="text-center">Please try again</p>
				<div className="flex justify-center items-center mt-3">
					<Link to={"/"} className="bg-transparent border-black dark:border-white text-black dark:text-white border px-8 py-1 rounded">Go Back</Link>
				</div>
			</div>
		</div>
	);
};
export default GoogleAuthFailure;
