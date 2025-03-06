import {Outlet} from "react-router-dom";
import {Suspense, useState} from "react";
import AdminSidebar from "./AdminSidebar.tsx";
import DashboardHeader from "./DashboardHeader.tsx";
import Loader from "../../shared/Loader.tsx";


const DashboardLayout = () => {
    const [show, setShow] = useState(false)

    return (
        <div className="w-[100%] ">
            <DashboardHeader setShow={setShow}/>
            <AdminSidebar show={show} setShow={setShow}/>


            <div>
                <Suspense fallback={<Loader/>}>
                    <Outlet/>
                </Suspense>
            </div>
        </div>
    );
};
export default DashboardLayout;
