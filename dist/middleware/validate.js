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
const qs_1 = __importDefault(require("qs"));
const lodash_1 = __importDefault(require("lodash"));
const passport_1 = __importDefault(require("passport"));
const validation_1 = require("../helpers/validation");
class Validate {
    static checkToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return passport_1.default.authenticate('jwt', {
                session: false
            })(req, res, next);
        });
    }
    static isDataValid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            new validation_1.Validation(req, res, next).dataValidation(req, res, next);
        });
    }
    static getQueryString(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullPath = req.originalUrl;
            if (fullPath.includes('users')) {
                const availableFilters = Object.keys(user_1.default.schema.paths);
                const filters = qs_1.default.parse(req.query);
                req.filters = lodash_1.default.pickBy(filters, (value, key) => availableFilters.indexOf(key) > -1);
                const sort_by = {};
                sort_by[req.query.sort_by || 'createdAt'] = req.query.order_by || 'desc';
                req.sort_by = sort_by;
                const offset = parseInt(req.query.offset) || 0;
                const per_page = parseInt(req.query.per_page) || 2;
                req.offset = offset;
                req.per_page = per_page;
            }
            next();
        });
    }
}
exports.Validate = Validate;
