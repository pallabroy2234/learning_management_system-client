import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout/Layout.tsx";


const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<Layout />}>
					<Route index={true} element={<h1>Home</h1>} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
export default App;
