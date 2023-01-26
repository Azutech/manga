import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
  },

  subCategory: {
    type: String,
    default: [],
  },
});

const categories = model('category', categorySchema);

export default categories;
