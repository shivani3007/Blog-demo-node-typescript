"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const helperFunctions_1 = require("../utils/helperFunctions");
const role_schema_1 = __importDefault(require("../schemas/role.schema"));
/** Registration api for users :- */
/**
 *
 * @param req
 * @param res
 * @param next
 */
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, surname, email, password, age, role } = req.body;
        const roleFound = yield role_schema_1.default.findOne({ name: role });
        const newUser = new user_schema_1.default({
            name: name,
            surname: surname,
            email: email,
            password: password,
            age: age,
            role: roleFound._id,
        });
        const createdUser = yield newUser.save();
        return res.status(200).json({ createdUser });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
/** Login api for users :- */
/**
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_schema_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found with this email' });
        }
        const hashedPassword = user.password;
        const isPasswordCorrect = yield (0, helperFunctions_1.verifyPassword)(password, hashedPassword);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const secretKey = process.env.SECRET_KEY;
        const token = yield jsonwebtoken_1.default.sign({ id: user._id }, secretKey, { expiresIn: '24h' });
        return res.status(200).json({ accessToken: token });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
