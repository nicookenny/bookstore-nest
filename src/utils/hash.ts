import * as bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

export const checkPassword = async (user, password) => {
	return await bcrypt.compare(`${password}`, user.password);
};

export const hashString = async (string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(string, salt);
};

export const checkString = async (stringhashed, string) => {
	return await bcrypt.compare(`${stringhashed}`, string);
};

