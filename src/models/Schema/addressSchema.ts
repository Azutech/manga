import { Schema } from 'mongoose';

export const AddressSchema = new Schema({
  streetAdress: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zipcode: {
    type: String,
  },

},
{ _id: false },
);
