import Setup from '../../components/setup/Setup';
import { useAuth } from '../../hooks/use-auth';
import { Navigate, useSearchParams } from 'react-router-dom';
import { makeBackendRequest } from '../../util';
import { removeUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/redux-hooks';

const REDIRECT_TIMEOUT = 3 * 1000;

function SetupPage() {
	const dispatch = useAppDispatch();
	const { isAuth, id } = useAuth();
	const [searchParams] = useSearchParams();

	async function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		const payload = {
			code: searchParams.get('code'),
			installationId: searchParams.get('installationId'),
			sentryOrgSlug: searchParams.get('orgSlug'),
			userId: id,
		};
		const res = await makeBackendRequest('/api/sentry/setup/', 'POST', payload);
		setTimeout(() => (window.location = res.data.redirectUrl), REDIRECT_TIMEOUT);
		dispatch(removeUser());
	}

	return isAuth ? (
		<>
			<Setup submitIntagration={(e) => handleSubmit(e)}/>
		</>
	) : (
		<Navigate to={'/signup'}></Navigate>
	);
}

export default SetupPage;
