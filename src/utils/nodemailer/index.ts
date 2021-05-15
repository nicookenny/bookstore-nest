import * as nodemailer from 'nodemailer';
import User from '../../entities/User/user.interface';
import recoverPasswordEmail from './recoverpassword.nodemailer';
import welcomeEmail from './welcome.nodemailer';

class NodemailerSerivce {
	private mailer = nodemailer;
	private transporter = null;

	constructor() {
		this.transporter = this.mailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: process.env.NODEMAILER_USER,
				pass: process.env.NODEMAILER_PASSWORD,
			},
		});
	}

	sendWelcomeEmail = async (user: User) => {
		try {
			this.transporter.sendMail({
				from: 'La mejor empresa del mundo!',
				to: user.email,
				subject: `Bienvenido ${user.firstname} a la mejor empresa del planeta!`,
				html: welcomeEmail(user),
			});
		} catch (error) {
			console.log(error);
		}
	};

	sendRecoverPasswordEmail = async (user) => {
		try {
			this.transporter.sendMail({
				from: 'La mejor empresa del mundo!',
				to: user.email,
				subject: `Correo para la recuperación de tu contraseña`,
				html: recoverPasswordEmail(user),
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export default NodemailerSerivce;
