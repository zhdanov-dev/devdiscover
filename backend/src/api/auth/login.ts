import User from '../../models/User';

import bcrypt from 'bcrypt';
import error from '../error/error';

import express from 'express';
import { findToken, genereteToken, saveToken, validateRefresh } from './token';

const router = express.Router();

/**
 * Функция авторизации
 * @param {string} password - Пароль
 * @param {string} email - Email пользователя
 */

router.post('/', async (request, response, next) => {
	try {
		const { password, email } = request.body;
		if (!email || !password) {
			return next(error.badRequest('Некорректный email или password!'));
		}
		const candidate = await User.findOne({ where: { email: email } });
		if (candidate) {
			let comppass = bcrypt.compareSync(password, candidate.password);
			if (!comppass) {
				return next(error.internal('Указан неверный пароль!'));
			} else {
				const tokens = genereteToken(candidate.id, email);
				await saveToken(candidate.id, tokens.refreshToken);
				response.cookie('refreshToken', tokens.refreshToken, {
					maxAge: 15 * 24 * 60 * 60 * 1000,
					httpOnly: true,
				});
				return response.status(200).json({
					id: candidate.id,
					email: candidate.email,
					token: tokens.accessToken,
					slug: candidate.externalSlug
				});
			}
		} else {
			return next(error.internal('Пользователь не найден!'));
		}
	} catch (error) {
		console.log(error);
	}
});

router.get('/refresh', async (request, response, next) => {
	try {
		const { refreshToken } = request.cookies;
		if (!refreshToken)
			return next(error.unauthorized('Пользователь не авторизован!'));
		const userData = validateRefresh(refreshToken); // валидируем токен
		const token = await findToken(refreshToken);
		if (!userData || !token)
			return next(error.internal('Отсутсвует токен или userdata!'));
		const user = await User.findOne({ where: { id: userData.id } });
		const tokens = genereteToken(user.id, user.email);
		await saveToken(user.id, tokens.refreshToken);
		response.cookie('refreshToken', tokens.refreshToken, {
			maxAge: 15 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		return response.json(tokens.accessToken);
	} catch (error) {
		console.log(error);
	}
});

export default router;
