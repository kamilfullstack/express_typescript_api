"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("../models/user"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const JWStrategy = passport_jwt_1.default.Strategy;
const ExtractJWT = passport_jwt_1.default.ExtractJwt;
function verifyCallback(payload, done) {
    return user_1.default.findOne({
        _id: payload.id
    })
        .then((user) => {
        return done(null, user);
    })
        .catch((err) => {
        return done(err);
    });
}
exports.default = () => {
    const config = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };
    passport_1.default.use(user_1.default.createStrategy());
    passport_1.default.use(new JWStrategy(config, verifyCallback));
};
