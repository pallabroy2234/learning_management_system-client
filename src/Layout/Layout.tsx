import {Outlet} from "react-router-dom";
import Header from "../components/Header.tsx";
import {useState} from "react";

const Layout = () => {
	const [open, setOpen] = useState(false);
	const [activeItem, setActiveItem] = useState(0);

	return (
		<div>
			<Header open={open} activeItem={activeItem} setOpen={setOpen} />
			<Outlet />
		</div>
	);
};
export default Layout;
