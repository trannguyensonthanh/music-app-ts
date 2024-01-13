import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/system";

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

export const createPost = async(req: Request, res: Response): Promise<void> => {
  let avatar = '';
  let audio = '';
  if(req.body.avatar){
    avatar = req.body.avatar[0];
  }
  if(req.body.audio){
    audio = req.body.audio[0];
  }
const dataSong = {
  title: req.body.title,
  topicId: req.body.topicId,
  singerId: req.body.singerId,
  description: req.body.description,
  status: req.body.status,
  avatar: avatar,
  audio: audio,
  lyrics: req.body.lyrics
};
const song = new Song(dataSong);
await song.save();
res.redirect(`${systemConfig.prefixAdmin}/songs`);

}