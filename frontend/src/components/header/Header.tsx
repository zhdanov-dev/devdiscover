import stl from './Header.module.scss';
import logo from '../../static/svg/logoHeader.svg';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { removeUser } from '../../store/slices/userSlice';
import { useState } from 'react';

interface HeaderProps {
	email?: string | null;
}

function Header({ email }: HeaderProps) {
	const [logout, setLogout] = useState(false);
	const dispatch = useAppDispatch();

	function logoutHandler() {
		dispatch(removeUser());
	}

	return (
		<header className={stl.container}>
			<img src={logo} alt='' />
			{email && (
				<div className={stl.user}>
					<span onClick={() => setLogout(!logout)}>{email}</span>
					{logout && <span onClick={logoutHandler} className={stl.logout}>{'Выйти'}</span>}
				</div>
			)}
		</header>
	);
}

export default Header;
