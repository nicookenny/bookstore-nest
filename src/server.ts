import 'dotenv/config';
import App from './app';
import AuthController from './entities/Auth/auth.routes';
import UserController from './entities/User/user.routes';
import validateEnv from './utils/validate-env';

validateEnv();

const app = new App([new AuthController(), new UserController()]);

app.listen();
