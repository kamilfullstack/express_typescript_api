"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Respond {
    constructor(req, res, next, data) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.data = data;
    }
    sendRespond(req, res, next, data) {
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
exports.Respond = Respond;
