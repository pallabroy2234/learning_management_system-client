import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./context/ThemeProvider.tsx";


createRoot(document.getElementById("root")!).render(
	<ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
		<App />
	</ThemeProvider>
);
