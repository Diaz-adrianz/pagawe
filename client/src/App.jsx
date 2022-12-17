import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import AdminPage from './pages/admin';
import Homepage from './pages/home';
import FormUser from './pages/formuser';
import UserPage from './pages/user';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Homepage />}></Route>
			<Route path="/login" element={<LoginPage />}></Route>
			<Route path="/user" element={<UserPage />}></Route>
			<Route path="/admin" element={<AdminPage />}></Route>
			<Route path="/formuser/:id" element={<FormUser />}></Route>
		</Routes>
	);
}

export default App;

