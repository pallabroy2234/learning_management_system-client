import {FC, useState} from 'react';
import {FiCheckCircle, FiAlertCircle, FiMessageSquare, FiHeart, FiX} from 'react-icons/fi';
import {motion, AnimatePresence} from 'framer-motion';


interface Props {
    setIsOpen: (value: boolean) => void;
}

const NotificationModal: FC<Props> = ({setIsOpen}) => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: "New question received from John Doe",
            timestamp: "5 min ago",
            read: false,
            type: "comment"
        },
        {
            id: 2,
            message: "Your course has 15 new enrollments",
            timestamp: "2 hours ago",
            read: true,
            type: "success"
        },
        {
            id: 3,
            message: "System maintenance scheduled for tonight",
            timestamp: "4 hours ago",
            read: false,
            type: "alert"
        },
        {
            id: 4,
            message: "Sarah Smith liked your post",
            timestamp: "1 day ago",
            read: true,
            type: "like"
        }
    ]);

    const markAsRead = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? {...n, read: true} : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({...n, read: true})));
    };

    return (
        <motion.div
            onClick={e => e.stopPropagation()}
            initial={{opacity: 0, y: -10, scale: 0.95}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: -10, scale: 0.95}}
            transition={{type: "spring", stiffness: 700, damping: 30}}
            className="absolute right-0 top-14 w-[400px] max-h-[70vh] bg-white dark:bg-slate-800 shadow-xl z-[99999] rounded-lg border dark:border-slate-700/80 overflow-hidden"
        >
            <div className="flex items-center justify-between p-4 border-b dark:border-slate-700/80">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Notifications
                </h3>
                <div className="flex items-center gap-2">
                    <button
                        onClick={markAllAsRead}
                        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 px-2 py-1 rounded-md transition-colors"
                    >
                        Mark all as read
                    </button>
                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors">
                        <FiX className="text-slate-600 dark:text-slate-300" size={18}/>
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
                {notifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 dark:text-slate-400">
                        No new notifications
                    </div>
                ) : (
                    <AnimatePresence>
                        {notifications.map(notification => (
                            <motion.div
                                key={notification.id}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                className={`flex items-start gap-3 p-4 border-b dark:border-slate-700/80 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer ${
                                    !notification.read ? "bg-blue-50/50 dark:bg-blue-900/20" : ""
                                }`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="mt-1">
                                    {notification.type === 'comment' && (
                                        <FiMessageSquare className="text-slate-600 dark:text-slate-300" size={18}/>
                                    )}
                                    {notification.type === 'success' && (
                                        <FiCheckCircle className="text-green-600 dark:text-green-400" size={18}/>
                                    )}
                                    {notification.type === 'alert' && (
                                        <FiAlertCircle className="text-amber-600 dark:text-amber-400" size={18}/>
                                    )}
                                    {notification.type === 'like' && (
                                        <FiHeart className="text-rose-600 dark:text-rose-400" size={18}/>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <p className={`text-sm ${
                                        !notification.read
                                            ? "text-slate-900 dark:text-white font-medium"
                                            : "text-slate-700 dark:text-slate-300"
                                    }`}>
                                        {notification.message}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                        {notification.timestamp}
                                    </p>
                                </div>
                                {!notification.read && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"/>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            <div className="p-3 border-t dark:border-slate-700/80">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/30 transition-colors">
                    View All Notifications
                </button>
            </div>
        </motion.div>
    );
};

export default NotificationModal;