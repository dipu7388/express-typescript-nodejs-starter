/* eslint-disable no-param-reassign */
import express, { Request, Response, NextFunction } from "express";
import { booksController } from "../controllers/booksController";

export const  bookRoutes=(Book: any) => {
  const bookRouter = express.Router();
  const controller = booksController(Book);
  bookRouter.route('/')
    .post(controller.post)
    .get(controller.get);
  bookRouter.use('/:bookId', (req: Request & {book: any }, res: Response, next: NextFunction) => {
    Book.findById(req.params.bookId, (err: any, book: any) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter.route('/:bookId')
    .get((req: Request & {book: any }, res) => {
      const returnBook = req.book.toJSON();

      returnBook.links = {};
      const genre = req.book.genre.replace(' ', '%20');
      returnBook.links.FilterByThisGenre = `http://${req.headers.host}/api/books/?genre=${genre}`;
      res.json(returnBook);
    })
    .put((req: Request & {book: any }, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      req.book.save((err: any) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req: Request & {book: any }, res) => {
      const { book } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      req.book.save((err: any) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req: Request & {book: any }, res) => {
      req.book.remove((err: any) => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });
  return bookRouter;
};

