import { Request, Response } from "express";
import Topic from "../../models/topic.model";

export const topic = async(req: Request, res: Response): Promise<void> => {
  const topics = await Topic.find({
    deleted: false
  });
  console.log(topics);
 res.render("client/pages/topics/index.pug", {
  pageTitle: "chủ đề bài hát"
 });
}