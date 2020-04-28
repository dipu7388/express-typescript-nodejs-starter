"use strict";

import graph from "fbgraph";
import { Response, Request, NextFunction } from "express";
import { UserDocument } from "../models/User";
import { Book } from "../models/bookModel";
import { bookRoutes } from "../routes/bookRouter";
const BookRoutes = bookRoutes(Book);
import express from "express";
import { uploadRoutes } from "../routes/uploadRouter";

const router = express.Router();
const uploadRouter= uploadRoutes();
/**
 * GET /api
 * List of API examples.
 */
export const getApi = (req: Request, res: Response) => {
  res.render("api/index", {
    title: "API Examples",
  });
};
/**
 * GET /api/facebook
 * Facebook API example.
 */
export const getFacebook = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as UserDocument;
  const token = user.tokens.find((token: any) => token.kind === "facebook");
  graph.setAccessToken(token.accessToken);
  graph.get(
    `${user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`,
    (err: Error, results: graph.FacebookUser) => {
      if (err) {
        return next(err);
      }
      res.render("api/facebook", {
        title: "Facebook API",
        profile: results,
      });
    }
  );
};
router.get("/", (req: Request, res: Response) => {
  res.render("api/index", {
    title: "API Examples",
  });
});

router.use("/book", BookRoutes);
router.use("/upload", uploadRouter);
export const ApiRouter = router;
