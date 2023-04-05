import jwt from 'jsonwebtoken';
import Token from '../../models/Token';

/**
 * Генерация пары токенов
 * @param {string} id - Id пользователя
 * @param {string} email - Email пользователя
 * Пара токенов access, refresh
 */

export function genereteToken(id: number, email: string) {
	try {
		const accessToken = jwt.sign({ id: id, email }, process.env.SECRET_KEY, {
			expiresIn: '24h',
		});
		const refreshToken = jwt.sign({ id: id, email }, process.env.REFRESH_KEY, {
			expiresIn: '15d',
		});
		return { accessToken, refreshToken };
	} catch (error) {
		console.log(error);
	}
}

/**
 * Сохранение refresh токена в базу данных
 * @param {string} userId - Id пользователя
 * @param {string} refreshToken - refresh токен
 * Перезаписываем токен в бд, если такой таблицы нет, то создаем ее
 */

export async function saveToken(userId: number, refreshToken: string) {
	try {
		const tokenData = await Token.findOne({ where: { userId: userId } });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		const token = await Token.create({
			userId: userId,
			refreshToken: refreshToken,
		});
		return token;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Удаление refresh токена из базы данных
 * @param {string} refreshToken - refresh токен
 * Удаляем таблицу с refresh токеном из бд
 */

export async function removeToken(refreshToken: string) {
	try {
		const tokenData = await Token.destroy({
			where: { refreshToken: refreshToken },
		});
		return tokenData;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Ищем токен в базе данных
 * @param {string} refreshToken - refresh токен
 */

export async function findToken(refreshToken: string) {
	try {
		const tokenData = await Token.findOne({
			where: { refreshToken: refreshToken },
		});
		return tokenData;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Валидируем токены
 * @param {string} token - access/refresh токен
 */

export function validateAccess(token: string) {
	try {
		const userData = jwt.verify(token, process.env.SECRET_KEY);
		return userData;
	} catch (error) {
		return error;
	}
}

export function validateRefresh(token: string) {
	try {
		const userData = jwt.verify(token, process.env.REFRESH_KEY);
		return userData;
	} catch (error) {
		return error;
	}
}
