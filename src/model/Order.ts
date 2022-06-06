import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  table: Number,
  itens: [String],
  
  client:  String,
  inProgess: Boolean,
  confirmation: Boolean,
  isFinish: Boolean,
  //Data in timestamp
  createAt: {
    type: Number,
    autoCreatedAt: true
  }
})

const Order = mongoose.model('Order', orderSchema);

export default Order;