import { Request, Response, NextFunction } from 'express';
import { Respond } from '../helpers/respond';

/**
 * ***Class to handle errors***
 * **Use that as middleware**
 * *class methods: notFound() catchAsync() catchErrors()*
 */
export class Errors {
	/**
	 * ***Method notFound() from Errors class***
	 * **Use that as middleware call**
	 * *This method make error message and status*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static notFound(req: Request, res: Response, next: NextFunction) {
		const err = new Error('404 page not found');
		err.status = 400;
		next(err);
	}

	/**
	 * ***Method catchAsync() from Errors class***
	 * **Use that as middleware function wrapper**
	 * *This method catch async functions/methods errors and return it as catch Promise*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static catchAsync(fn: Function) {
		return (req: Request, res: Response, next: NextFunction) => {
			fn(req, res, next).catch((err: any) => next(err));
		};
	}

	/**
	 * ***Method catchErrors() from Errors class***
	 * **Use that as middleware call**
	 * *This method make error respond to user*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static catchErrors(err: any, req: Request, res: Response, next: NextFunction) {
		const respondData = {
			status: err.status || 500,
			serverStatus: false,
			message: 'Błąd funkcji asynchronicznej servera',
			dataRequest: req.body,
			dataRespond: req.body,
			err: err.message,
			extraInfo: 'Coś nie poszło po naszej myśli',
			extraInfoTitle: 'Błąd backendu'
		};
		return new Respond(req, res, next, respondData).sendRespond(req, res, next, respondData);
	}
}
