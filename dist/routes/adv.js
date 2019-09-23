"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/controller");
const error_1 = require("../middleware/error");
const validate_1 = require("../middleware/validate");
exports.default = () => {
    const api = express_1.Router();
    api.post('/', validate_1.Validate.checkToken, error_1.Errors.catchAsync(controller_1.Controller.add()));
    api.get('/', validate_1.Validate.checkToken, validate_1.Validate.getQueryString, error_1.Errors.catchAsync(controller_1.Controller.getAll));
    api.get('/:id', validate_1.Validate.checkToken, validate_1.Validate.getQueryString, error_1.Errors.catchAsync(controller_1.Controller.get));
    api.put('/:id', validate_1.Validate.checkToken, error_1.Errors.catchAsync(controller_1.Controller.update));
    return api;
};
