import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';

class App {
	public app: express.Application;

	constructor(controllers: Controller[]) {
		this.app = express();

		this.initializeMiddleware();
		this.initializeErrorHandling();
		this.connectToDatabase();
		this.initializeControllers(controllers);
	}

	public listen = () => {
		this.app.listen(process.env.PORT, () => {
			console.log(`Server listening on http://localhost:${process.env.PORT}`);
		});
	};

	public getServer = () => {
		return this.app;
	};

	private initializeControllers = (controllers) => {
		controllers.forEach((controller) => {
			this.app.use('/', controller.router);
		});
	};

	private initializeMiddleware = () => {
		this.app.use(bodyParser.json());
		this.app.use(cookieParser());
	};

	private initializeErrorHandling = () => {
		this.app.use(errorMiddleware);
	};

	private connectToDatabase = () => {
		const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

		mongoose
			.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				console.log(`Database connected`);
			})
			.catch((error) => {
				console.log(error);
			});
	};
}

export default App;
