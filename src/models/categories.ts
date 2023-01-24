import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },

  subCategory: {
    type: String,
    required: true,
  },
});

const categories = model('product', categorySchema);

export default categories;
