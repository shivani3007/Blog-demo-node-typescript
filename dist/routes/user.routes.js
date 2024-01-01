"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authentication_1 = require("../middlewares/authentication");
const enums_1 = require("../utils/enums");
router.get('/protected', (0, authentication_1.authenticateAndAuthorize)([enums_1.Role.ADMIN, enums_1.Role.USER]), (req, res) => {
    res.send('protected route');
});
exports.default = router;
