import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout/Layout.tsx";
import Home from "./page/Home.tsx";
import {useEffect} from "react";
import {initializeAuth} from "./store/features/api.ts";
import store from "./store/store.ts";


const App = () => {

	useEffect(() => {
		(async () => await initializeAuth(store))();
	}, []);


	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index={true} element={<Home />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
export default App;
