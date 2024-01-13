import { Request, Response } from "express";

export const index = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  res.json({
    location: req.body.file
  })
}