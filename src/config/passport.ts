import passport from 'passport';
import UserModel from '../models/user';
import passportJWT from 'passport-jwt';
import { verify } from 'crypto';

const JWStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

function verifyCallback(payload, done) {
	return UserModel.findOne({
		_id: payload.id
	})
		.then((user) => {
			return done(null, user);
		})
		.catch((err) => {
			return done(err);
		});
}

export default () => {
	const config = {
		jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET
	};
	passport.use(UserModel.createStrategy());
	passport.use(new JWStrategy(config, verifyCallback));
};
