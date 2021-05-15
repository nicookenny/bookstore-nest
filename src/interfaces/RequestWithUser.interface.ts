import { Request } from 'express';
import User from '../entities/User/user.interface';

interface RequestWithUser extends Request {
	user: User;
}

export default RequestWithUser;
