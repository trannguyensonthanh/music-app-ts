
import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

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