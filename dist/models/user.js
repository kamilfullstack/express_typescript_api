"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const mongo_cursor_pagination_1 = __importDefault(require("mongo-cursor-pagination"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
const UserModel = new mongoose.Schema({
    email: {
        required: true,
        trim: true,
        type: String
    },
    nameAndSurname: {
        required: true,
        trim: true,
        type: String
    },
    password: {
        type: String
    },
    advHistory: {
        type: Array
    },
    advActive: {
        type: Array
    },
    paymentMethod: {
        type: String
    },
    cardNumber: {
        type: Object
    },
    opinionsAsOrdered: {
        type: Object
    },
    opinionsAsDelivery: {
        type: Object
    },
    accountStatus: {
        type: Boolean
    },
    localization: {
        type: String
    },
    regulationsAcceptance: {
        type: Boolean
    }
}, {
    timestamps: true
});
UserModel.plugin(mongo_cursor_pagination_1.default.mongoosePlugin);
UserModel.plugin(passport_local_mongoose_1.default, {
    usernameField: 'email'
});
exports.default = mongoose.model('UserModel', UserModel);
