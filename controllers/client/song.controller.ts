
import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [get] /songs/:slugTopic
export const list = async (req: Request, res: Response): Promise<void> => {
try {
  const topic = await Topic.findOne({
slug: req.params.slugTopic,
status: "active",
deleted: false
});
console.log(topic);
const songs = await Song.find({
  deleted: false,
  status: "active",
  topicId: topic._id
}).select("avatar title slug singerId like")

for(const song of songs){
  const infoSinger = await Singer.findOne({
    _id: song.singerId,
    deleted: false,
    status: "active"
  })
  song["infoSinger"] = infoSinger;
}

res.render("client/pages/songs/list", {
  pageTitle: "danh sách bài hát",
  songs: songs
})
} catch(error) {
  res.redirect("/");
}

}

// [get] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response): Promise<void> => {
  const slugSong: string = req.params.slugSong;
  const song = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false
  })
  
  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false
  }).select("fullName");
  
  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false
  }).select("title");
  console.log(topic);
  res.render("client/pages/songs/detail", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic
  })

}
// [patch] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response): Promise<void> => {
 const idSong: String = req.params.idSong;
 const typeLike: String = req.params.typeLike;
  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false
  })

  const newLike: number = typeLike == "like" ? song.like + 1 : song.like -  1;
  await Song.updateOne({
   _id: idSong,

  }, {
    like: newLike
  });

  res.json({
    code: 200,
    message: "Thành công!",
    newLike: newLike
  });
}