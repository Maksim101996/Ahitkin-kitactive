import { Navigate, Route, Routes } from "react-router-dom";
import { AuthService } from "./API/AuthService";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";



function App() {
	return (
		<div className="app">
			<Routes>
				<Route path="/auth" element={<Auth />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/*" element={<Navigate to={'/auth'} />} />
			</Routes>
		</div>
	);
}

export default App;
