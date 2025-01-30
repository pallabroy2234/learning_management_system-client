import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout/Layout.tsx";
import Home from "./page/Home.tsx";


const App = () => {
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
