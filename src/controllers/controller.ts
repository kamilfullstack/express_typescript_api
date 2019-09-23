import { User } from '../helpers/user';
import { Request, Response, NextFunction } from 'express';

/**
 * ***Class to control api path***
 * **Use that as middleware call**
 * *class methods: operateController() add() login() getAll() get() update() remove()*
 */
export class Controller {
	/**
	 * ***Method operateController() from Controller class***
	 * **Use that as method call**
	 * *This method check path of request data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static operateController(req: Request, res: Response, next: NextFunction) {
		const path = req.originalUrl;
		return path.includes('users');
	}

	/**
	 * ***Method add() from Controller class***
	 * **Use that as middleware call**
	 * *This method opereate all incoming get data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static async add(req: Request, res: Response, next: NextFunction) {
		if (Controller.operateController(req, res, next)) {
			new User(req, res, next).addUser(req, res, next);
		}
	}

	/**
	 * ***Method login() from Controller class***
	 * **Use that as middleware call**
	 * *This method opereate all incoming login data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static async login(req: Request, res: Response, next: NextFunction) {
		if (Controller.operateController(req, res, next)) {
			new User(req, res, next).loginUser(req, res, next);
		}
	}

	/**
	 * ***Method getAll() from Controller class***
	 * **Use that as middleware call**
	 * *This method opereate all incoming getAll data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static async getAll(req: Request, res: Response, next: NextFunction) {
		if (Controller.operateController(req, res, next)) {
			new User(req, res, next).findUsers(req, res, next);
		}
	}

	/**
	 * ***Method get() from Controller class***
	 * **Use that as middleware call**
	 * *This method opereate all incoming get data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static async get(req: Request, res: Response, next: NextFunction) {
		if (Controller.operateController(req, res, next)) {
			new User(req, res, next).findUser(req, res, next);
		}
	}

	/**
	 * ***Method update() from Controller class***
	 * **Use that as middleware call**
	 * *This method opereate all incoming update data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static async update(req: Request, res: Response, next: NextFunction) {
		if (Controller.operateController(req, res, next)) {
			new User(req, res, next).updateUser(req, res, next);
		}
	}

	/**
	 * ***Method remove() from Controller class***
	 * **Use that as middleware call**
	 * *This method opereate all incoming remove data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	static async remove(req: Request, res: Response, next: NextFunction) {}
}
