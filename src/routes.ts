import { Router, Request, Response, json } from 'express';
import 'dotenv/config';
import User from './model/User';
import { getUser, setNewUser } from './controller/UserController';

const router = Router();

router.post('/user', async (req: Request, res: Response) => {
  try{
    const resposta = await setNewUser(req, res);
    res.status(resposta.status).json({ mensage: resposta.info });
  }catch(err){
      res.status(500).json({ erro: err });
  }
});

router.get('/user', async (req: Request, res: Response) => {
  try{
    const resposta = await getUser(req, res);
    res.status(resposta.status).json( resposta.info );
  }catch(err){
      res.status(500).json({ erro: err });
  }
});

export { router };