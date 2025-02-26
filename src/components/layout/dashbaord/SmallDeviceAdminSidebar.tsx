import {FC, JSX} from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../types/@types.ts";
import menuData from "./menuData.ts";

const defaultAvatar = "/public/avatar.jpg"

interface MenuItemProps {
    to: string;
    icon: JSX.Element;
    title: string;
    onClick?: () => void;
}

const MenuItem: FC<MenuItemProps> = ({to, icon, title ,onClick}) => {
    const {pathname} = useLocation()
    return (
        <div onClick={onClick}>
            <Link  to={to} className={`${pathname === to ? "text-purple-500" : "dark:text-white text-black"}  flex  items-center pl-10 justify-start  gap-3 hover:text-purple-400   transition-colors duration-100`}>
                <span className="text-[24px]">{icon}</span>
                <div>
                    <p className="whitespace-nowrap capitalize text-[16px] font-Poppins">{title}</p>
                </div>
            </Link>
        </div>
    )
}


interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
}

const SmallDeviceAdminSidebar: FC<Props> = ({show, setShow}) => {
    const {user} = useSelector((state: RootState) => state.auth)
    return (
        <div>
            <div className={`${show ? "translate-x-0" : "-translate-x-full"} transition-transform ease-in-out duration-300 fixed top-0 left-0 h-screen w-[280px] bg-white dark:bg-[#111C43] z-[99999] shadow-lg`}>
                <div>
                    <div className={`flex items-center  shadow-md py-[13px]`}>
                        <Link to="/" className="text-[20px]  font-bold  pl-10  whitespace-nowrap font-Poppins uppercase text-black dark:text-white">E-Learning</Link>
                    </div>

                    <div className="h-screen overflow-y-auto admin-sidebar pb-[102px]">
                        <div className="flex flex-col justify-center items-center mt-[50px] whitespace-nowrap">
                            <div className="w-[100px] h-[100px]  rounded-full ring-4 flex justify-center items-center whitespace-nowrap">
                                <img src={user ? user.avatar.url : defaultAvatar} alt={user ? user.name : "profile-image"} className="object-cover w-full h-full rounded-full"/>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-1 mt-[20px]">
                                <h6 className="text-[17px] font-Josefin text-black dark:text-white">{user?.name}</h6>
                                <h4 className="text-[17px] font-Josefin capitalize text-black dark:text-white">- {user?.role}</h4>
                            </div>
                        </div>

                        <div className="mt-[40px] flex flex-col gap-7">
                            {menuData?.map((group, groupIndex) => (
                                group?.title ? (
                                    <div key={groupIndex} className="flex flex-col gap-3">
                                        <h5 className="pl-10 font-Poppins text-black dark:text-white text-[15px] whitespace-nowrap">
                                            {group.title}
                                        </h5>
                                        {group.items.map((item, itemIndex) => (
                                            <MenuItem
                                                key={itemIndex}
                                                to={item.to}
                                                icon={<item.icon/>}
                                                title={item.title}
                                                onClick={() => setShow(false)}
                                            />
                                        ))}
                                    </div>

                                ) : (
                                    group.items.map((item, itemIndex) => (
                                        <MenuItem
                                            key={itemIndex}
                                            to={item.to}
                                            icon={<item.icon/>}
                                            title={item.title}
                                            onClick={() => setShow(false)}
                                        />
                                    ))
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/*  Overlay   */}

            <div onClick={() => setShow(false)} className={`${show ? "block" : "hidden"}  backdrop-overlay`}>
            </div>
        </div>
    )
}
export default SmallDeviceAdminSidebar
