import Login from '../../components/authorization/login/Login';
import stl from './LoginPage.module.scss';

function LoginPage() {
	return (
		<div className={stl.container}>
			<Login />
		</div>
	);
}

export default LoginPage;
