import express from 'express';
import { removeToken } from './token';

const router = express.Router();

/**
 * Функция выхода
 * Удаляем refresh токен из бд и очищаяем куки
 */

router.post('/', async (request, response) => {
	try {
		const { refreshToken } = request.cookies;
		await removeToken(refreshToken);
		response.clearCookie('refreshToken');
		return response.json('logout');
	} catch (error) {
		console.log(error);
	}
});

export default router;