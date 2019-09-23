import UserModel from '../models/user';
import jwt from 'jsonwebtoken';
import { Respond } from './respond';
import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';

/**
 * ***Class to help make database operation***
 * **Use that where you need**
 * *class methods: updateUser() addUser() loginUser() findUser() findUsers()*
 */
export class User {
	req: Request;
	res: Response;
	next: NextFunction;
	constructor(req: Request, res: Response, next: NextFunction) {
		this.req = req;
		this.res = res;
		this.next = next;
	}

	/**
	 * ***Method updateUser() from User class***
	 * **Use that as method call**
	 * *This method update user information and return data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	async updateUser(req: Request, res: Response, next: NextFunction) {
		const user = await UserModel.findOne({
			_id: req.params.id
		});

		const respondData = {
			status: 200,
			serverStatus: true,
			message: 'Zaktualizowano użytkownika',
			dataRequest: req.body,
			dataRespond: user,
			err: 'no error',
			extraInfo: 'Konto zostało zaktualizowane, trzeba znowu wysłać requesty',
			extraInfoTitle: 'Informacje o następnych działaniach po stronie frontend'
		};
		return new Respond(res, req, next, respondData).sendRespond(req, res, next, respondData);
	}

	/**
	 * ***Method addUser() from User class***
	 * **Use that as method call**
	 * *This method add user information and return data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	async addUser(req: Request, res: Response, next: NextFunction) {
		const user = new UserModel({
			email: req.body.email,
			nameAndSurname: req.body.nameAndSurname,
			regulationsAcceptance: req.body.regulationsAcceptance,
			phoneNum: req.body.phoneNum
		});

		await UserModel.register(user, req.body.password);

		const respondData = {
			status: 200,
			serverStatus: true,
			message: 'Stworzono użytkownika',
			dataRequest: req.body,
			dataRespond: user,
			err: 'no error',
			extraInfo: 'Konto utworzono można się zalogować',
			extraInfoTitle: 'Informacje o następnych działaniach po stronie frontend'
		};
		return new Respond(res, req, next, respondData).sendRespond(req, res, next, respondData);
	}

	/**
	 * ***Method loginUser() from User class***
	 * **Use that as method call**
	 * *This method check correct user information and return data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	async loginUser(req: Request, res: Response, next: NextFunction) {
		const token = jwt.sign(
			{
				id: req.user._id
			},
			process.env.JWT_SECRET,
			{
				expiresIn: 1200
			}
		);

		const respondData = {
			status: 200,
			serverStatus: true,
			message: 'Użytkownik został zalogowany',
			dataRequest: req.body,
			dataRespond: token,
			err: 'no error',
			extraInfo: `Token aktywny przez ${1200} sekund`,
			extraInfoTitle: 'Informacje o czasie działania tokenu użytkownika'
		};

		return new Respond(res, req, next, respondData).sendRespond(req, res, next, respondData);
	}

	/**
	 * ***Method findUser() from User class***
	 * **Use that as method call**
	 * *This method find user information and return data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	async findUser(req: Request, res: Response, next: NextFunction) {
		const user = await UserModel.findOne({
			_id: req.params.id
		});
		if (!user) next();

		const respondData = {
			status: 200,
			serverStatus: true,
			message: 'Użytkownik został zwrócony',
			dataRequest: req.body,
			dataRespond: user,
			err: 'no error',
			extraInfo: `Prosze uważać na dane użytkownika bo tutaj są zarówno dane wrażliwe jak i salt od odkryptowania tokenów i haseł użytkowników`,
			extraInfoTitle: 'Informacje dodatkowe dla frontendu'
		};

		return new Respond(req, res, next, respondData).sendRespond(req, res, next, respondData);
	}

	/**
	 * ***Method findUsers() from User class***
	 * **Use that as method call**
	 * *This method find all users information and return data*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	async findUsers(req: Request, res: Response, next: NextFunction) {
		const usersPromise = UserModel.find(req.filters).skip(req.offset).limit(req.per_page).sort(req.sort_by);
		const countPromise = UserModel.count(req.filters);
		const [ users, count ] = await Promise.all([ usersPromise, countPromise ]);

		if (!users) next();

		const respondData = {
			status: 200,
			serverStatus: true,
			message: 'Lista użytkowników została zwrócona',
			dataRequest: req.body,
			dataRespond: users,
			err: 'no error',
			extraInfo: `Prosze uważać na dane użytkowników bo tutaj są zarówno dane wrażliwe jak i salt od odkryptowania tokenów i haseł użytkowników. Całkowita ilość użytkowników w bazie: ${count}`,
			extraInfoTitle: 'Informacje dodatkowe dla frontendu'
		};

		return new Respond(req, res, next, respondData).sendRespond(req, res, next, respondData);
	}
}
