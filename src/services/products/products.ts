import Product from '../../models/products';
import AppError from '../../errors/errors';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { nextTick } from 'process';

export const product = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = req.query.category ? { category: req.query.category } : {};

    const search = req.query.search
      ? {
          name: {
            $regex: req.query.regex,
            options: 'i',
          },
        }
      : {};

    //   const sortOrder =

    const allProducts = await Product.find({ ...products, ...search });
    if (!allProducts) return next(new AppError('Unable to retrieve data', 404));

    return res.status(202).json({
      message: 'All Products has been retrieved',
      data: allProducts,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getOneProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id });
    if (!product) return next(new AppError('Unable to retrieve product', 404));

    return res.status(200).json({
      message: 'This product has been retrieved',
      data: product,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, price, size, weight, category, subCategory } =
    req.body;

  try {
    if (
      !(
        name ||
        description ||
        price ||
        size ||
        category ||
        weight ||
        subCategory
      )
    )
      return next(new AppError('fill in all the bodies', 404));
    const productname = await Product.findOne({ name: name });
    if (productname)
      return next(new AppError('product name already exist', 404));

    const production = await Product.create({
      name,
      description,
      price,
      size,
      category,
      subCategory,
      weight,
    });

    return res.status(201).json({
      message: 'product has been created',
      data: production,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
