import Category from "../model/Category";
import { Request, Response, json } from 'express';

export const getCategory = async (req: Request, res: Response ) => {
  try{
    const category = await Category.find();
    return {status: 200, info: category}
  }catch(err){
    return {status: 500, info: err }
  }
}

export const getCategoryById = async (req: Request, res: Response ) => {
  const id = req.params.id;
  try{
    const category = await Category.findById(id);
    return {status: 200, info: category}
  }catch(err){
    return {status: 404, info: {mesage: 'Category not found!'} }
  }
}

export const createCategory = async (req: Request, res: Response ) => {
const { name, description, imageURL } = req.body;
  if(!name && !description && !imageURL) {
    return {status: 442, info: {message: 'Campos faltantes'}}
  }

  const category = {
    name,
    description,
    imageURL,
  }

  try{
    const newCategory = await Category.create(category);
    return {status: 200, info: newCategory}
  }catch(err){
    return {status: 500, info: err }
  }
}

export const updateCategory = async (req: Request, res: Response ) => {
  const id = req.params.id;
  const { name, description, imageURL } = req.body;
  const category = {
    name,
    description,
    imageURL,
  }
  try{
    const categoryUpdate = await Category.updateOne({_id: id}, category);

    if(categoryUpdate.matchedCount === 0){
      return {status: 404, info: {message: 'Category not found!'}}
    }
    
    return {status: 200, info: category}
  }catch(err){
    return {status: 500, info: err }
  }
}

export const deleteCategory = async (req: Request, res: Response ) => {
  const id = req.params.id;

  try{
    const category = await Category.findOne({_id: id});
    if(!category) {
      return {status: 404, info: {mesage: 'Category not found!'}}
    }
  }catch(err){
    return {status: 500, info: err }
  }
  try{
    await Category.deleteOne({_id: id});
    return {status: 200, info: {message: 'Category delete'}}
  }catch(err){
    return {status: 500, info: err}
  }
}