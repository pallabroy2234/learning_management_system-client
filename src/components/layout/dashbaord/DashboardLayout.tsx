import {Outlet} from "react-router-dom";

import {useState} from "react";
import AdminSidebar from "./AdminSidebar.tsx";
import DashboardHeader from "./DashboardHeader.tsx";
import SmallDeviceAdminSidebar from "./SmallDeviceAdminSidebar.tsx";


const DashboardLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const [show, setShow] = useState(false)

    return (
        <div className="w-[100%] h-[700px] overflow-x-hidden">
            {/* SideBar */}
            <AdminSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>

            <DashboardHeader isCollapsed={isCollapsed} setShow={setShow}/>

            <SmallDeviceAdminSidebar show={show} setShow={setShow}/>
            <div className={`${isCollapsed ? "700px:w-[calc(100%-320px)] 700px:ml-[320px] w-[100%]" : "700px:w-[calc(100%-80px)]  700px:ml-[80px] w-[100%]"}  transition-[width margin-left]  duration-300`}>
                <Outlet/>
            </div>
        </div>
    );
};
export default DashboardLayout;
