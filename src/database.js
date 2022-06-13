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
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
// mongo local: await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
// mongo docker: await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT_LOCAL}/${process.env.DB_NAME}`)
// ambos em docker: mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)  AS VARIAVEIS SÃO DIFERENTES NO .ENV
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    yield mongoose_1.default.connect(`${process.env.DB_URL_ATLAS}`)
        .then(() => {
        console.log('Conectado com o banco');
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.default = connectDB;
