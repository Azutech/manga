import Category from '../../models/categories';
import AppError from '../../errors/errors';
import { Request, Response, NextFunction } from 'express';

export const catergories = async (
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

  const check = await Category.findOne({ category: req.body.category });
  if (check) {
    res.status(404).json({ message: 'category already exists' });
  }

  try {
    const newCatergory = await Category.create({
      category,
      subCategory,
    });
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

// export const allSubCategory = async (req:Req)
