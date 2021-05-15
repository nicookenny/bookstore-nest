import HttpException from './HttpException';

class UsernameAlreadyInUseException extends HttpException {
	constructor(username: string) {
		super(401, `The username ${username} already in use`);
	}
}

export default UsernameAlreadyInUseException;
