import { Schema, model } from 'mongoose';
import { productType } from '../interfaces/productType';
import User from './users';

const productSchema = new Schema<productType>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: [true, 'Product just have a owner'],
  },

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
});

const product = model('product', productSchema);

export default product;
