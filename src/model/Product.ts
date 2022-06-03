import mongoose from "mongoose";
import Category from './Category'

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageURL: String,

  //do jeito que esta sendo feito, teremos um objeto 
  //category dentro do product, ao inves do id diretamente.
  category: Category,
})

const Product = mongoose.model('Product', productSchema);

export default Product;