import { Schema, model } from 'mongoose';
import UserType from '../interfaces/usertype';
import { AddressSchema } from './Schema/addressSchema';

const userSchema = new Schema<UserType>(
  {
    googleId: {
      type: String,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },

    verificationCode: {
      type: String,
      select: true,
    },

    refreshtoken: {
      type: String,
      index: true,
    },

    address: {
      type: AddressSchema,
      default: {},
    },

    shippingAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = model('user', userSchema);
export default User;
