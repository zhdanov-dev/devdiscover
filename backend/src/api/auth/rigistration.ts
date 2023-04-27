import User from '../../models/User';
import { genereteToken, saveToken } from './token';
import bcrypt from 'bcrypt';
import error from '../error/error';
import express from 'express';

const router = express.Router();

/**
 * Функция авторизации
 * @param {string} username - Имя пользователя
 * @param {string} email - Email пользователя
 * @param {string} password - Пароль
 * Провнряем не зарегестрирован ли пользователь, если нет то хешируем пароль и создаем запись в бд,
 * также создаем пару токенов и возвращаем AccessToken на клиент
 */

router.post('/', async (request, response, next) => {
	try {
		const { email, password, sub } = request.body;
		let candidate;
		if (sub) {
			candidate = await User.findOne({ where: { sub: sub } });
		} else if (!email || !password) {
			return next(error.badRequest('Некорректный email или password!'));
		} else candidate = await User.findOne({ where: { email: email } });
		if (candidate && sub) {
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
				slug: candidate.externalSlug,
			});
		}
		else if (!candidate) {
			let user;
			if (sub) {
				user = await User.create({
					email: email,
					sub: sub,
				});
			} else {
				const hashpass = await bcrypt.hash(password, 5);
				user = await User.create({
					email: email,
					password: hashpass,
				});
			}
			const tokens = genereteToken(user.id, email);
			await saveToken(user.id, tokens.refreshToken);
			response.cookie('refreshToken', tokens.refreshToken, {
				maxAge: 15 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return response
				.status(200)
				.json({ id: user.id, email: email, token: tokens.accessToken });
		} else {
			return next(error.badRequest('Пользователь уже существует!'));
		}
	} catch (error) {
		console.log(error);
	}
});

export default router;
