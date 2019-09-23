import { Router } from 'express';
import { Controller } from '../controllers/controller';
import { Errors } from '../middleware/error';
import { Validate } from '../middleware/validate';
import passport from 'passport';

export default () => {
	const api = Router();

	api.post('/', Validate.isDataValid, Errors.catchAsync(Controller.add));
	api.post(
		'/login',
		passport.authenticate('local', {
			session: false
		}),
		Errors.catchAsync(Controller.login)
	);
	api.get('/', Validate.checkToken, Validate.getQueryString, Errors.catchAsync(Controller.getAll));
	api.get(
		'/:id',
		Validate.checkToken,
		Validate.getQueryString,
		Validate.getQueryString,
		Errors.catchAsync(Controller.get)
	);
	api.put('/:id', Validate.checkToken, Errors.catchAsync(Controller.update));
	api.delete('/:id', Validate.checkToken, Errors.catchAsync(Controller.remove));

	return api;
};
