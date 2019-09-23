"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongo_cursor_pagination_1 = __importDefault(require("mongo-cursor-pagination"));
const AdvModel = new mongoose_1.default.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    extraInfo: {
        type: String,
        required: true,
        trim: true
    },
    priceOffer: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true
    },
    active: {
        type: Boolean
    }
});
AdvModel.plugin(mongo_cursor_pagination_1.default.mongoosePlugin);
exports.default = mongoose_1.default.model('AdvModel', AdvModel);
