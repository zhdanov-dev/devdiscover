import { Navigate, Route, Routes } from 'react-router-dom';
import PreviewPage from './pages/PreviewPage/PreviewPage';
import SingupPage from './pages/SingupPage/SingupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import IntegrationPage from './pages/IntegrationPage/IntegrationPage';
import SetupPage from './pages/SetupPage/SetupPage';
import MainPage from './pages/MainPage/MainPage';

// import * as Sentry from '@sentry/react';

// Sentry.init({
// 	dsn: 'https://3a125da8dacb468b8a521789489fc2e8@o4504841935716352.ingest.sentry.io/4505091339845632',
// 	integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
// 	tracesSampleRate: 1.0,
// 	replaysSessionSampleRate: 0.1,
// 	replaysOnErrorSampleRate: 1.0, 
// });

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
