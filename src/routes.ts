import { Router, Request, Response, json } from 'express';
import 'dotenv/config';
import User from './model/User';

const router = Router();

router.post('/user', async (req: Request, res: Response) => {
  
  const { name, email } = req.body;
  
  if(!name && !email) {
      res.status(422).json({ error: 'Campos faltantes' });
  }

  const user = {
      name,
      email
  }

  try{
    await User.create(user);

    res.status(201).json({ message: 'User inserido' });
  }catch(err){
      res.status(500).json({ erro: err });
  }

});

export { router };