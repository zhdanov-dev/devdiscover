import { NextFunction, Request, Response } from 'express';
import { validateAccess } from '../auth/token';
import apiError from '../error/error';

/**
 * Middleware для проверки токена
 * @param {string} authHeader - хедер с токеном  
 * Проверяем токен и достаем из него id пользователя
 */

export default function (req: Request, res: Response, next: NextFunction) {
	try {
		const authHeader = req.headers.authorization; // есть ли хедер
		if (!authHeader) return next(apiError.unauthorized('Отсутсвует header!'));
		const accessToken = authHeader.split(' ')[1]; // есть ли токен
		if (!accessToken) return next(apiError.unauthorized('Отсутсвует token!'));
		const userData = validateAccess(accessToken); // валидируется ли он
		if (!userData) return next(apiError.unauthorized('Ошибка валидации!'));
		req.body.userId = userData.id; // возвращаем userID
		req.query.userId = userData.id;
		next();
	} catch (error) {
		console.log(error);
	}
};
