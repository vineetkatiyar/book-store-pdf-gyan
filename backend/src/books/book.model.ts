import mongoose from "mongoose";
import { BookType } from "./bookType";

const bookSchema = new mongoose.Schema<BookType>({
    title : {
        type : String,
        required: true,
        trim: true,
    },

    author : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    genre : {
        type : String,
        required: true,
        trim: true,
    },
    coverImageUrl : {
        type : String,
        required: true,
        trim: true,
    },
    file : {
        type : String,
        required: true,
        trim: true,
    },
},{
    timestamps: true,
})

const book = mongoose.model<BookType>("Book", bookSchema);
export default book;