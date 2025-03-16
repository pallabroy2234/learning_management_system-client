import {StylesConfig} from "react-select";

/**
 * @summary     Custom Styles for react-select
 * @description Custom styles for react-select component
 * @type        {StylesConfig}
 * @property    {object} control
 * @property    {object} option
 * @property    {object} singleValue
 * @property    {object} menu etc...
 * */
export const getSelectStyle :({theme}: {theme: any}) => StylesConfig = ({theme}):StylesConfig => {
	return {
		control: (base: any, state: any) => ({
			...base,
			border: "none",
			backgroundColor: theme === "dark" ? "transparent" : "transparent",
			borderColor: state.isFocused ? "transparent" : "transparent",
			boxShadow: state.isFocused ? "none" : "none",
			borderRadius: "",

			// color: theme === "dark" ? "white" : "white",
		}),
		option: (base: any, state: any) => ({
			...base,
			backgroundColor: state.isSelected ? (theme === "dark" ? "#64748b" : "#3b82f6") : theme === "dark" ? "#4b5563" : "#fff",
			borderColor: theme === "dark" ? "#3b82f6" : "#fff",
			color: state.isSelected ? (theme === "dark" ? "white" : "white") : theme === "dark" ? "white" : "black",
			cursor: "pointer",
			"&:hover": {
				backgroundColor: theme === "dark" ? "#64748b   " : "#3b82f6",
				color: theme === "dark" ? "white" : "white",
				// transition: "background-color 0.3s ease-in-out",
			},
		}),
		singleValue: (base: any) => ({
			...base,
			color: "inherit",
		}),
		menu: (base: any) => ({
			...base,
			backgroundColor: theme === "dark" ? "#4b5563" : "white",
			zIndex: 9999,
		}),
		menuPortal: (base: any) => ({...base, zIndex: 9999999}),
		placeholder: (base: any) => ({
			...base,
			color: "#94a3b8",
		}),
		container: (base: any) => ({
			...base,
			padding: "1.2px 0 1.2px 0",
		}),
		dropdownIndicator: (base: any) => ({
			...base,
		}),
		clearIndicator: (base: any) => ({
			...base,
			// display:"none"
		}),
		indicatorSeparator: (base: any) => ({
			...base,
			display: "none",
		}),
		input: (base: any) => ({
			...base,
			color: theme === "dark" ? "white" : "black",
		}),
	}
}
