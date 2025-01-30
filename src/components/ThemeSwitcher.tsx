import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {BiMoon, BiSun} from "react-icons/bi";


const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const {theme, setTheme} = useTheme();


	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className="flex items-center justify-center mx-4">
			{
				theme === "light" ? (
					<BiMoon onClick={() => setTheme("dark")} fill="black" size={25} className="cursor-pointer" />
				) : (
					<BiSun onClick={() => setTheme("light")} size={25} className="cursor-pointer" />
				)
			}
		</div>
	);
};
export default ThemeSwitcher;


// export default function ThemeSwitcher() {
//	
// 	const {theme, setTheme} = useTheme();
// 	const [mounted, setMounted] = useState(false);
//
// 	// Ensure the theme is correctly set after the component mounts
// 	useEffect(() => {
// 		setMounted(true);
// 	}, []);
//
// 	if (!mounted) {
// 		return null; // Prevents hydration mismatch in SSR
// 	}
//
// 	return (
// 		<button
// 			className="p-2 border rounded-md dark:bg-gray-800 bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
// 			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
// 		>
// 			{theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
// 		</button>
// 	);
// }
