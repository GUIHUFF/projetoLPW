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
exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrderProductById = exports.getOrderById = exports.getOrder = void 0;
const Order_1 = __importDefault(require("../model/Order"));
const Product_1 = __importDefault(require("../model/Product"));
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.find();
        return { status: 200, info: order };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.getOrder = getOrder;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const order = yield Order_1.default.findById(id);
        return { status: 200, info: order };
    }
    catch (err) {
        return { status: 404, info: { mesage: 'Product not found!' } };
    }
});
exports.getOrderById = getOrderById;
const getOrderProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const { _id, confirmation, table, itens, client, inProgess, isFinish, isPaid, createAt } = yield Order_1.default.findById(id);
        let itensObject = [];
        for (let i in itens) {
            const product = yield Product_1.default.findById(itens[i]);
            itensObject.push(product);
        }
        const order = {
            _id,
            table,
            itensObject,
            client,
            inProgess,
            confirmation,
            isFinish,
            isPaid,
            createAt
        };
        return { status: 200, info: order };
    }
    catch (err) {
        return { status: 404, info: { mesage: 'Product not found!' } };
    }
});
exports.getOrderProductById = getOrderProductById;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { table, itens, client } = req.body;
    if (!table && !itens) {
        return { status: 442, info: { message: 'Campos faltantes' } };
    }
    const createAt = new Date().getTime();
    const order = {
        table,
        itens,
        client,
        inProgess: false,
        confirmation: false,
        isFinish: false,
        isPaid: false,
        createAt
    };
    try {
        const newOrder = yield Order_1.default.create(order);
        return { status: 200, info: newOrder };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { table, itens, client, inProgess, confirmation, isFinish, isPaid } = req.body;
    const order = {
        table,
        itens,
        client,
        inProgess,
        confirmation,
        isFinish,
        isPaid,
    };
    try {
        const orderUpdate = yield Order_1.default.updateOne({ _id: id }, order);
        if (orderUpdate.matchedCount === 0) {
            return { status: 404, info: { message: 'Order not found!' } };
        }
        return { status: 200, info: order };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const order = yield Order_1.default.findOne({ _id: id });
        if (!order) {
            return { status: 404, info: { mesage: 'Order not found!' } };
        }
    }
    catch (err) {
        return { status: 500, info: err };
    }
    try {
        yield Order_1.default.deleteOne({ _id: id });
        return { status: 200, info: { message: 'Order delete' } };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.deleteOrder = deleteOrder;
