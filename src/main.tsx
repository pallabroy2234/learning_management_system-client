import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./context/ThemeProvider.tsx";
import {Toaster} from "react-hot-toast";
import {Provider} from "react-redux";
import store from "./store/store.ts";


// Client ID : 41402644360-fb0f4d009be7fh0tthjh6dnoq9mm2t73.apps.googleusercontent.com
// Client :  secret: GOCSPX - l0ygVyoxQmGfWvKs0IQbzKKnqMjl;

createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
			{/*<GoogleOAuthProvider clientId="41402644360-fb0f4d009be7fh0tthjh6dnoq9mm2t73.apps.googleusercontent.com">*/}
			<App />
			{/*</GoogleOAuthProvider>*/}
			<Toaster reverseOrder={false} />
		</ThemeProvider>
	</Provider>
);
