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

export const getUserById = async (req: Request, res: Response ) => {
  const id = req.params.id;
  try{
    const user = await User.findById(id);
    return {status: 201, info: user}
  }catch(err){
    return {status: 404, info: {mesage: 'User not found!'} }
  }
}

export const setNewUser = async (req: Request, res: Response ) => {
  const { name, email, password, access, active } = req.body;
  
  if(!name && !email && !password && !access && !active) {
    return {status: 442, info: {message: 'Campos faltantes'}}
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
    return {status: 201, info: {message: 'User inserido'} }
  }catch(err){
    return {status: 500, info: err }
  }
}

export const updateUser = async (req: Request, res: Response ) => {
  const id = req.params.id;
  const { name, email, password, access, active } = req.body;
  const user = {
    name,
    email,
    password,
    access,
    active
  }
  try{
    const userUpdate = await User.updateOne({_id: id}, user);

    if(userUpdate.matchedCount === 0){
      return {status: 404, info: {message: 'User not found!'}}
    }
    
    return {status: 200, info: user}
  }catch(err){
    return {status: 500, info: err }
  }
}

export const deleteUser = async (req: Request, res: Response ) => {
  const id = req.params.id;
  try{
    const user = await User.findOne({_id: id});
    if(!user) {
      return {status: 404, info: {mesage: 'User not found!'} }
    }
  }catch(err){
    return {status: 500, info: err }
  }
  try{
    await User.deleteOne({_id: id});
    return {status: 200, info: {message: 'User delete'}}
  }catch(err){
    return {status: 500, info: err}
  }
}