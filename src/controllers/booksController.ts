import { Request, Response } from "express";
import { Error } from "mongoose";
export function booksController(Book: any) {
  function post(req: Request, res: Response) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }
    book.save();
    res.status(201);
    return res.json(book);
  }
  function get(req: Request, res: Response) {
    const query = Object.create({});
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err: Error, books: { toJSON: () => any;
       _id: any; }[]) => {
      if (err) {
        return res.send(err);
      }
      const returnBooks = books.map((book: { toJSON: () => any; _id: any }) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/book/${book._id}`;
        return newBook;
      });
      return res.json(returnBooks);
    });
  }
  return { post, get };
}

// module.exports = booksController;
