import { useAppSelector } from './redux-hooks'

export function useAuth() {
	const {id, email, token, integration} = useAppSelector(state => state.user)

	return {
		id,
		email,
		token,
		integration,
		isAuth: !!email,
	};
}