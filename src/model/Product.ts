import mongoose from "mongoose";
import Category from "./Category";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: [String],
    default: null
  },
  value: {
    type: Number,
    required: true
  },
  imageURL: {
    type: String,
  },

  //do jeito que esta sendo feito, teremos um objeto 
  //category dentro do product, ao inves do id diretamente.
  category: String
})

const Product = mongoose.model('Product', productSchema);

export default Product;