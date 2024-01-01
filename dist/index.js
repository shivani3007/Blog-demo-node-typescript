"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const databaseConnection_1 = require("./databaseConnection");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const errorHandler_1 = require("./middlewares/errorHandler");
const passport_config_1 = __importDefault(require("./authentication/passport-config"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
(0, databaseConnection_1.connect)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(passport_config_1.default.initialize());
app.use('/api', index_routes_1.default);
app.use(errorHandler_1.errorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
