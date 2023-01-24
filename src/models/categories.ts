import { Schema } from "mongoose";

const categorySchema  = new Schema ({
    category : {
        type: String,
        required : true
    },

    subCategory : {
        type: String,
        required : true
    }
})