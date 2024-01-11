import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";


// [get] /search/result
export const result = async (req: Request, res: Response): Promise<void> => {
const keyword: string = `${req.query.keyword}`;
let newSongs = [];
if(keyword) {
  const keywordRegex = new RegExp(keyword, "i");
  // tạo slug không dấu có -
const stringSlug = convertToSlug(keyword);
const stringSlugRegex = new RegExp(stringSlug, "i");
console.log(stringSlug);
  

  const songs = await Song.find({
   $or: [
    {title: keywordRegex},
    {slug: stringSlugRegex}
   ]
  });
 for (const item of songs) {
   const infoSinger = await Singer.findOne({
 _id: item.singerId
   });
   item["infoSinger"] = infoSinger;
 }
 newSongs = songs;
}
res.render("client/pages/search/result", {
  pageTitle: `Kết quả: ${keyword}`,
  keyword: keyword,
  songs: newSongs
})
}