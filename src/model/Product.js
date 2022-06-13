"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: [String],
        default: null
    },
    value: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
    },
    //do jeito que esta sendo feito, teremos um objeto 
    //category dentro do product, ao inves do id diretamente.
    category: String
});
const Product = mongoose_1.default.model('Product', productSchema);
exports.default = Product;
