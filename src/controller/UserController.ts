import User from "../model/User";
import { Request, Response, json } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv';

const generateToken = (params = {}) => {
  return jwt.sign(params, `${process.env.DEV_HASH}`, {
    expiresIn: 86400
  });
}

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

export const registerUser = async (req: Request, res: Response ) => {
  const { name, email, password, isAdmin, active } = req.body;
  if(!name && !email && !password && !isAdmin && !active) {
    return {status: 442, info: {message: 'Campos faltantes'}}
  }

  const user = {
    name,
    email,
    password,
    isAdmin,
    active
  }

  try{
    const userRegist = await User.create(user);
    return {status: 200, info: user}
  }catch(err){
    return {status: 500, info: err }
  }
}

export const updateUser = async (req: Request, res: Response ) => {
  const id = req.params.id;
  const { name, email, password, isAdmin, active } = req.body;
  const user = {
    name,
    email,
    password,
    isAdmin,
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
      return {status: 404, info: {mesage: 'User not found!'}}
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
//função de autenticação, vai gerar um token
export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try{
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return {status: 400, info: { mesage: 'User not found!'}}
    }
    if (!user.active) {
      return {status: 400, info: { mesage: 'User desactive!'}}
    }
    if (!await bcrypt.compare(password, user.password)) {
      return {status: 400, info: { mesage: 'Invalid Password!'}}
    }
    user.password = undefined;

    return {status: 200, info: 
      {
        user,
        token: generateToken({id: user.id, isAdmin: user.isAdmin})
      }}
 }catch(err){
  return {status: 500, info: err}
 }

}