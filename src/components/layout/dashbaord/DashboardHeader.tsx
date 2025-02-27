import {AnimatePresence, motion} from "framer-motion";
import {TiThMenu} from "react-icons/ti";
import ThemeSwitcher from "../../ui/ThemeSwitcher.tsx";
import {IoMdNotifications} from "react-icons/io";
import {FC, useEffect, useRef, useState} from "react";

import NotificationModal from "../../shared/NotificationModal.tsx";

interface Props {
    setShow: (show: boolean) => void
}

const DashboardHeader: FC<Props> = ({setShow}) => {
    const [showHeader, setShowHeader] = useState(true);
    const [isOpen, setIsOpen] = useState(false)

    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY.current) {
                setShowHeader(false);
            } else {
                setShowHeader(true);
            }
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header initial={{y: "0%"}} animate={{
            y: showHeader ? "0%" : "-100%",
            opacity: showHeader ? 1 : 0.9
        }} transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.5,

        }} className={`fixed top-0 w-full z-[99997] shadow-xl bg-white/80 dark:bg-[#0a192f]/90 border-b dark:border-slate-800/70`}>
            <div className="px-4 sm:px-6 py-3 mx-auto flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <motion.button type="button"  whileHover={{
                        scale: 1.05,
                        rotate: -5
                    }} whileTap={{scale: 0.95}} className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                        <TiThMenu onClick={()=> setShow(true)} size={24}/>
                    </motion.button>
                    <motion.div initial={{opacity: 0, x: -20}} animate={{
                        opacity: 1,
                        x: 0
                    }} className="hidden sm:block text-lg font-semibold text-slate-800 dark:text-white">
                        Dashboard
                    </motion.div>
                </div>
                {/* Right Section */}
                <div className="flex items-center justify-center gap-4">
                    <ThemeSwitcher/>

                    <div className="relative">
                        <motion.button onClick={() => setIsOpen(!isOpen)} whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white relative">
                            <IoMdNotifications size={25}/>
                            <motion.span initial={{scale: 0}} animate={{scale: 1}} className="absolute -top-2 -right-1 flex justify-center items-center h-5 w-5 bg-gradient-to-tr from-pink-500 to-purple-600 text-xs text-white shadow-lg rounded-full">
                                3
                            </motion.span>
                        </motion.button>

                        {/*    Notification Modal    */}
                        <AnimatePresence>
                            {isOpen && <NotificationModal setIsOpen={setIsOpen}/>}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/*  scroll progress indicator   */}
            <motion.div initial={{scaleX: 0}} animate={{scaleX: showHeader ? 0 : 1}} transition={{duration: 0.3}} className="h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500">

            </motion.div>

        </motion.header>
    )
}
export default DashboardHeader


// <header className={`${isCollapsed ? "700px:w-[calc(100%-320px)] 700px:left-[320px] w-[100%] left-0" : "700px:w-[calc(100%-80px)] 700px:left-[80px] w-[100%]"} ${showHeader ? "translate-y-0" : "-translate-y-full"} z-[99997] transition-[width left] duration-300  fixed top-0  bg-gradient-to-b bg-white dark:from-[#0a192f] dark:to-[#172a45] shadow-lg`}>
// <div className="py-4 w-[92%]  mx-auto  flex items-center justify-between">
//     <div onClick={() => setShow(true)} className="cursor-pointer">
//     <span className="700px:hidden block"><TiThMenu size={22}/></span>
// </div>
// <div className="flex items-center justify-center gap-3">
//     <ThemeSwitcher/>
//     <button onClick={() => setIsOpen(!isOpen)} type="button" className="relative">
//         <IoMdNotifications size={25}/>
//         <span className="absolute -top-2 -right-1 bg-[#3ccba0] w-[18px] h-[18px] text-[12px] flex items-center justify-center rounded-full">3</span>
//
//         {/* Notification Modal */}
//         <AnimatePresence>
//             {isOpen && <NotificationModal setIsOpen={setIsOpen}/>}
//         </AnimatePresence>
//     </button>
// </div>
// </div>
// </header>