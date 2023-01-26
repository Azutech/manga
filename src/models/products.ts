import { Schema, model } from 'mongoose';
import { productType } from '../interfaces/productType';

const productSchema = new Schema<productType>({
  name: {
    type: String,
    required: [true, 'Product just have a name'],
  },

  description: {
    type: String,
    required: [true, 'Product just have a description'],
  },

  price: {
    type: Number,
    default: 0,
  },

  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  colours: {
    type: String,
    enum: ['red', 'black', 'blue', 'purple', 'green'],
  },
  unit_price: {
    type: Number,
  },

  weight: {
    type: String,
  },

  category: {
    type: String,
    required: true,
  },

  subCategory: {
    type: String,
    required: true,
  },
});

const product = model('product', productSchema);

export default product;
