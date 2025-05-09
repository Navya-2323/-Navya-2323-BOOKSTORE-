import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  year: Number,
  price: {
    type: Number,
    required: true,
  },
  description: String,
  image: String, // optional
});

const Product = mongoose.model('Product', productSchema);

export default Product;
