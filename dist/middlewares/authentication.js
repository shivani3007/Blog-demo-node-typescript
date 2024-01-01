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
exports.authenticateAndAuthorize = void 0;
const passport_config_1 = __importDefault(require("../authentication/passport-config"));
const role_schema_1 = __importDefault(require("../schemas/role.schema"));
const authenticateAndAuthorize = (roles = []) => (req, res, next) => {
    passport_config_1.default.authenticate('jwt', { session: false }, (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const roleId = user.role;
        const roleFound = yield role_schema_1.default.findById(roleId);
        const role = roleFound.name;
        if (roleFound !== null && typeof roleFound !== 'string') {
            if (!roles.includes(role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }
        }
        req.user = user;
        next();
    }))(req, res, next);
};
exports.authenticateAndAuthorize = authenticateAndAuthorize;
