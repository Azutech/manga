import Router from 'express';
import {
  createProduct,
  product,
  getOneProduct,
  destroyProducts
} from '../../services/products/products';

export const products = Router();

products.get('/products/getallProducts', product);
products.post('/products/createProducts', createProduct);
products.get('/products/oneProducts', getOneProduct);
products.delete('/products/destroyProducts/:id', destroyProducts)
