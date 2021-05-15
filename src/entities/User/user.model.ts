import * as mongoose from 'mongoose';
import ProfilePicture from '../../assets/ProfilePicture';
import User from './user.interface';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		lowercase: true,
		trim: true,
		unique: true,
	},
	username: {
		type: String,
		lowercase: true,
		trim: true,
		unique: true,
	},
	firstname: {
		type: String,
		trim: true,
	},
	lastname: {
		type: String,
		trim: true,
	},
	password: {
		type: String,
		trim: true,
		minlength: 8,
	},
	birthdate: {
		type: Date,
	},
	uniqueHash: {
		type: String,
		trim: true,
		default: 0,
	},
	image: {
		type: Buffer,
		default: ProfilePicture,
	},
	address: {
		street: {
			type: String,
			trim: true,
		},
		number: {
			type: Number,
			trim: true,
		},
		postalcode: {
			type: Number,
			trim: true,
		},
	},
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
