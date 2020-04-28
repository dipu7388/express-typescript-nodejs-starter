import mongoose from 'mongoose';
const { Schema, Document } = mongoose;


export type BookModel = mongoose.Document & {
  
    title: string;
    author: string;
    genre: string;
    read: boolean;
};

const bookSchema= new Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false },
  }
);
export const Book = mongoose.model<BookModel>("Book", bookSchema);
