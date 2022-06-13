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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategory = void 0;
const Category_1 = __importDefault(require("../model/Category"));
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.find();
        return { status: 200, info: category };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.getCategory = getCategory;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const category = yield Category_1.default.findById(id);
        return { status: 200, info: category };
    }
    catch (err) {
        return { status: 404, info: { mesage: 'Category not found!' } };
    }
});
exports.getCategoryById = getCategoryById;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, imageURL } = req.body;
    if (!name && !description && !imageURL) {
        return { status: 442, info: { message: 'Campos faltantes' } };
    }
    const category = {
        name,
        description,
        imageURL,
    };
    try {
        const newCategory = yield Category_1.default.create(category);
        return { status: 200, info: newCategory };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.createCategory = createCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, description, imageURL } = req.body;
    const category = {
        name,
        description,
        imageURL,
    };
    try {
        const categoryUpdate = yield Category_1.default.updateOne({ _id: id }, category);
        if (categoryUpdate.matchedCount === 0) {
            return { status: 404, info: { message: 'Category not found!' } };
        }
        return { status: 200, info: category };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const category = yield Category_1.default.findOne({ _id: id });
        if (!category) {
            return { status: 404, info: { mesage: 'Category not found!' } };
        }
    }
    catch (err) {
        return { status: 500, info: err };
    }
    try {
        yield Category_1.default.deleteOne({ _id: id });
        return { status: 200, info: { message: 'Category delete' } };
    }
    catch (err) {
        return { status: 500, info: err };
    }
});
exports.deleteCategory = deleteCategory;
