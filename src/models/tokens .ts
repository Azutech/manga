import mongoose, { model, Schema } from 'mongoose';
import TokenType from '../interfaces/tokens';
import User from './users';

const tokenSchema = new Schema<TokenType>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), expires: 3600 },
  },

  // { _id: false },

  { timestamps: true }
);
const Token = model('Token', tokenSchema);
export default Token;
