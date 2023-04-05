import { Navigate, Route, Routes } from 'react-router-dom';

import PreviewPage from './pages/PreviewPage/PreviewPage';
import SingupPage from './pages/SingupPage/SingupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import IntegrationPage from './pages/IntegrationPage/IntegrationPage';
import SetupPage from './pages/SetupPage/SetupPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigate to={'/preview'}></Navigate>} />
			<Route path='/preview' element={<PreviewPage />} />
			<Route path='/signup' element={<SingupPage />} />
			<Route path='/login' element={<LoginPage />} />

			<Route path='/integration' element={<IntegrationPage />} />
			<Route path='/setup' element={<SetupPage />} />
			<Route path='/main' element={<MainPage />} />
		</Routes>
	);
}

export default App;
