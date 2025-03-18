import {FC} from "react";
import {motion} from "framer-motion";
import {FiCheck} from "react-icons/fi";

interface Props {
	steps: string[];
	currentStep: number;
	setCurrentStep: (index: number) => void;
}

const Stepper: FC<Props> = ({steps, currentStep}) => {
	const isLastStep = currentStep === steps.length - 1;


	const initialAnimation = {
		initial: {opacity: 0, y:-15},
		animate: {opacity: 1, y:0},
		exit: {opacity: 0, x: -20},
	}

	return (
		<motion.div {...initialAnimation} className='w-full '>
			<div className='flex flex-row justify-between 500px:w-[90%] w-[92%] mx-auto relative z-[100]'>
				{steps?.map((step, index) => {
					const isCompleted = index < currentStep || isLastStep;

					return (
						<div key={index} className='flex flex-col justify-center items-center z-[100] gap-3'>
							<div
								className={`${
									index <= currentStep || currentStep === steps.length - 1
										? "bg-green-500"
										: "bg-gradient-to-r from-purple-500 to-blue-500"
								} 500px:h-12 500px:w-12 w-10 h-10 rounded-full flex items-center justify-center  transition-all`}>
								{isCompleted ? <FiCheck className='text-2xl text-white' /> : <p className='text-white'>{index + 1}</p>}
							</div>
							<h4 className='500px:text-[14px] text-[12px] font-medium 400px:block hidden'>{step}</h4>
						</div>
					);
				})}

				<div className='dark:bg-slate-700 bg-gray-300 absolute h-[3px] 800px:w-[93%] 600px:w-[90%] 400px:w-[80%] w-[90%] 500px:top-1/3 400px:top-5 top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[99]'>
					<motion.div
						initial={{width: 0}}
						animate={{width: `${(currentStep / (steps.length - 1)) * 100}%`}}
						transition={{duration: 0.5}}
						className='absolute h-full bg-green-500'
					/>
				</div>
			</div>
		</motion.div>
	);
};

export default Stepper;
