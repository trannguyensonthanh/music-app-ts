import mongoose from 'mongoose';
import slug from "mongoose-slug-updater";

mongoose.plugin(slug); 

const songSchema = new mongoose.Schema({
    
  title: String,
  status: String,
  avatar: String,
  description: String,
  singerId: String,
  topicId: String,
  like: Number,
  listen: {
    type: Number,
    default: 0
  },
  lyrics: String,
  audio: String,
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
  }, {
    timestamps: true // thời gian tạo và cập nhật
  });

const Song = mongoose.model("Song", songSchema, "songs"); 

export default Song;  
