import {FC, JSX} from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../types/@types.ts";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
import menuData from "./menuData.ts";

const defaultAvatar = "/public/avatar.jpg"


interface IMenuProps {
    isCollapsed?: boolean;
    icon: JSX.Element;
    to: string;
    title: string;
}

const MenuItem: FC<IMenuProps> = ({isCollapsed, icon, to, title}) => {
    const {pathname} = useLocation()
    return (
        <Link to={to} className={`flex  items-center justify-start  gap-3 ${isCollapsed ? "pl-10" : "justify-center"} ${pathname === to ? "text-purple-400" : "dark:text-white text-black"} hover:text-purple-400  transition-colors duration-100`}>
            <span className={`${isCollapsed ? "text-[24px]" : "text-[24px]"}`}>{icon}</span>
            <div>
                {
                    isCollapsed && (
                        <p className="whitespace-nowrap capitalize text-[16px] font-Poppins">{title}</p>
                    )
                }
            </div>
        </Link>
    )
}

interface Props {
    isCollapsed: boolean
    setIsCollapsed: (isCollapsed: boolean) => void
}

const AdminSidebar: FC<Props> = ({isCollapsed, setIsCollapsed}) => {
    const {user} = useSelector((state: RootState) => state.auth)


    return (
        <div className={`${isCollapsed ? "w-[320px]" : "w-[80px]"} 700px:block hidden transition-[width] ease-in-out duration-300 fixed top-0 left-0 h-screen bg-white shadow-lg dark:bg-[#111C43] z-[99999]`}>
            <div className="relative">
                <div className={`flex ${isCollapsed ? "justify-between py-[13px]" : "justify-center py-[19px]"}  items-center    shadow-md`}>
                    {
                        isCollapsed && (
                            <Link to="/" className="text-[20px]  font-bold  pl-10  whitespace-nowrap font-Poppins uppercase text-black dark:text-white">E-Learning</Link>
                        )
                    }

                    <span onClick={() => setIsCollapsed(!isCollapsed)} className={`flex justify-center items-center cursor-pointer ${isCollapsed ? "pr-3" : "p-0"}`}>
                       {
                           isCollapsed ? (
                               <MdArrowBackIos className={`500px:text-[20px] text-[28px]`}/>
                           ) : (
                               <MdArrowForwardIos className={`500px:text-[20px] text-[28px]`}/>
                           )
                       }
                    </span>
                </div>

                <div className="overflow-y-auto h-screen pb-[103px] admin-sidebar">
                    {
                        isCollapsed && (
                            <div className="flex flex-col justify-center items-center mt-[50px] whitespace-nowrap">
                                <div className="w-[100px] h-[100px]  rounded-full ring-4 flex justify-center items-center whitespace-nowrap">
                                    <img src={user ? user.avatar.url : defaultAvatar} alt={user ? user.name : "profile-image"} className="object-cover w-full h-full rounded-full"/>
                                </div>
                                <div className="flex flex-col justify-center items-center gap-1 mt-[20px]">
                                    <h6 className="text-[17px] font-Josefin text-black dark:text-white">{user?.name}</h6>
                                    <h4 className="text-[17px] font-Josefin capitalize text-black dark:text-white">- {user?.role}</h4>
                                </div>
                            </div>
                        )
                    }
                    {/*  Menu List  */}
                    <div className="mt-[40px]">
                        <div className={`${isCollapsed ? "gap-12" : "gap-[45px]"} flex flex-col justify-evenly`}>
                            {
                                menuData?.map((group, groupIndex) => (
                                    group?.title ? (
                                        <div key={groupIndex} className={`${isCollapsed ? "gap-3" : "gap-[45px]"} flex flex-col `}>
                                            {
                                                isCollapsed && (
                                                    <h5 className="pl-10 font-Poppins text-black dark:text-white text-[15px] whitespace-nowrap">{group?.title}</h5>
                                                )
                                            }
                                            {
                                                group?.items?.map((item, index) => (
                                                    <MenuItem key={index} isCollapsed={isCollapsed} icon={
                                                        <item.icon/>} to={item.to} title={item?.title}/>
                                                ))
                                            }
                                        </div>
                                    ) : (
                                        group?.items?.map((item, index) => (
                                            <MenuItem key={index} isCollapsed={isCollapsed} icon={
                                                <item.icon/>} to={item.to} title={item?.title}/>
                                        ))
                                    )
                                ))
                            }
                            {/*  Check comment   */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default AdminSidebar


{/*<MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*    <VscHome/>} to="/admin/dashboard" title="Dashboard"/>*/
}

{/*<div className={`${isCollapsed ? "gap-3" : "gap-[45px]"} flex flex-col `}>*/
}
{/*    {isCollapsed &&*/
}
{/*        <h5 className="pl-10 font-Poppins text-black dark:text-white text-[15px] whitespace-nowrap">Data</h5>}*/
}
{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <FaUsers/>} to="/admin/dashboard/data/users" title="Users"/>*/
}
{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <LiaFileInvoiceSolid/>} to="/admin/dashboard/data/invoices" title="Invoices"/>*/
}
{/*</div>*/
}


{/*<div className={`${isCollapsed ? "gap-3" : "gap-[45px]"} flex flex-col `}>*/
}
{/*    {isCollapsed &&*/
}
{/*        <h5 className="pl-10 font-Poppins text-black dark:text-white text-[15px] whitespace-nowrap">Content</h5>}*/
}
{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <GoDeviceCameraVideo/>} to="/admin/dashboard/course/create-courses" title="Create Course"/>*/
}
{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <MdLiveTv/>} to="/admin/dashboard/course/live-courses" title="Live Courses"/>*/
}
{/*</div>*/
}


