import * as mongoose from 'mongoose';
import mongoPagination from 'mongo-cursor-pagination';
import passportLocalMongoose from 'passport-local-mongoose';
import { Schema } from 'mongoose';

interface UserModel {
	email?: String;
	nameAndSurname?: String;
	password?: String;
	advHistory?: [];
	advActive?: [];
	paymentMethod?: String;
	cardNumber?: Object;
	opinionsAsOrdered?: Object;
	opinionsAsDelivery?: Object;
	accountStatus?: Boolean;
	localization?: String;
	regulationsAcceptance?: Boolean;
}

const UserModel: Schema = new mongoose.Schema(
	{
		email: {
			required: true,
			trim: true,
			type: String
		},
		nameAndSurname: {
			required: true,
			trim: true,
			type: String
		},
		password: {
			type: String
		},
		advHistory: {
			type: Array
		},
		advActive: {
			type: Array
		},
		paymentMethod: {
			type: String
		},
		cardNumber: {
			type: Object
		},
		opinionsAsOrdered: {
			type: Object
		},
		opinionsAsDelivery: {
			type: Object
		},
		accountStatus: {
			type: Boolean
		},
		localization: {
			type: String
		},
		regulationsAcceptance: {
			type: Boolean
		}
		// avatar: {
		//   type: Image
		// }
	},
	{
		timestamps: true
	}
);

UserModel.plugin(mongoPagination.mongoosePlugin);
UserModel.plugin(passportLocalMongoose, {
	usernameField: 'email'
});

export default mongoose.model('UserModel', UserModel);
