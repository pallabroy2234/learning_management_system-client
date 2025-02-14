import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout/Layout.tsx";
import Home from "./page/Home.tsx";
import AuthFailure from "./page/AuthFailure.tsx";
import AuthSuccess from "./page/AuthSuccess.tsx";
import {useEffect} from "react";
import store from "./store/store.ts";
import {initializeAuth} from "./store/features/auth/authApi.ts";


const App = () => {
	useEffect(() => {
		(async () => await initializeAuth(store))();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index={true} element={<Home />} />
					<Route path="/auth/failure" element={<AuthFailure />} />
					<Route path="/auth/success" element={<AuthSuccess />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
export default App;
