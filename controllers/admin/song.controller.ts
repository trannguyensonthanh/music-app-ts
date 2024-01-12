import { Request, Response } from "express";
import Song from "../../models/song.model";

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