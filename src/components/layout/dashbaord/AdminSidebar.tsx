import { FC, JSX } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/@types.ts";
import { AnimatePresence, motion } from "framer-motion";
import menuData from "./menuData.ts";

const defaultAvatar = "/public/avatar.jpg";

interface MenuItemProps {
    to: string;
    icon: JSX.Element;
    title: string;
    onClick?: () => void;
}

const MenuItem: FC<MenuItemProps> = ({ to, icon, title, onClick }) => {
    const { pathname } = useLocation();

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{
                translateX: 8,
                transition: { type: "spring", stiffness: 300 }
            }}
            className="relative group"
        >
            <Link
                to={to}
                onClick={onClick}
                className={`flex items-center pl-6 pr-4 py-3 mx-2 rounded-xl transition-all duration-200
                    ${
                    pathname === to
                        ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg"
                        : "dark:text-gray-300 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                }`}
            >
                <motion.span
                    className="text-2xl mr-3"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                >
                    {icon}
                </motion.span>

                <span className="text-[15px] font-medium capitalize">{title}</span>

                {pathname === to && (
                    <motion.div
                        className="absolute -left-2 w-1 h-6 bg-white rounded-full"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white/30 rounded-xl"
                    transition={{ duration: 0.2 }}
                />
            </Link>
        </motion.div>
    );
};

interface Props {
    show: boolean;
    setShow: (show: boolean) => void;
}

const SmallDeviceAdminSidebar: FC<Props> = ({ show, setShow }) => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                            mass: 0.8
                        }}
                        className="fixed top-0 left-0 h-screen w-[280px] bg-white dark:bg-[#0f172a] z-[99999] shadow-2xl border-r dark:border-gray-800"
                    >
                        <div className="h-full flex flex-col overflow-hidden">
                            {/* Header */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="p-4 border-b dark:border-gray-800"
                            >
                                <div className="flex justify-between items-center">
                                    <Link
                                        to="/"
                                        className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
                                    >
                                        E-Learning
                                    </Link>
                                    <button
                                        onClick={() => setShow(false)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-[102px]">
                                {/* Profile Section */}
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="p-6 text-center"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative inline-block"
                                    >
                                        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg relative">
                                            <img
                                                src={user ? user.avatar.url : defaultAvatar}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent" />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-400 rounded-full border-2 border-white dark:border-gray-900" />
                                    </motion.div>

                                    <motion.div
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-4"
                                    >
                                        <h6 className="text-lg font-semibold dark:text-white">
                                            {user?.name}
                                        </h6>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            {user?.role}
                                        </p>
                                    </motion.div>
                                </motion.div>

                                {/* Menu Items */}
                                <motion.div className="space-y-1 px-2">
                                    {menuData.map((group, groupIndex) => (
                                        <div key={groupIndex} className="space-y-2">
                                            {group.title && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.3 + groupIndex * 0.1 }}
                                                    className="px-4 py-2"
                                                >
                                                    <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                                                        {group.title}
                                                    </span>
                                                </motion.div>
                                            )}
                                            <div className="space-y-1">
                                                {group.items.map((item, itemIndex) => (
                                                    <MenuItem
                                                        key={itemIndex}
                                                        to={item.to}
                                                        icon={<item.icon />}
                                                        title={item.title}
                                                        onClick={() => setShow(false)}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShow(false)}
                        className="backdrop-overlay"
                    />
                </>
            )}
        </AnimatePresence>
    );
};

export default SmallDeviceAdminSidebar;