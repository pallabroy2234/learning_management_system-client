import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./context/ThemeProvider.tsx";
import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";
import store from "./store/store.ts";


createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
			<App />
			<Toaster reverseOrder={false} />
		</ThemeProvider>
	</Provider>
);
