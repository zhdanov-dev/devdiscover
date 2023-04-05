import stl from './Header.module.scss'
import logo from '../../static/svg/logoHeader.svg'
import { useAppDispatch } from '../../hooks/redux-hooks';
import { removeUser } from '../../store/slices/userSlice';

interface HeaderProps {
	email?: string | null;
}

function Header({email}: HeaderProps) {

	const dispatch = useAppDispatch();

	function logoutHandler() {
		dispatch(
			removeUser()
		);
	}

	return (
		<header className={stl.container}>
			<img src={logo} alt="" />
			{email && <div className={stl.user}>
				<span onClick={logoutHandler}>{email}</span>
			</div>}
		</header>
	);
}

export default Header;
