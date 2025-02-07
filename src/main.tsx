import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./context/ThemeProvider.tsx";
import {Toaster} from "react-hot-toast";


createRoot(document.getElementById("root")!).render(
	<ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
		<App />
		<Toaster reverseOrder={false} />
	</ThemeProvider>
);
