import HttpException from './HttpException';

class EmailAlreadyInUseException extends HttpException {
	constructor(email) {
		super(401, `The email ${email} already in use.`);
	}
}

export default EmailAlreadyInUseException;
