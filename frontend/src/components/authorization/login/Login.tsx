import stl from './Login.module.scss';
import logo70 from '../../../static/svg/logo70.svg';
import mail from '../../../static/svg/mail.svg';
import pass from '../../../static/svg/pass.svg';
import { SyntheticEvent, useState } from 'react';
import { makeBackendRequest } from '../../../util';
import { setUser } from '../../../store/slices/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function authHandler(event: SyntheticEvent, email: string, password: string) {
		event.preventDefault();
		makeBackendRequest('/api/auth/login/', 'POST', {
			email: email,
			password: password,
		})
			.then(response => {
				console.log(response.data);
				dispatch(
					setUser({
						id: response.data.id,
						email: response.data.email,
						token: response.data.token,
						integration: response.data.slug
					})
				);
				navigate('/integration');
			})
			.catch(error => setError(error.response.data.message));
	}

	return (
		<form className={stl.form__container}>
			<div className={stl.logo__container}>
				<img src={logo70} alt='' />
			</div>
			<div className={stl.title__container}>
				<p className={stl.title}>Войдите в свой аккаунт</p>
				<span className={stl.subtitle}>
					 DevDiscover - метапоисковая система для DevOps инженера 
				</span>
			</div>
			<br />
			{error && (
				<div className={stl.error}>
					<span>{error}</span>
				</div>
			)}
			<div className={stl.input__container}>
				<label className={stl.input__label} htmlFor='email_field'>
					Email
				</label>
				<img className={stl.icon} src={mail} alt='' />
				<input
					placeholder='name@mail.com'
					type='email'
					className={stl.input__field}
					value={email}
					onChange={e => {
						setEmail(e.target.value);
						setError('');
					}}
				/>
			</div>
			<div className={stl.input__container}>
				<label className={stl.input__label} htmlFor='password_field'>
					Пароль
				</label>
				<img className={stl.icon} src={pass} alt='' />
				<input
					placeholder='password'
					type='password'
					className={stl.input__field}
					value={password}
					onChange={e => {
						setPassword(e.target.value);
						setError('');
					}}
				/>
			</div>
			<button
				onClick={e => authHandler(e, email, password)}
				className={stl.signin__btn}
			>
				<span>Войти</span>
			</button>
			<div className={stl.login}>
				<span>Нет учетной записи? </span>
				<NavLink to={'/signup'}>
					<span>Зарегистрироваться</span>
				</NavLink>
			</div>
		</form>
	);
}

export default Login;
