import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { makeBackendRequest } from '../../../util';
import { setUser } from '../../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';

export default function GoogleAuth(props) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	async function handleCallbackResponse(response) {
		const user = jwt_decode(response.credential);
		makeBackendRequest('/api/auth/registration/', 'POST', {
			email: user.email,
			sub: user.sub,
		})
			.then(response => {
				dispatch(
					setUser({
						id: response.data.id,
						email: response.data.email,
						token: response.data.token,
						integration: false,
					})
				);
				navigate('/integration');
			})
			.catch(error => console.log(error.response.data.message));
	}

	useEffect(() => {
		/* global google */
		google.accounts.id.initialize({
			client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
			callback: handleCallbackResponse,
		});

		google.accounts.id.renderButton(document.getElementById('googleSignIn'), {
			theme: 'outline',
			width: 480,
			height: 45,
			type: 'standard',
			size: 'large',
		});
	}, []);

	return <div className='auth-google' id='googleSignIn'></div>;
}
