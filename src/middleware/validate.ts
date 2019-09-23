import UserModel from '../models/user';
import qs from 'qs';
import _ from 'lodash';
import { Request, NextFunction } from 'express';
import passport from 'passport';
import { Validation } from '../helpers/validation';
import { Respond } from '../helpers/respond';

/**
 * ***Class to validate data***
 * **Use that as middleware call**
 * *class methods: checkToken() isDataValid() getQuerystring()*
 */
export class Validate {
	/**
	 * ***Method checkToken() from Validate class***
	 * **Use that as before middleware call**
	 * *This method check if JWT is valid*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static async checkToken(req: Request, res: Respond, next: NextFunction) {
		return passport.authenticate('jwt', {
			session: false
		})(req, res, next);
	}

	/**
	 * ***Method isDataValid() from Validate class***
	 * **Use that as before middleware call**
	 * *This method check if request data is valid for database*
	 * @param req **Object -> user request** 
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static async isDataValid(req: Request, res: Respond, next: NextFunction) {
		new Validation(req, res, next).dataValidation(req, res, next);
	}

	/**
	 * ***Method getQueryString() from Validate class***
	 * **Use that as before middleware call**
	 * *This method get query string from user request*
	 * @param req **Object -> user request** 
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static async getQueryString(req: Request, res: Respond, next: NextFunction) {
		const fullPath = req.originalUrl;
		if (fullPath.includes('users')) {
			const availableFilters = Object.keys(UserModel.schema.paths);
			const filters = qs.parse(req.query);

			req.filters = _.pickBy(filters, (value, key) => availableFilters.indexOf(key) > -1);

			const sort_by: any = {};

			sort_by[req.query.sort_by || 'createdAt'] = req.query.order_by || 'desc';
			req.sort_by = sort_by;

			const offset = parseInt(req.query.offset) || 0;
			const per_page = parseInt(req.query.per_page) || 2;

			req.offset = offset;
			req.per_page = per_page;
		}
		next();
	}
}
