import axios from 'axios';

export async function makeBackendRequest(
	path: string,
	method: string,
	data?: Record<string, any>
) {
	const baseEndpoint = 'http://localhost:5000';
	const res = await axios({
		method: method,
		url: `${baseEndpoint}${path}`,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		},
		data: JSON.stringify(data),
	})
  return res
}

export function makeValidate(email: string, password: string, retypePassword: string): string {
	const reEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
	const rePass = /^.{8,}$/;
	if (!email || !password || !retypePassword) return 'Заполните все поля'
	else if (!reEmail.test(email)) return 'Некорректный email';
	else if (!rePass.test(password)) return 'Пароль должен быть не короче 8 символов';
	else if (password !== retypePassword) return 'Пароли не совпадают';
	return '';
}

export function interpretRequest(request: string) {
	const arrOfWords = request.split(' ');
}
