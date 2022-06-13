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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductCategoryById = exports.getProductById = exports.getProduct = void 0;
const Category_1 = __importDefault(require("../model/Category"));
const Product_1 = __importDefault(require("../model/Product"));
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.find();
        return { status: 200, info: product };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.getProduct = getProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield Product_1.default.findById(id);
        return { status: 200, info: product };
    }
    catch (err) {
        return { status: 404, info: { mesage: 'Product not found!' } };
    }
});
exports.getProductById = getProductById;
const getProductCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield Product_1.default.findById(id);
        const category = yield Category_1.default.findById(product.category);
        const productcomplet = {
            id: product.id,
            name: product.name,
            value: product.value,
            description: product.description,
            category
        };
        return { status: 200, info: productcomplet };
    }
    catch (err) {
        return { status: 404, info: { mesage: 'Product not found!' } };
    }
});
exports.getProductCategoryById = getProductCategoryById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, value, imageURL, category } = req.body;
    if (!name && !description && !imageURL && !category) {
        return { status: 442, info: { message: 'Campos faltantes' } };
    }
    const product = {
        name,
        description,
        value,
        imageURL,
        category
    };
    try {
        const newProduct = yield Product_1.default.create(product);
        return { status: 200, info: newProduct };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, description, value, imageURL, category } = req.body;
    const product = {
        name,
        description,
        value,
        imageURL,
        category
    };
    try {
        const productUpdate = yield Product_1.default.updateOne({ _id: id }, product);
        if (productUpdate.matchedCount === 0) {
            return { status: 404, info: { message: 'Product not found!' } };
        }
        return { status: 200, info: product };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const product = yield Product_1.default.findOne({ _id: id });
        if (!product) {
            return { status: 404, info: { mesage: 'Product not found!' } };
        }
    }
    catch (err) {
        return { status: 500, info: err };
    }
    try {
        yield Product_1.default.deleteOne({ _id: id });
        return { status: 200, info: { message: 'Product delete' } };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.deleteProduct = deleteProduct;
