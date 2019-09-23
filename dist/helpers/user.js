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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const respond_1 = require("./respond");
class User {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({
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
            return new respond_1.Respond(res, req, next, respondData).sendRespond(req, res, next, respondData);
        });
    }
    addUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_1.default({
                email: req.body.email,
                nameAndSurname: req.body.nameAndSurname,
                regulationsAcceptance: req.body.regulationsAcceptance,
                phoneNum: req.body.phoneNum
            });
            yield user_1.default.register(user, req.body.password);
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
            return new respond_1.Respond(res, req, next, respondData).sendRespond(req, res, next, respondData);
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({
                id: req.user._id
            }, process.env.JWT_SECRET, {
                expiresIn: 1200
            });
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
            return new respond_1.Respond(res, req, next, respondData).sendRespond(req, res, next, respondData);
        });
    }
    findUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findOne({
                _id: req.params.id
            });
            if (!user)
                next();
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
            return new respond_1.Respond(req, res, next, respondData).sendRespond(req, res, next, respondData);
        });
    }
    findUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersPromise = user_1.default.find(req.filters).skip(req.offset).limit(req.per_page).sort(req.sort_by);
            const countPromise = user_1.default.count(req.filters);
            const [users, count] = yield Promise.all([usersPromise, countPromise]);
            if (!users)
                next();
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
            return new respond_1.Respond(req, res, next, respondData).sendRespond(req, res, next, respondData);
        });
    }
}
exports.User = User;
