import User from "../../models/users";
import AppError from "../../errors/errors";
import {Request, Response, NextFunction } from "express";




export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allUsers = await User.find().exec().catch((err) => {})
        if(!allUsers) return next(new AppError('Unable to retreive users', 404))
        return res.status(202).json({
            success: true,
            message: 'All users has been retrieved',
            data: allUsers
        })
    } catch (err) {
        console.log(err)
        return next(new AppError('Unable to retreive users', 502))
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params
    try {
        const getThisUser = await User.findOne({_id: id}).exec().catch((err) => {})
        if (!getThisUser) return next(new AppError('Unable to retrieve this User', 404))
        return res.status(200).json({
            success: true,
            message: 'All users has been retrieved',
            data: getThisUser
        })
    } catch (err) {
        console.log(err)
        return next(new AppError(`Unable to retreive this user ${err}`, 502))
        
    }
}

