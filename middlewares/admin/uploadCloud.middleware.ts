import { NextFunction, Request, Response } from "express";
import uploadToCloudinary from "../../helpers/uploadToCloudinary"

export const uploadSingle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req["file"]) {
    const result = await uploadToCloudinary(req["file"].buffer);
    req.body[req["file"].fieldname] = result;
  } 

  next();
};

export const uploadFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  for (const key in req["files"]){
    req.body[key] = [];

    const array = req["files"][key];
    for(const item of array){
      try {
        const result = await uploadToCloudinary(item.buffer);
        req.body[key].push(result);
      } catch (error){
        console.log(error);
      }
    }
  }
  next();
};