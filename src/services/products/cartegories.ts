import Category from '../../models/categories';
import AppError from '../../errors/errors';
import { Request, Response, NextFunction } from 'express';

export const categories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allcategories = await Category.find().exec();
    if (!allcategories) return next(new AppError('Unable to retrieve', 404));

    const Categories = allcategories.map((item) => {
      const itemcategory = item.category;
      return itemcategory;
    });
    return res.status(200).json({
      success: true,
      message: 'Categories are retrieved',
      data: Categories,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const createCatergories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { category, subCategory } = req.body;
  if (!(category || subCategory))
    return next(new AppError('Kindly fill in the input field', 404));

  try {
    const check = await Category.findOne({ category: category })
      .exec()
      .catch((err) => {});
    if (check)
      return res.status(404).json({ message: 'category already exists' });

    const newCatergory = await Category.create({
      category,
      subCategory,
    });
    console.log(4);
    return res.status(200).json({
      success: true,
      message: 'New categoeries and subcatergories has been created',
      data: newCatergory,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const OnesubCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categories } = req.body;
  try {
    if (!categories)
      return res.status(404).json({ message: 'kindly input the category' });
    const subCategory = await Category.findOne({ category: categories });
    if (!subCategory)
      return next(new AppError('Unable to retrieve subcategories', 404));

    return res.status(201).json({
      message: 'subcategories are retrieved',
      data: subCategory,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const allCategoriesAndSub = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allcategories = await Category.find();

  try {
    if (!allcategories)
      return next(
        new AppError('Cannot Retrieve categories and subcategory', 404)
      );
    res.status(201).json({
      success: true,
      message: 'Data has been retrieved',
      data: allcategories,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
