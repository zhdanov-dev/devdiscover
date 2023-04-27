import stl from './Singup.module.scss';
import logo70 from '../../../static/svg/logo70.svg';
import mail from '../../../static/svg/mail.svg';
import pass from '../../../static/svg/pass.svg';
import { SyntheticEvent, useState } from 'react';
import { makeBackendRequest, makeValidate } from '../../../util';
import { setUser } from '../../../store/slices/userSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import GoogleAuth from '../oauth/GoogleAuth';

function Singup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [retypePassword, setRetypePassword] = useState('');
	const [error, setError] = useState('');

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function authHandler(
		event: SyntheticEvent,
		email: string,
		password: string,
		retypePassword: string
	) {
		event.preventDefault();
		const valid = makeValidate(email, password, retypePassword);
		setError(valid);
		if (!valid) {
			makeBackendRequest('/api/auth/registration/', 'POST', {
				email: email,
				password: password,
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
				.catch(error => setError(error.response.data.message));
		}
	}

	const location = useLocation();

	return (
		<form className={stl.form__container}>
			<div className={stl.logo__container}>
				<img src={logo70} alt='' />
			</div>
			<div className={stl.title__container}>
				<p className={stl.title}>Создайте свой аккаунт</p>
				<span className={stl.subtitle}>
					Начните работу с нашим приложением, просто создайте учетную запись и
					наслаждайтесь процессом.
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
					id='email_field'
					value={email}
					onChange={e => {
						setEmail(e.target.value);
						setError('');
					}}
					required
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
					required
				/>
			</div>
			<div className={stl.input__container}>
				<label className={stl.input__label} htmlFor='password_field'>
					Повторите пароль
				</label>
				<img className={stl.icon} src={pass} alt='' />
				<input
					placeholder='password'
					type='password'
					className={stl.input__field}
					value={retypePassword}
					onChange={e => {
						setRetypePassword(e.target.value);
						setError('');
					}}
					required
				/>
			</div>
			<button
				onClick={e => authHandler(e, email, password, retypePassword)}
				className={stl.signin__btn}
			>
				<span>Создать учетную запись</span>
			</button>
			<div className={stl.separator}>
				<hr className={stl.line} />
				<span>Или</span>
				<hr className={stl.line} />
			</div>
			{/* <button className={stl.signin__ggl}>
				<img src={google} alt='' />
				<span>Войти с помощью Google</span>
			</button> */}
			<GoogleAuth form={location.state?.from?.pathname || '/'} />
			<div className={stl.login}>
				<span>Уже есть учетная запись? </span>
				<NavLink to={'/login'}>
					<span>Войти</span>
				</NavLink>
			</div>
		</form>
	);
}

export default Singup;
