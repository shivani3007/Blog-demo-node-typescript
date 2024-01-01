"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const joi_1 = __importDefault(require("joi"));
const enums_1 = require("../utils/enums");
exports.register = {
    body: joi_1.default.object({
        name: joi_1.default.string().required(),
        surname: joi_1.default.string().required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        age: joi_1.default.number().required(),
        role: joi_1.default.string().required().valid(...Object.values(enums_1.Role))
    })
};