{/*<div className={`${isCollapsed ? "gap-3" : "gap-[45px]"} flex flex-col `}>*/
}
{/*    {isCollapsed &&*/
}
{/*        <h5 className="pl-10 font-Poppins text-black dark:text-white text-[15px] whitespace-nowrap">Customization</h5>}*/
}
{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <BiImageAlt/>} to="/admin/dashboard/customizaiton/hero" title="Hero"/>*/
}
{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <MdLiveHelp/>} to="/admin/dashboard/customization/faq" title="FAQ"/>*/
}
{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <AiOutlineAppstore/>} to="/admin/dashboard/customization/categories" title="Categories"/>*/
}
{/*</div>*/
}

{/*<div className={`${isCollapsed ? "gap-3" : "gap-[45px]"} flex flex-col `}>*/
}
{/*    {isCollapsed &&*/
}
{/*        <h5 className="pl-10 font-Poppins text-black dark:text-white text-[15px] whitespace-nowrap">Controllers</h5>}*/
}
{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <LuUsers/>} to="/admin/dashboard/controllers/manage-team" title="Manage Team"/>*/
}
{/*</div>*/
}


{/*<div className={`${isCollapsed ? "gap-3" : "gap-[45px]"} flex flex-col `}>*/
}
{/*    {isCollapsed &&*/
}
{/*        <h5 className="pl-10 font-Poppins text-black dark:text-white text-[15px] whitespace-nowrap">Analytics</h5>}*/
}

{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <IoStatsChart/>} to="/admin/dashboard/analytics/course" title="Course Analytics"/>*/
}
{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <MdOutlineShoppingCart/>} to="/admin/dashboard/analytics/orders" title="Order Analytics"/>*/
}

{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <AiOutlineUserSwitch*/
}
{/*        />} to="/admin/dashboard/analytics/users" title="User Analytics"/>*/
}
{/*</div>*/
}

{/*<div className={`${isCollapsed ? "gap-3" : "gap-[45px]"} flex flex-col `}>*/
}
{/*    {isCollapsed &&*/
}
{/*        <h5 className="pl-10 font-Poppins text-black dark:text-white text-[15px] whitespace-nowrap">Extras</h5>}*/
}

{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <CiSettings/>} to="/admin/dashboard/extras/settings" title="Settings"/>*/
}
{/*    <MenuItem isCollapsed={isCollapsed} icon={*/
}
{/*        <IoIosLogOut/>} to="/admin/dashboard/extras/logout" title="Log Out"/>*/
}
{/*</div>*/
}