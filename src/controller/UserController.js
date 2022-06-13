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
exports.authenticateUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUser = void 0;
const User_1 = __importDefault(require("../model/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv");
const generateToken = (params = {}) => {
    return jsonwebtoken_1.default.sign(params, `${process.env.API_HASH}`, {
        expiresIn: 86400
    });
};
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.find();
        return { status: 201, info: user };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.getUser = getUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield User_1.default.findById(id);
        return { status: 201, info: user };
    }
    catch (err) {
        return { status: 404, info: { mesage: 'User not found!' } };
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, isAdmin, active } = req.body;
    if (!name && !email && !password && !isAdmin && !active) {
        return { status: 442, info: { message: 'Campos faltantes' } };
    }
    const user = {
        name,
        email,
        password,
        isAdmin,
        active
    };
    try {
        const userRegist = yield User_1.default.create(user);
        return { status: 200, info: user };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, email, password, isAdmin, active } = req.body;
    const user = {
        name,
        email,
        password,
        isAdmin,
        active
    };
    try {
        const userUpdate = yield User_1.default.updateOne({ _id: id }, user);
        if (userUpdate.matchedCount === 0) {
            return { status: 404, info: { message: 'User not found!' } };
        }
        return { status: 200, info: user };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield User_1.default.findOne({ _id: id });
        if (!user) {
            return { status: 404, info: { mesage: 'User not found!' } };
        }
    }
    catch (err) {
        return { status: 500, info: err };
    }
    try {
        yield User_1.default.deleteOne({ _id: id });
        return { status: 200, info: { message: 'User delete' } };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.deleteUser = deleteUser;
//função de autenticação, vai gerar um token
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email }).select('+password');
        if (!user) {
            return { status: 400, info: { mesage: 'User not found!' } };
        }
        if (!user.active) {
            return { status: 400, info: { mesage: 'User desactive!' } };
        }
        if (!(yield bcrypt_1.default.compare(password, user.password))) {
            return { status: 400, info: { mesage: 'Invalid Password!' } };
        }
        user.password = undefined;
        return { status: 200, info: {
                user,
                token: generateToken({ id: user.id, isAdmin: user.isAdmin })
            } };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.authenticateUser = authenticateUser;
