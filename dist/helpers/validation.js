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
const respond_1 = require("./respond");
class Validation {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }
    dataValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
            }
            else {
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
                return new respond_1.Respond(req, res, next, respondData).sendRespond(req, res, next, respondData);
            }
        });
    }
    isValidEmail(email) {
        const regex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        email = email.trim();
        return regex.test(String(email).toLocaleLowerCase());
    }
    isValidPhoneNumber(phoneNumber) {
        const regex = new RegExp('^[0-9+]{1,}[0-9-]{3,15}$');
        phoneNumber = phoneNumber.trim();
        return regex.test(String(phoneNumber).toLocaleLowerCase());
    }
    isValidPassword(password) {
        const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
        return regex.test(String(password));
    }
    isValidRegulationsAcceptance(regulationsAcceptance) {
        return regulationsAcceptance;
    }
    isValidData(data) {
        return Object.values(data).every((item) => item === true);
    }
}
exports.Validation = Validation;
