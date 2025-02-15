import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect, lazy, Suspense, useState} from "react";
import store from "./store/store.ts";
import {initializeAuth, useGetCurrentUserQuery} from "./store/features/auth/authApi.ts";
import Loader from "./components/Loader.tsx";


// * Import all Route components
const Home = lazy(() => import("./page/Home.tsx"));
const Layout = lazy(() => import("./Layout/Layout.tsx"));
const AuthFailure = lazy(() => import("./page/AuthFailure.tsx"));
const AuthSuccess = lazy(() => import("./page/AuthSuccess.tsx"));


const App = () => {
	const {isLoading} = useGetCurrentUserQuery(undefined, {skip: true});
	const [loader, setLoader] = useState<boolean>(false);

	// * Initialize authentication state on app load
	useEffect(() => {
		(async () => await initializeAuth(store))();
	}, []);

	// * Show loader while fetching user data
	useEffect(() => {
		isLoading ? setLoader(true) : setLoader(false);
	}, [isLoading]);


	return loader ? (
		<Loader />
	) : (
		<BrowserRouter>
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route element={<Layout />}>
						<Route index={true} element={<Home />} />
						<Route path="/auth/failure" element={<AuthFailure />} />
						<Route path="/auth/success" element={<AuthSuccess />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};
export default App;
