import { Respond } from './respond';
import { Request, Response, NextFunction } from 'express';
/**
 * ***Class to help validate data***
 * **Use that where you need**
 * *class methods: dataValidation() isValidEmail() isValidPhoneNumber() isValidPassword() isValidRegulationsAcceptance() isValidData()*
 */
export class Validation {
	req: Request;
	res: Respond;
	next: NextFunction;
	constructor(req: Request, res: Respond, next: NextFunction) {
		this.req = req;
		this.res = res;
		this.next = next;
	}
	/**
	 * ***Method dataValidation() from Validation class***
	 * **Use that as method call**
	 * *This method check all data from client and return status of validation*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 */
	async dataValidation(req: Request, res: Respond, next: NextFunction) {
		const validationInfo = {
			email: false,
			nameAndSurname: false,
			phoneNum: false,
			password: false,
			regulationsAcceptance: false,
			unnessesaryData: true
		};
		for (let key in req.body) {
			switch (key) {
				case 'email':
					validationInfo.email = this.isValidEmail(req.body[key]);
					break;
				case 'nameAndSurname':
					validationInfo.nameAndSurname = true;
					break;

				case 'phoneNum':
					validationInfo.phoneNum = this.isValidPhoneNumber(req.body[key]);
					break;

				case 'password':
					validationInfo.password = this.isValidPassword(req.body[key]);
					break;

				case 'regulationsAcceptance':
					validationInfo.regulationsAcceptance = this.isValidRegulationsAcceptance(req.body[key]);
					break;

				default:
					validationInfo.unnessesaryData = false;
					break;
			}
		}
		if (this.isValidData(validationInfo)) {
			next();
		} else {
			const respondData = {
				status: 401,
				serverStatus: false,
				message: 'Dane nie przeszły validacji po stronie servera',
				dataRequest: req.body,
				dataRespond: req.body,
				err: 'Server Validation error',
				extraInfo: validationInfo,
				extraInfoTitle: 'Statusy validacji poszczególnych pól'
			};
			return new Respond(req, res, next, respondData).sendRespond(req, res, next, respondData);
		}
	}
	/**
	 * ***Method isValidEmail() from Validation class***
	 * **Use that as method call**
	 * *This method check email data from client and return status of validation*
	 * @param email **String -> user request email**
	 */
	isValidEmail(email: string) {
		const regex = new RegExp(
			"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
		);
		email = email.trim();
		return regex.test(String(email).toLocaleLowerCase());
	}
	/**
	 * ***Method isValidPhoneNumber() from Validation class***
	 * **Use that as method call**
	 * *This method check phone number data from client and return status of validation*
	 * @param phoneNumber **String -> user request phone number**
	 */
	isValidPhoneNumber(phoneNumber: string) {
		const regex = new RegExp('^[0-9+]{1,}[0-9-]{3,15}$');
		phoneNumber = phoneNumber.trim();
		return regex.test(String(phoneNumber).toLocaleLowerCase());
	}
	/**
	 * ***Method isValidPassword() from Validation class***
	 * **Use that as method call**
	 * *This method check password data from client and return status of validation*
	 * @param password **String -> user request password**
	 */
	isValidPassword(password: string) {
		const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
		return regex.test(String(password));
	}
	/**
	 * ***Method isValidRegulationsAcceptance() from Validation class***
	 * **Use that as method call**
	 * *This method check regulations acceptance data from client and return status of validation*
	 * @param regulationsAcceptance **Boolean -> user request regulations acceptance**
	 */
	isValidRegulationsAcceptance(regulationsAcceptance: boolean) {
		return regulationsAcceptance;
	}
	/**
	 * ***Method isValidData() from Validation class***
	 * **Use that as method call**
	 * *This method check all validation data acceptance data from client and return status of validation*
	 * @param data **Object -> user request data**
	 */
	isValidData(data: Object) {
		return Object.values(data).every((item) => item === true);
	}
}
