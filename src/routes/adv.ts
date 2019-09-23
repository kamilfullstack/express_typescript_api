import { Router } from 'express';
import { Controller } from '../controllers/controller';
import { Errors } from '../middleware/error';
import { Validate } from '../middleware/validate';

export default () => {
	const api = Router();
	api.post('/', Validate.checkToken, Errors.catchAsync(Controller.add()));
	api.get('/', Validate.checkToken, Validate.getQueryString, Errors.catchAsync(Controller.getAll));
	api.get('/:id', Validate.checkToken, Validate.getQueryString, Errors.catchAsync(Controller.get));
	api.put('/:id', Validate.checkToken, Errors.catchAsync(Controller.update));

	return api;
};
