import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

export const generateToken = async (information) => {
	try {
		const token = await jwt.sign({ user: information }, process.env.JWT_SECRET);
		return token;
	} catch (error) {
		console.log(error.message);
	}
};

export const verifyToken = async (token) => {
	const information = await jwt.verify(token, process.env.JWT_SECRET);

	return information;
};
