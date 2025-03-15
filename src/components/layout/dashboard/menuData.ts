import {VscHome} from "react-icons/vsc";
import {FaUsers} from "react-icons/fa6";
import {LiaFileInvoiceSolid} from "react-icons/lia";
import {GoDeviceCameraVideo} from "react-icons/go";
import {MdLiveHelp, MdLiveTv, MdOutlineShoppingCart} from "react-icons/md";
import {BiImageAlt} from "react-icons/bi";
import {AiOutlineAppstore, AiOutlineUserSwitch} from "react-icons/ai";
import {LuUsers} from "react-icons/lu";
import {IoStatsChart} from "react-icons/io5";
import {CiSettings} from "react-icons/ci";

const menuData = [
    // Dashboard (no group)
    {
        items: [
            {
                to: "/admin/dashboard",
                icon: VscHome,
                title: "Dashboard"
            }
        ]
    },

    {
        title: "data",
        items: [
            {
                to: "/admin/dashboard/data/users",
                icon: FaUsers,
                title: "Users"
            },
            {
                to: "/admin/dashboard/data/invoices",
                icon: LiaFileInvoiceSolid,
                title: "Invoices"
            }
        ]
    },
//  content Group
    {
        title: "Content",
        items: [
            {
                to: "/admin/dashboard/content/create-course",
                icon: GoDeviceCameraVideo,
                title: "Create Course",
            },
            {
                to: "/admin/dashboard/content/courses",
                icon: MdLiveTv,
                title: "Live Courses",
            }
        ]
    },
    // Customization Group
    {
        title: "Customization",
        items: [
            {
                to: "/admin/dashboard/customization/hero",
                icon: BiImageAlt,
                title: "Hero",
            },
            {
                to: "/admin/dashboard/customization/faq",
                icon: MdLiveHelp,
                title: "FAQ",
            },
            {
                to: "/admin/dashboard/customization/categories",
                icon: AiOutlineAppstore,
                title: "Categories",
            },
        ],
    },
    // Controllers Group
    {
        title: "Controllers",
        items: [
            {
                to: "/admin/dashboard/controllers/manage-team",
                icon: LuUsers,
                title: "Manage Team",
            },
        ],
    },
// Analytics Group
    {
        title: "Analytics",
        items: [
            {
                to: "/admin/dashboard/analytics/course",
                icon: IoStatsChart,
                title: "Course Analytics",
            },
            {
                to: "/admin/dashboard/analytics/orders",
                icon: MdOutlineShoppingCart,
                title: "Order Analytics",
            },
            {
                to: "/admin/dashboard/analytics/users",
                icon: AiOutlineUserSwitch,
                title: "User Analytics",
            },
        ],
    },

    // Extras Group
    {
        title: "Extras",
        items: [
            {
                to: "/admin/dashboard/extras/settings",
                icon: CiSettings,
                title: "Settings",
            },
        ],
    },


]


export default menuData;