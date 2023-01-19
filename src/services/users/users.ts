import User from '../../models/users';
import AppError from '../../errors/errors';
import { Request, Response, NextFunction } from 'express';
import { nextTick } from 'process';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await User.find()
      .exec()
      .catch((err) => {});
    if (!allUsers) return next(new AppError('Unable to retreive users', 404));
    return res.status(202).json({
      success: true,
      message: 'All users has been retrieved',
      data: allUsers,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError('Unable to retreive users', 502));
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const getThisUser = await User.findOne({ _id: id })
      .exec()
      .catch((err) => {});
    if (!getThisUser)
      return next(new AppError('Unable to retrieve this User', 404));
    return res.status(200).json({
      success: true,
      message: 'All users has been retrieved',
      data: getThisUser,
    });
  } catch (err) {
    console.log(err);
    return next(new AppError(`Unable to retreive this user ${err}`, 502));
  }
};

export const destroyerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const removeUser = await User.findOneAndDelete({ _id: id });
  if (!removeUser)
    return next(new AppError('Unable to perform this function', 404));

  return res.status(200).json({
    success: true,
    message: `user with this id ${id} has been deleted`,
    data: removeUser,
  });
};

export const personalInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { address, city, state, zipcode } = req.body;

  if (!(address || city || state || zipcode)) {
    return res.status(201).json({
      message: 'Input required parameters',
    });
  }

  try {
    const founderUser = await User.findOne({ _id: id });

    if (!founderUser) return next(new AppError('user not found', 404));

    const update = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          shippingAddress: address,
          'address.city': city,
          'address.state': state,
          'address.zipcode': zipcode,
        },
      }
    );

    console.log(update);
    return res.status(200).json({
      message: 'Shipping address has been updated',
      status: true,
      data: update,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
