import User from "../model/User";
import { Request, Response, json } from 'express';

export const getUser = async (req: Request, res: Response ) => {
  try{
    const user = await User.find();
    return {status: 201, info: user}
  }catch(err){
    return {status: 500, info: err }
  }
}

export const setNewUser = async (req: Request, res: Response ) => {
  const { name, email, password, access, active } = req.body;
  
  if(!name && !email && !password && !access && !active) {
    return {status: 442, info: 'Campos faltantes'}
  }

  const user = {
    name,
    email,
    password,
    access,
    active
  }

  try{
    await User.create(user);
    return {status: 201, info: 'User inserido' }
  }catch(err){
    return {status: 500, info: err }
  }
}