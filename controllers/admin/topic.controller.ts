import { Request, Response } from "express"
import Topic from "../../models/topic.model"

export const index = async (req: Request, res: Response): Promise<void> => {
  const topics = await Topic.find({
    deleted: false
  });
  console.log(topics);
  res.render("admin/pages/topics/index", {
    pageTitle: "Quản lí chủ đề",
    topics: topics
  })
}