import error from '../error/error';
import { Request, Response, NextFunction } from 'express'

export default function (err: { status: number; message: string; }, req: Request, res: Response, next: NextFunction) {
	if (err instanceof error) {
		return res.status(err.status).json({ message: err.message });
	}
	return res.status(500).json({ message: 'Непредвиденная ошибка!' });
}
