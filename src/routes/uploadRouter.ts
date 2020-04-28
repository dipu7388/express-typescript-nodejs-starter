/* eslint-disable no-param-reassign */
import express, { Request, Response, NextFunction } from "express";
import { uploadController } from "../controllers/uploadController";
export const  uploadRoutes=() => {
  const uploadRouter = express.Router();
  const controller = uploadController();
  uploadRouter.route('/')
    .post(controller.post)
    .get(controller.get);
  return uploadRouter;
};

