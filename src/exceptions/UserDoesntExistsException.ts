import HttpException from './HttpException';

class UserDoesntExistsException extends HttpException {
	constructor() {
		super(401, "User doesn't exists");
	}
}

export default UserDoesntExistsException;
