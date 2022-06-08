import Category from "../model/Category";
import { Request, Response } from 'express';
import Product from "../model/Product";

export const getProduct = async (req: Request, res: Response ) => {
  try{
    const product = await Product.find();
    return {status: 200, info: product}
  }catch(err){
    return {status: 500, info: err }
  }
}
  
export const getProductById = async (req: Request, res: Response ) => {
  const id = req.params.id;
  try{
    const product = await Product.findById(id);
    return {status: 200, info: product}
  }catch(err){
    return {status: 404, info: {mesage: 'Product not found!'} }
  }
}

export const getProductCategoryById = async (req: Request, res: Response ) => {
  const id = req.params.id;
  try{
    const product = await Product.findById(id);
    const category = await Category.findById(product.category);
    const productcomplet = {
      id: product.id,
      name: product.name,
      value: product.value,
      description: product.description,
      category
    }
    return {status: 200, info: productcomplet}
  }catch(err){
    return {status: 404, info: {mesage: 'Product not found!'} }
  }
}
  
export const createProduct = async (req: Request, res: Response ) => {
  const { name, description, value, imageURL, category } = req.body;
  if(!name && !description && !imageURL && !category) {
    return {status: 442, info: {message: 'Campos faltantes'}}
  }

  const product = {
    name,
    description,
    value,
    imageURL,
    category
  }
  
  try{
    const newProduct = await Product.create(product);
    return {status: 200, info: newProduct}
  }catch(err){
    return {status: 500, info: err }
  }
}
  
export const updateProduct = async (req: Request, res: Response ) => {
  const id = req.params.id;
  const { name, description, value, imageURL, category } = req.body;
  const product = {
    name,
    description,
    value,
    imageURL,
    category
  }
  try{
    const productUpdate = await Product.updateOne({_id: id}, product);
  
    if(productUpdate.matchedCount === 0){
      return {status: 404, info: {message: 'Product not found!'}}
    }
      
    return {status: 200, info: product}
  }catch(err){
    return {status: 500, info: err }
  }
}
  
export const deleteProduct = async (req: Request, res: Response ) => {
  const id = req.params.id;

  try{
    const product = await Product.findOne({_id: id});
    if(!product) {
      return {status: 404, info: {mesage: 'Product not found!'}}
    }
  }catch(err){
    return {status: 500, info: err }
  }
  try{
    await Product.deleteOne({_id: id});
    return {status: 200, info: {message: 'Product delete'}}
  }catch(err){
    return {status: 500, info: err}
  }
}