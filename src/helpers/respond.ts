import { Request, Response, NextFunction } from 'express';
/**
 * ***Class to send respond to client***
 * **Use that where you need**
 * *class methods: sendRespond()*
 */
export class Respond {
	constructor(req: Request, res: Response, next: NextFunction, data: any) {
		this.req = req;
		this.res = res;
		this.next = next;
		this.data = data;
	}
	/**
	 * ***Method sendRespond() from User class***
	 * **Use that as method call**
	 * *This method get nessesary data and send it to client as respond*
	 * @param req **Object -> user request**
	 * @param res **Object -> server respond**
	 * @param next **Function -> server next middleware**
	 * @param data **Any -> nessesary data for respond**
	 */
	sendRespond(req: Request, res: Response, next: NextFunction, data: any) {
		return res.status(data.status).send({
			serverStatus: data.serverStatus,
			message: data.message,
			dataRequest: data.dataRequest,
			dataRespond: data.dataRespond,
			err: data.err,
			extraInfoTitle: data.extraInfoTitle,
			extraInfo: data.extraInfo
		});
	}
}
