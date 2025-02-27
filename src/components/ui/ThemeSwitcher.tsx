import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

interface Props {
    onThemeChange?: () => void;
}

const ThemeSwitcher: React.FC<Props> = ({ onThemeChange }) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        onThemeChange?.(); // Trigger parent handler
    };

    if (!mounted) return null;

    return (
        <div className="flex items-center justify-center mx-4">
            {theme === "light" ? (
                <BiMoon onClick={handleThemeToggle} size={25} className="cursor-pointer" />
            ) : (
                <BiSun onClick={handleThemeToggle} size={25} className="cursor-pointer" />
            )}
        </div>
    );
};

export default ThemeSwitcher;


