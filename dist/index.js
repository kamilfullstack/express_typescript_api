"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: '.env'
});
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = __importDefault(require("./config/server"));
const database_1 = __importDefault(require("./config/database"));
const database_2 = __importDefault(require("./config/database"));
const passport_1 = __importDefault(require("./config/passport"));
const error_1 = require("./middleware/error");
const users_1 = __importDefault(require("./routes/users"));
const adv_1 = __importDefault(require("./routes/adv"));
const app = express_1.default();
passport_1.default();
mongoose_1.default.Promise = global.Promise;
mongoose_1.default
    .connect(database_1.default.url, database_2.default.settings)
    .then((success) => {
    console.log('Database connection');
})
    .catch((err) => {
    console.log(`Database err: ${err}`);
});
app.use(body_parser_1.default.urlencoded({
    extended: false
}));
app.use(body_parser_1.default.json());
app.use('/api/users', users_1.default());
app.use('/api/advs', adv_1.default());
app.use(error_1.Errors.notFound);
app.use(error_1.Errors.catchErrors);
app.listen(server_1.default.port, () => {
    console.log(`Server is listen on port: ${server_1.default.port}`);
});
