import {FC, ReactNode} from "react";
import {AnimatePresence} from "framer-motion";
import {motion} from "framer-motion";
import {IoMdClose} from "react-icons/io";

interface Props {
	isModalOpen: boolean;
	setIsModalOpen: (isOpen: boolean) => void;
	children: ReactNode;
}

const initialAnimation = {
	initial: {opacity: 0, scale: 0.5 ,x: "-50%", y: "-50%"},
	animate: {opacity: 1, scale: 1 ,
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 20
		}
	},
	exit: {opacity: 0, scale: 0.5, x: "-50%", y: "-50%"}
};

const Modal:FC<Props> = ({isModalOpen, setIsModalOpen , children }) => {
	return (
		<div>
			<AnimatePresence>
				{
					isModalOpen && (
						<>
							<motion.div
								{...initialAnimation}
								className="fixed left-1/2 top-1/2 z-[999999] w-[95%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-xl dark:bg-gray-800 border dark:border-gray-600"
							>
								<div className="p-4 border-b dark:border-gray-600 flex justify-end">
									<button
										onClick={() => setIsModalOpen(false)}
										className="ml-auto p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300"
										aria-label="Close"
									>
										<IoMdClose  className="w-5 h-5" />
									</button>
								</div>

								<div className="max-h-[70vh] overflow-y-auto p-4">
									{children}
								</div>
							</motion.div>

							<motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity:0}} className={`backdrop-overlay`} onClick={()=> setIsModalOpen(false)}></motion.div>
						</>
					)
				}
			</AnimatePresence>

		</div>
	);
};
export default Modal;
