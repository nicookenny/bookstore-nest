import { Router, Request, Response, NextFunction } from 'express';
import EmailAlreadyInUseException from '../../exceptions/EmailAlreadyInUseException';
import Controller from '../../interfaces/controller.interface';
import userModel from './user.model';

class UserController implements Controller {
	public path = '/users';
	public router = Router();
	private user = userModel;

	constructor() {
		this.initializeRouter();
	}
	private initializeRouter = () => {
		this.router.get(`${this.path}/:id`, this.getUserById);
		this.router.post(`${this.path}`, this.createUser);
	};

	private getUserById = (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
	};

	private createUser = async (req: Request, res: Response, next: NextFunction) => {
		const { user } = req.body;
		const existingUser = await this.user.findOne({
			email: user.email,
		});

		if (existingUser) {
			throw new EmailAlreadyInUseException(user.email);
		}

		const userCreated = await this.user.create(user);
		
		res.status(200).send({
			user: { ...userCreated, image: userCreated.image.toString('ascii') },
		});
	};
}

export default UserController;
