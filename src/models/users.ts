import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  full_name: {
    type: String,
    required: true,
    trim: true,
  },

  email : {
    type: String,
    required: true,
    trim : true
  },
  
  password : {
    type: String,
    required: true,
    trim: true
  },

  mobileNumber : {
    type : String,
    required: true,
    trim : true
  },

  is_Active : {
    type: Boolean,
    required: false
  },
    
},
{ timestamps: true }
);
