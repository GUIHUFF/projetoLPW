"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const routes_1 = require("./routes");
const database_1 = __importDefault(require("./database"));
// configuração do express
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//conect com db
(0, database_1.default)();
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        //Se é instancia do tipo erro
        return res.status(400).json({
            error: err.message
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});
app.get('/', (req, res) => {
    res.json({ message: 'not request found' });
});
app.use(routes_1.router);
app.listen(process.env.PORT || 1337, () => console.log('Server Online'));
