import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect, lazy, Suspense, useState} from "react";
import store from "./store/store.ts";
import {initializeAuth} from "./store/features/auth/authApi.ts";
import Loader from "./components/shared/Loader.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import "react-image-crop/dist/ReactCrop.css";


// * Import all Route components
const Home = lazy(() => import("./page/public/Home.tsx"));
const Profile = lazy(() => import("./page/public/Profile.tsx"));
const Layout = lazy(() => import("./components/layout/PublicLayout.tsx"));
const AuthFailure = lazy(() => import("./page/public/AuthFailure.tsx"));
const AuthSuccess = lazy(() => import("./page/public/AuthSuccess.tsx"));


const App = () => {
	const [loader, setLoader] = useState<boolean>(true);


	useEffect(() => {
		const initializeAuthState = async () => {
			try {
				setLoader(true);
				await initializeAuth(store);
			} finally {
				setLoader(false);
			}
		};
		initializeAuthState();
	}, []);


	return loader ? (
		<Loader />
	) : (
		<BrowserRouter>
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route>
						{/*  Frontend Routes */}
						<Route element={<Layout />}>
							<Route index={true} element={<Home />} />
							<Route path="/auth/failure" element={<AuthFailure />} />
							<Route path="/auth/success" element={<AuthSuccess />} />

							{/*	Only Logged in user Routes */}
							<Route element={<ProtectedRoute />}>
								<Route path="/profile" element={<Profile />} />
							</Route>
						</Route>

						{/*	 Dashboard */}

					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
};
export default App;
