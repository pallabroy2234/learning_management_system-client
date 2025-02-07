/** @type {import("tailwindcss").Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: ["class"],
	theme: {
		extend: {
			fontFamily: {
				Poppins: ["Poppins", "sans-serif"], Josefin: ["Josefin Sans", "sans-serif"]
			}, backgroundImage: {
				"gradient-radial": "redial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, vat(--tw-gradient-stops))"
			}, screens: {
				"1000px": "1000px",
				"1100px": "1100px",
				"1200px": "1200px",
				"1300px": "1300px",
				"1500px": "1500px",
				"800px": "800px",
				"700px": "700px",
				"600px": "600px",
				"500px": "500px",
				"400px": "400px",
				"320px": "320px"
			},
			animation: {
				opacityChange: "changeOpacity 8s infinite alternate",
				shake: "shake 0.5s cubic-bezier(0.4, 0, 0.6, 1) both"
			},
			keyframes: {
				changeOpacity: {
					"0%, 100%": {opacity: "1"},
					"16.67%": {opacity: "0.9"},
					"33.33%": {opacity: "0.8"},
					"50%": {opacity: "0.6"},
					"66.67%": {opacity: "0.5"},
					"83.33%": {opacity: "0.4"}
				},
				shake: {
					"0%": {transform: "translateX(0)"},
					"20%": {transform: "translateX(-2px)"},
					"40%": {transform: "translateX(2px)"},
					"60%": {transform: "translateX(-2px)"},
					"80%": {transform: "translateX(2px)"},
					"100%": {transform: "translateX(0)"}
				}
			}
		}
	}, plugins: []
};