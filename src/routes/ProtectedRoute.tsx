import {Navigate, Outlet} from "react-router-dom";
import {FC, ReactElement} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../types/@types.ts";


type Props = {
	adminRoute?: boolean;
	children?: ReactElement;
	redirect?: string
}

const ProtectedRoute: FC<Props> = ({adminRoute, redirect = "/", children}) => {
	const {user} = useSelector((state: RootState) => state.auth);


	if (!user) {
		return <Navigate to={redirect} />;
	}


	if (adminRoute && user.role !== "admin") {
		return <Navigate to={redirect} />;
	}

	return children ? children : <Outlet />;
};
export default ProtectedRoute;
