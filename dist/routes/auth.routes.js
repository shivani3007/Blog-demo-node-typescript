"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const express_validation_1 = require("express-validation");
const auth_controller_1 = require("../controllers/auth.controller");
const user_1 = require("../validations/user");
router.post('/register', (0, express_validation_1.validate)(user_1.register), auth_controller_1.register);
router.post('/login', auth_controller_1.login);
exports.default = router;
