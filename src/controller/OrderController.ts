import Order from '../model/Order';
import { Request, Response } from 'express';
import Product from '../model/Product';

export const getOrder = async (req: Request, res: Response ) => {
  try{
    const order = await Order.find();
    return {status: 200, info: order}
  }catch(err){
    return {status: 500, info: err }
  }
}
  
export const getOrderById = async (req: Request, res: Response ) => {
  const id = req.params.id;
  try{
    const order = await Order.findById(id);
    return {status: 200, info: order}
  }catch(err){
    return {status: 404, info: {mesage: 'Product not found!'} }
  }
}

export const getOrderProductById = async (req: Request, res: Response ) => {
  const id = req.params.id;
  try{
    const { _id, confirmation, table, itens, client, inProgess, isFinish, isPaid, createAt } = await Order.findById(id);
    let itensObject = [];
    for(let i in itens){
      const product = await Product.findById(itens[i]);
      itensObject.push(product);
    }
    const order = {
      _id,
      table,
      itensObject,
      client,
      inProgess,
      confirmation,
      isFinish,
      isPaid,
      createAt
    }
    return {status: 200, info: order}
  }catch(err){
    return {status: 404, info: {mesage: 'Product not found!'} }
  }
}
  
export const createOrder = async (req: Request, res: Response ) => {
  const { table, itens, client } = req.body;
  if(!table && !itens) {
    return {status: 442, info: {message: 'Campos faltantes'}}
  }
  const createAt = new Date().getTime();

  const order = {
    table,
    itens,
    client,
    inProgess: false,
    confirmation: false,
    isFinish: false,
    isPaid: false,
    createAt
  }
  
  try{
    const newOrder = await Order.create(order);
    return {status: 200, info: newOrder}
  }catch(err){
    return {status: 500, info: err }
  }
}
  
export const updateOrder = async (req: Request, res: Response ) => {
  const id = req.params.id;
  const { table, itens, client, inProgess, confirmation, isFinish, isPaid  } = req.body;
  const order = {
    table,
    itens,
    client,
    inProgess,
    confirmation,
    isFinish,
    isPaid,
  }
  try{
    const orderUpdate = await Order.updateOne({_id: id}, order);
  
    if(orderUpdate.matchedCount === 0){
      return {status: 404, info: {message: 'Order not found!'}}
    }
      
    return {status: 200, info: order}
  }catch(err){
    return {status: 500, info: err }
  }
}
  
export const deleteOrder = async (req: Request, res: Response ) => {
  const id = req.params.id;

  try{
    const order = await Order.findOne({_id: id});
    if(!order) {
      return {status: 404, info: {mesage: 'Order not found!'}}
    }
  }catch(err){
    return {status: 500, info: err }
  }
  try{
    await Order.deleteOne({_id: id});
    return {status: 200, info: {message: 'Order delete'}}
  }catch(err){
    return {status: 500, info: err}
  }
}