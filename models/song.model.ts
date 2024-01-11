import mongoose from 'mongoose';
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
  slug: String,
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
