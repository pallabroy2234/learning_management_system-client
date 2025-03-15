import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertTriangle } from 'react-icons/fi';

const NotFound = () => {
	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 overflow-hidden">
			<motion.div
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="max-w-4xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-12 lg:p-16"
			>
				<div className="flex flex-col md:flex-row items-center gap-8">
					{/* Left Section - Illustration */}
					<div className="flex-1 text-center">
						<motion.div
							animate={{ y: [-10, 10, -10] }}
							transition={{ duration: 3, repeat: Infinity }}
							className="inline-block"
						>
							<svg
								className="w-48 h-48 md:w-64 md:h-64 text-purple-500 dark:text-purple-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</motion.div>
					</div>

					{/* Right Section - Content */}
					<div className="flex-1 space-y-6">
						{/* Error Code */}
						<div className="text-7xl md:text-8xl font-bold text-purple-600 dark:text-purple-400">
							404
						</div>

						{/* Title */}
						<h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">
							Oops! Page Not Found
						</h1>

						{/* Message */}
						<p className="text-base md:text-lg text-slate-600 dark:text-slate-300">
							The page you're looking for seems to have disappeared into the digital void.
							Let's get you back to safe territory.
						</p>

						{/* Action Button */}
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="w-full md:w-auto"
						>
							<Link
								to="/"
								className="inline-flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition-all duration-300 w-full text-center"
							>
								<FiHome className="text-lg" />
								<span className="text-base md:text-lg font-medium">Return Home</span>
							</Link>
						</motion.div>

						{/* Additional Help */}
						<div className="mt-6 p-4 bg-purple-50 dark:bg-slate-700 rounded-lg flex items-start gap-3">
							<FiAlertTriangle className="text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
							<div>
								<p className="text-sm text-purple-800 dark:text-purple-200">
									Need help? Contact our support team at
									<a
										href="mailto:support@example.com"
										className="block font-medium hover:underline mt-1"
									>
										support@example.com
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Animated Background Elements */}
			{[...Array(15)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute pointer-events-none"
					style={{
						top: `${Math.random() * 100}%`,
						left: `${Math.random() * 100}%`,
					}}
					initial={{ opacity: 0, scale: 0 }}
					animate={{
						opacity: [0, 0.5, 0],
						scale: [0, Math.random() * 0.8 + 0.2, 0],
					}}
					transition={{
						duration: Math.random() * 4 + 3,
						repeat: Infinity,
						delay: Math.random() * 2,
					}}
				>
					<div className="w-1 h-1 bg-purple-400/30 rounded-full" />
				</motion.div>
			))}

			{/* Floating Stars */}
			{[...Array(30)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute pointer-events-none"
					style={{
						top: `${Math.random() * 100}%`,
						left: `${Math.random() * 100}%`,
					}}
					initial={{ opacity: 0, scale: 0 }}
					animate={{
						opacity: [0, 1, 0],
						scale: [0, Math.random() * 0.5 + 0.5, 0],
					}}
					transition={{
						duration: Math.random() * 3 + 2,
						repeat: Infinity,
						delay: Math.random() * 2,
					}}
				>
					<div className="w-1 h-1 bg-white rounded-full" />
				</motion.div>
			))}
		</div>
	);
};

export default NotFound;