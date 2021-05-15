interface User {
	email: string;
	username: string;
	password: string;
	firstname: string;
	lastname: string;
	birthdate: Date;
	uniqueHash: string;
	image: Buffer | string;
	address: {
		street: string;
		number: number;
		postalcode: number;
	};
}

export default User;
