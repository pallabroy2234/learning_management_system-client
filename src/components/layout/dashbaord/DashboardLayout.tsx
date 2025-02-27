import {Outlet} from "react-router-dom";
import {useState} from "react";
import AdminSidebar from "./AdminSidebar.tsx";
import DashboardHeader from "./DashboardHeader.tsx";


const DashboardLayout = () => {
    const [show, setShow] = useState(false)

    return (
        <div className="w-[100%] h-[700px] overflow-x-hidden">
            <DashboardHeader setShow={setShow}/>
            <AdminSidebar show={show} setShow={setShow}/>


            <div>
                <Outlet/>
            </div>
        </div>
    );
};
export default DashboardLayout;
