import Category from "../model/Category";
import { Request, Response } from 'express';
import Product from "../model/Product";

const getCategoryId = async ( id: String ) => {
  try{
    const category = await Category.findById(id);
    return category;
  } catch(err) {
    return false;
  }
}

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
    return {status: 200, info: {product}}
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
  
// export const updateProduct = async (req: Request, res: Response ) => {
//   const id = req.params.id;
//     const { name, description, imageURL } = req.body;
//     const category = {
//       name,
//       description,
//       imageURL,
//     }
//     try{
//       const categoryUpdate = await Category.updateOne({_id: id}, category);
  
//       if(categoryUpdate.matchedCount === 0){
//         return {status: 404, info: {message: 'Category not found!'}}
//       }
      
//       return {status: 200, info: category}
//     }catch(err){
//       return {status: 500, info: err }
//     }
//   }
  
//   export const deleteProduct = async (req: Request, res: Response ) => {
//     const id = req.params.id;
  
//     try{
//       const category = await Category.findOne({_id: id});
//       if(!category) {
//         return {status: 404, info: {mesage: 'Category not found!'}}
//       }
//     }catch(err){
//       return {status: 500, info: err }
//     }
//     try{
//       await Category.deleteOne({_id: id});
//       return {status: 200, info: {message: 'Category delete'}}
//     }catch(err){
//       return {status: 500, info: err}
//     }
//   }