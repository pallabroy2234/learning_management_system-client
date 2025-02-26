import {FC, useEffect, useRef, useState} from "react";
import {TiThMenu} from "react-icons/ti";
import ThemeSwitcher from "../../ui/ThemeSwitcher.tsx";
import {IoMdNotifications} from "react-icons/io";

interface DashboardHeaderProps {
    isCollapsed: boolean;
    setShow: (value: boolean) => void;
}


const DashboardHeader: FC<DashboardHeaderProps> = ({isCollapsed, setShow}) => {
    const [showHeader, setShowHeader] = useState(true)
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
        <header className={`${isCollapsed ? "700px:w-[calc(100%-320px)] 700px:left-[320px] w-[100%] left-0" : "700px:w-[calc(100%-80px)] 700px:left-[80px] w-[100%]"} ${showHeader ? "translate-y-0" : "-translate-y-full"} z-[99997] transition-[width left] duration-300  fixed top-0  bg-gradient-to-b bg-white dark:from-[#0a192f] dark:to-[#172a45] shadow-lg`}>
            <div className="py-4 w-[92%]  mx-auto  flex items-center justify-between">
                <div onClick={() => setShow(true)} className="cursor-pointer">
                    <span className="700px:hidden block"><TiThMenu size={22}/></span>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <ThemeSwitcher/>
                    <span>
                        <IoMdNotifications size={25}/>
                    </span>
                </div>
            </div>
        </header>
    )
}
export default DashboardHeader


// fixed top-0 left-0 w-full h-[80px] z-[80] border-b
// transition-transform duration-300 backdrop-blur-lg shadow-md
// ${showHeader ? "translate-y-0" : "-translate-y-full"}
// bg-gradient-to-b from-white/30 to-white/10 dark:from-[#0a192f]/60 dark:to-[#172a45]/30
// border-gray-200 dark:border-gray-700