import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).send({ error: 'No token provided' });
  }

  // Verificar se o token está no formato certo
  const parts = authHeader.split(' ');
  if(parts.length !== 2){
    return res.status(401).send({ error: 'Token error' });
  }

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme)){
    return res.status(401).send({ error: 'Token malformatted' });
  }
  try {
    jwt.verify(token, `${process.env.DEV_HASH}`, function(err: any, decoded: any) {
        if (err) return res.status(401).json({ error: 'Failed to authenticate token.' });
        // se tudo estiver ok, salva no request para uso posterior
        req.params.userId = decoded.id;
        req.params.userAccess = decoded.access;
        next();
      });
  }catch(err){
    return res.status(401).send({ error: 'Token invalid' });
  }
};

export default auth;