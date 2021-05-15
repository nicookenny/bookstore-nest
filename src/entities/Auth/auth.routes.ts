import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../interfaces/controller.interface';
import userModel from '../User/user.model';
import { checkPassword, checkString, hashPassword, hashString } from '../../utils/hash';
import { generateToken, verifyToken } from '../../utils/jwt';
import { randomString } from '../../utils/randomwords';
import UsernameAlreadyInUseException from '../../exceptions/UsernameAlreadyInUseException';
import EmailAlreadyInUseException from '../../exceptions/EmailAlreadyInUseException';
import UserDoesntExistsException from '../../exceptions/UserDoesntExistsException';
import WrongCredentialsException from '../../exceptions/WrongCredentialsException';
import User from '../User/user.interface';
import authMiddleware from '../../middleware/auth.middleware';
import NodemailerSerivce from '../../utils/nodemailer';
import WrongAuthenticationException from '../../exceptions/WrongAuthenticationException';

class AuthController implements Controller {
	public path = '/auth';
	public router = Router();
	private user = userModel;
	private mailService = new NodemailerSerivce();

	constructor() {
		this.initializeRouter();
	}

	private initializeRouter = () => {
		this.router.post(`${this.path}/signup`, this.signup);
		this.router.post(`${this.path}/signin`, this.signin);
		this.router.post(`${this.path}/recoverpassword`, this.getrecoverpassword);
		this.router.put(`${this.path}/recoverpassword/`, this.recoverpassword);
		this.router.put(`${this.path}/changepassword`, authMiddleware, this.changepassword);
	};

	private signup = async (req: Request, res: Response, next: NextFunction) => {
		const { email, username, password } = req.body;
		const { firstname, lastname, birthdate } = req.body;
		const {
			address: { street, number, postalcode },
		} = req.body;
		try {
			const existingEmail = await this.user.findOne({
				email,
			});
			const existingUsername = await this.user.findOne({
				username,
			});

			if (existingEmail) {
				throw new EmailAlreadyInUseException(email);
			}

			if (existingUsername) {
				throw new UsernameAlreadyInUseException(username);
			}

			const userCreated = await this.user.create({
				email,
				password,
				username,
				firstname,
				lastname,
				birthdate: new Date(birthdate),
				address: {
					street,
					number,
					postalcode,
				},
			});

			userCreated.password = await hashPassword(userCreated.password);
			const userHashed = await userCreated.save();

			await this.mailService.sendWelcomeEmail(userHashed);

			return res.status(200).send(userHashed);
		} catch (error) {
			res.status(error.status).send({
				error: error.message,
				status: error.status,
			});
		}
	};

	private signin = async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		try {
			const existingUser = await this.user.findOne({
				email,
			});

			if (!existingUser) {
				throw new UserDoesntExistsException();
			}

			const isValid = await checkPassword(existingUser, password);

			existingUser.password = undefined;

			if (isValid) {
				const token = await generateToken(existingUser);
				res.cookie('Authentication', token, {
					httpOnly: true,
					maxAge: 36000,
				});
				return res.status(200).send({
					user: existingUser,
					token,
				});
			} else {
				throw new WrongCredentialsException();
			}
		} catch ({ message, status }) {
			return res.status(status).send({
				message,
				status,
			});
		}
	};

	private changepassword = async (req: Request, res: Response, next: NextFunction) => {
		const { password: newPassword } = req.body;
		const { user } = req;

		try {
			if (!user) {
				throw new WrongCredentialsException();
			}

			const hashedNewPassword = await hashPassword(newPassword);

			await user.updateOne({
				password: hashedNewPassword,
			});

			res.status(200).send({
				message: 'Password has been updated',
			});
		} catch ({ status, message }) {
			res.status(status).send({
				message,
				status,
			});
		}
	};

	private getrecoverpassword = async (req: Request, res: Response, next: NextFunction) => {
		const { email } = req.body;

		const existingUser = await this.user.findOne({
			email,
		});
		try {
			if (!existingUser) {
				throw new WrongAuthenticationException();
			}

			const uniqueHash = await hashString(await randomString());
			await this.user.updateOne({
				uniqueHash,
			});
			await this.mailService.sendRecoverPasswordEmail(existingUser);

			res.status(200).send({
				message: 'Email sent',
			});
		} catch ({ status, error }) {
			res.status(status).send({
				error,
				status,
			});
		}
	};

	private recoverpassword = async (req: Request, res: Response, next: NextFunction) => {
		const { email, password, hash } = req.body;
		try {
			const existingUser = await this.user.findOne({
				email,
			});
			if (!existingUser) {
				throw new WrongAuthenticationException();
			}

			if (existingUser.uniqueHash === hash) {
				await existingUser.updateOne({
					password: await hashPassword(password),
					uniqueHash: '0',
				});
				res.status(201).send({
					message: 'Password changed successfully',
				});
			} else {
				throw new WrongAuthenticationException();
			}
		} catch ({ error, status }) {
			res.status(status).send({
				error,
				status,
			});
		}
	};
}
export default AuthController;
