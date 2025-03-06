import {FC} from "react";
import {motion} from "framer-motion";
import {FiCheck} from "react-icons/fi";

interface Props {
    steps: string[];
    currentStep: number;
    setCurrentStep: (index: number) => void;
}

const Stepper: FC<Props> = ({steps, setCurrentStep, currentStep}) => {
    const isLastStep = currentStep === steps.length - 1;

    return (
        <div className="w-full ">
            <div className="flex flex-row justify-between 500px:w-[90%] w-[92%] mx-auto relative z-[100]">
                {steps?.map((step, index) => {
                    const isCompleted = index < currentStep || isLastStep;

                    return (
                        <div key={index} className="flex flex-col justify-center items-center z-[100] gap-3">
                            <div
                                className={`${
                                    index <= currentStep || currentStep === steps.length - 1
                                        ? "bg-green-500"
                                        : "bg-gradient-to-r from-purple-500 to-blue-500"
                                } 500px:h-12 500px:w-12 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all`}
                                onClick={() => setCurrentStep(index)}
                            >
                                {isCompleted ? (
                                    <FiCheck className="text-2xl text-white"/>
                                ) : (
                                    <p className="text-white">{index + 1}</p>
                                )}
                            </div>
                            <h4 className="500px:text-[14px] text-[12px] font-medium 400px:block hidden">{step}</h4>
                        </div>
                    );
                })}

                <div className="dark:bg-slate-700 bg-gray-300 absolute h-[3px] 800px:w-[93%] 600px:w-[90%] 400px:w-[80%] w-[90%] 500px:top-1/3 400px:top-5 top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99]">
                    <motion.div
                        initial={{width: 0}}
                        animate={{width: `${(currentStep / (steps.length - 1)) * 100}%`}}
                        transition={{duration: 0.5}}
                        className="absolute h-full bg-green-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default Stepper;

// <div className="w-[90%] relative h-[3px] bg-gray-300 dark:bg-slate-700 rounded-full">
//     {/* Progress Line */}
//     <div className="mb-10">
//         {/*<motion.div initial={{width: 0}} animate={{width: `${(currentStep / (steps.length - 1)) * 100}%`}} transition={{duration: 0.5}} className={`h-full  absolute left-0 top-0 bg-green-500 rounded-full`}></motion.div>*/}
//         <div className="w-full relative top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">
//             <div className="flex justify-between">
//                 {
//                     steps?.map((step: string, index) => (
//                         <div key={index} className="flex flex-col gap-4">
//                             <div className={`${index > currentStep - 1 ? "bg-gradient-to-r from-purple-500 to-blue-500" : "bg-green-500"}  h-12 w-12 rounded-full  flex justify-center items-center `}>
//                                 {
//                                     index < currentStep ? (
//                                         <div>
//                                             <FiCheck className="text-2xl text-white"/>
//                                         </div>
//                                     ) : (
//                                         <div className="text-white">
//                                             {index + 1}
//                                         </div>
//                                     )
//                                 }
//                             </div>
//
//                             <span>
//                                 {step}
//                             </span>
//                         </div>
//                     ))
//                 }
//             </div>
//
//         </div>
//     </div>
// </div>

// import { motion } from "framer-motion";
// import { FC } from "react";
// import { FiCheck, FiCircle } from "react-icons/fi";
//
// interface Props {
//     steps: string[];
//     currentStep: number;
//     setCurrentStep: (index: number) => void;
// }
//
// const Stepper: FC<Props> = ({ steps, setCurrentStep, currentStep }) => {
//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="w-full max-w-screen-xl mx-auto px-4"
//         >
//             <div className="px-4 pb-8">
//                 <div className="flex flex-col items-center">
//                     {/* Progress Line */}
//                     <div className="hidden sm:flex relative h-2 w-full mb-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
//                         <motion.div
//                             className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-blue-400"
//                             initial={{ width: 0 }}
//                             animate={{
//                                 width: `${(currentStep / (steps.length - 1)) * 100}%`
//                             }}
//                             transition={{ duration: 0.5 }}
//                         />
//                     </div>
//
//                     <div className="flex justify-between w-full relative">
//                         {steps.map((step, index) => {
//                             const isCompleted = index < currentStep;
//                             const isActive = index === currentStep;
//
//                             return (
//                                 <div
//                                     key={step}
//                                     className="flex flex-col items-center relative z-10"
//                                     style={{ width: `${100 / steps.length}%` }}
//                                 >
//                                     {/* Mobile Step Indicator */}
//                                     <motion.button
//                                         onClick={() => setCurrentStep(index)}
//                                         className={`sm:hidden flex items-center justify-center w-12 h-12 rounded-full mb-4 transition-all ${
//                                             isActive
//                                                 ? "bg-gradient-to-r from-purple-600 to-blue-500 scale-110"
//                                                 : isCompleted
//                                                     ? "bg-green-500"
//                                                     : "bg-gray-200 dark:bg-gray-700"
//                                         }`}
//                                         whileHover={{ scale: 1.05 }}
//                                     >
//                                         {isCompleted ? (
//                                             <FiCheck className="text-white text-xl" />
//                                         ) : (
//                                             <span
//                                                 className={`text-sm font-medium ${
//                                                     isActive
//                                                         ? "text-white"
//                                                         : "text-gray-600 dark:text-gray-300"
//                                                 }`}
//                                             >
//                         {index + 1}
//                       </span>
//                                         )}
//                                     </motion.button>
//
//                                     {/* Desktop Step Indicator */}
//                                     <button
//                                         onClick={() => setCurrentStep(index)}
//                                         className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full mb-4 transition-all"
//                                     >
//                                         <motion.div
//                                             className={`flex items-center justify-center w-full h-full rounded-full ${
//                                                 isActive
//                                                     ? "bg-gradient-to-r from-purple-600 to-blue-500"
//                                                     : isCompleted
//                                                         ? "bg-green-500"
//                                                         : "bg-gray-200 dark:bg-gray-700"
//                                             }`}
//                                             animate={{
//                                                 scale: isActive ? 1.1 : 1
//                                             }}
//                                         >
//                                             {isCompleted ? (
//                                                 <FiCheck className="text-white text-xl" />
//                                             ) : (
//                                                 <FiCircle
//                                                     className={`${
//                                                         isActive
//                                                             ? "text-white"
//                                                             : "text-gray-600 dark:text-gray-300"
//                                                     }`}
//                                                 />
//                                             )}
//                                         </motion.div>
//                                     </button>
//
//                                     {/* Step Label */}
//                                     <motion.div
//                                         className={`text-center px-2 ${
//                                             isActive
//                                                 ? "text-purple-600 dark:text-purple-400 font-medium"
//                                                 : "text-gray-500 dark:text-gray-400"
//                                         }`}
//                                         initial={{ opacity: 0, y: 10 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                     >
//                                         <span className="hidden sm:block text-sm">{step}</span>
//                                         <span className="sm:hidden text-xs">
//                       {isActive ? step : ""}
//                     </span>
//                                     </motion.div>
//
//                                     {/* Connector Dots (Mobile) */}
//                                     {index < steps.length - 1 && (
//                                         <div className="sm:hidden absolute top-6 left-full -ml-6">
//                                             {[...Array(3)].map((_, dotIndex) => (
//                                                 <div
//                                                     key={dotIndex}
//                                                     className={`w-1 h-1 rounded-full mb-1 ${
//                                                         index < currentStep
//                                                             ? "bg-green-500"
//                                                             : "bg-gray-300 dark:bg-gray-600"
//                                                     }`}
//                                                 />
//                                             ))}
//                                         </div>
//                                     )}
//                                 </div>
//                             );
//                         })}
//                     </div>
//
//                     {/* Completion Message */}
//                     {currentStep === steps.length && (
//                         <motion.div
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             className="mt-8 flex items-center gap-2 text-green-600 dark:text-green-400"
//                         >
//                             <FiCheck className="text-2xl" />
//                             <span className="font-medium">All steps completed!</span>
//                         </motion.div>
//                     )}
//                 </div>
//             </div>
//         </motion.div>
//     );
// };
//
// export default Stepper;