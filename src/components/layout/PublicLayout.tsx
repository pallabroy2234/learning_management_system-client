import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";
import {Suspense, useState} from "react";
import Loader from "../shared/Loader.tsx";

const PublicLayout = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [route, setRoute] = useState("Login");

    return (
        <div>
            <Header open={open} activeItem={activeItem} setOpen={setOpen} route={route} setRoute={setRoute} setActiveItem={setActiveItem}/>
            <div>
                <Suspense fallback={<Loader/>}>
                    <Outlet/>
                </Suspense>
            </div>
        </div>
    );
};
export default PublicLayout;
