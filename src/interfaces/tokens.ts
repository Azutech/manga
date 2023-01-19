import { Types } from 'mongoose';

type TokenType = {
  owner: Types.ObjectId;
  token: string;
  createdAt: Date;
};

export default TokenType;
