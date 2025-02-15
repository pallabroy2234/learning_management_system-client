import {TailSpin} from "react-loader-spinner";

const Loader = () => {
	return (
		<div className="h-screen w-full overflow-hidden ">
			<div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
				<TailSpin width={50} height={50} color="#37a39a" />
			</div>
		</div>
	);
};

export default Loader;