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
exports.router = void 0;
const express_1 = require("express");
require("dotenv/config");
const UserController_1 = require("./controller/UserController");
const auth_1 = __importDefault(require("./auth"));
const CategoryController_1 = require("./controller/CategoryController");
const ProductController_1 = require("./controller/ProductController");
const OrderController_1 = require("./controller/OrderController");
const router = (0, express_1.Router)();
exports.router = router;
//USER
router.post('/authenticate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, UserController_1.authenticateUser)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.get('/user', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, UserController_1.getUser)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.get('/user/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, UserController_1.getUserById)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.post('/user', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, UserController_1.createUser)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.patch('/user/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, UserController_1.updateUser)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.delete('/user/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, UserController_1.deleteUser)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
//CATEGORY
router.get('/category', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, CategoryController_1.getCategory)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.get('/category/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, CategoryController_1.getCategoryById)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.post('/category', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, CategoryController_1.createCategory)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.patch('/category/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, CategoryController_1.updateCategory)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.delete('/category/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, CategoryController_1.deleteCategory)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
// Product
router.get('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, ProductController_1.getProduct)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.get('/product/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, ProductController_1.getProductById)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.get('/productAll/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, ProductController_1.getProductCategoryById)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.post('/product', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, ProductController_1.createProduct)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.patch('/product/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, ProductController_1.updateProduct)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.delete('/product/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, ProductController_1.deleteProduct)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
// Order
router.get('/order/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, OrderController_1.getOrder)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.get('/order/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, OrderController_1.getOrderById)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.get('/orderAll/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, OrderController_1.getOrderProductById)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.post('/order', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, OrderController_1.createOrder)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.patch('/order/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, OrderController_1.updateOrder)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
router.delete('/order/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resposta = yield (0, OrderController_1.deleteOrder)(req, res);
        res.status(resposta.status).json(resposta.info);
    }
    catch (err) {
        res.status(500).json({ erro: err });
    }
}));
