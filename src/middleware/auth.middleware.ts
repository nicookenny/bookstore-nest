import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import userModel from '../entities/User/user.model';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationException from '../exceptions/WrongAuthenticationException';
import { verifyToken } from '../utils/jwt';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { cookies } = req;
	try { 
		if (cookies && cookies.Authentication) {
			const {
				user: { _id: id },
			} = await verifyToken(cookies.Authentication);

			const existingUser = await userModel.findById(id);

			if (existingUser) {
				req.user = existingUser;
				next();
			} else {
				throw new WrongAuthenticationException();
			}
		} else {
			throw new AuthenticationTokenMissingException();
		}
	} catch ({ error, status }) {
		return res.status(status).send({
			error,
			status,
		});
	}
};

export default authMiddleware;
