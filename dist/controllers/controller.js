"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../helpers/user");
class Controller {
    static operateController(req, res, next) {
        const path = req.originalUrl;
        return path.includes('users');
    }
    static add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Controller.operateController(req, res, next)) {
                new user_1.User(req, res, next).addUser(req, res, next);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Controller.operateController(req, res, next)) {
                new user_1.User(req, res, next).loginUser(req, res, next);
            }
        });
    }
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Controller.operateController(req, res, next)) {
                new user_1.User(req, res, next).findUsers(req, res, next);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Controller.operateController(req, res, next)) {
                new user_1.User(req, res, next).findUser(req, res, next);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Controller.operateController(req, res, next)) {
                new user_1.User(req, res, next).updateUser(req, res, next);
            }
        });
    }
    static remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.Controller = Controller;
