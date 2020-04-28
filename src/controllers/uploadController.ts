import { Request, Response } from "express";
export function uploadController() {
  function post(req: Request, res: Response) {
   
    res.status(201);
    return res.send("Method implementation required");
  }
  function get(req: Request, res: Response) {
    return res.send("Method implementation required");
  }
  return { post, get };
}