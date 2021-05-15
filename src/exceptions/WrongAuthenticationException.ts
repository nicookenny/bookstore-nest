import HttpException from './HttpException';

class WrongAuthenticationException extends HttpException {
  constructor() {
    super(401, 'Wrong authentication token');
  }
}

export default WrongAuthenticationException;