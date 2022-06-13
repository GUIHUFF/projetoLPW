"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv");
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' });
    }
    // Verificar se o token está no formato certo
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).send({ error: 'Token error' });
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
    }
    try {
        jsonwebtoken_1.default.verify(token, `${process.env.API_HASH}`, function (err, decoded) {
            if (err)
                return res.status(401).json({ error: 'Failed to authenticate token.' });
            // se tudo estiver ok, salva no request para uso posterior
            req.params.userId = decoded.id;
            req.params.userAdmin = decoded.isAdmin;
            next();
        });
    }
    catch (err) {
        return res.status(401).send({ error: 'Token invalid' });
    }
};
exports.default = auth;
