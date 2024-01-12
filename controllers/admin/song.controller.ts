import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

//[get] /admin/songs
export const index = async (req: Request, res: Response): Promise<void> =>{
const songs = await Song.find({
  deleted: false
})
console.log(songs)
res.render("admin/pages/songs/index", {
  pageTitle: "quản lí bài hát",
  songs: songs
});
};

//[get] /admin/songs/create
export const create = async (req: Request, res: Response): Promise<void> => {
  const topics = await Topic.find({
    status: "active",
   deleted: false 
  }).select("title")

  const singers = await Singer.find({
    status: "active",
    deleted: false 
  }).select("fullName")
res.render("admin/pages/songs/create", {
  pageTitle: "them moi bai hat",
  topics: topics,
  singers: singers,
})
}