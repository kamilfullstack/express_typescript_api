"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/controller");
const error_1 = require("../middleware/error");
const validate_1 = require("../middleware/validate");
const passport_1 = __importDefault(require("passport"));
exports.default = () => {
    const api = express_1.Router();
    api.post('/', validate_1.Validate.isDataValid, error_1.Errors.catchAsync(controller_1.Controller.add));
    api.post('/login', passport_1.default.authenticate('local', {
        session: false
    }), error_1.Errors.catchAsync(controller_1.Controller.login));
    api.get('/', validate_1.Validate.checkToken, validate_1.Validate.getQueryString, error_1.Errors.catchAsync(controller_1.Controller.getAll));
    api.get('/:id', validate_1.Validate.checkToken, validate_1.Validate.getQueryString, validate_1.Validate.getQueryString, error_1.Errors.catchAsync(controller_1.Controller.get));
    api.put('/:id', validate_1.Validate.checkToken, error_1.Errors.catchAsync(controller_1.Controller.update));
    api.delete('/:id', validate_1.Validate.checkToken, error_1.Errors.catchAsync(controller_1.Controller.remove));
    return api;
};
