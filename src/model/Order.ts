import mongoose from "mongoose";
import Product from './Product';

const orderSchema = new mongoose.Schema({
  table: Number,
  stage: String,
  itens: [Product],
  name:  String,
  status: Boolean,
})

const Order = mongoose.model('Order', orderSchema);

export default Order;