import Router from 'express';
import {
  categories,
  createCatergories,
  OnesubCategory,
  allCategoriesAndSub,
} from '../../services/products/cartegories';

export const categor = Router();

categor.get('/categories/allcategories', categories);
categor.post('/categories/addcategories', createCatergories);
categor.get('/categories/subcategories', OnesubCategory);
categor.get('/categories/allCategoriesAndSub', allCategoriesAndSub);
