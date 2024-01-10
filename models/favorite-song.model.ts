import mongoose from 'mongoose';
const favoriteSongSchema = new mongoose.Schema({
    
fullName: String,
status: String,
avatar: String,
slug: String,
deleted: {
  type: Boolean,
  default: false
},
deletedAt: Date
}, {
  timestamps: true // thời gian tạo và cập nhật
});

const FavoriteSong = mongoose.model("FavoriteSong", favoriteSongSchema, "favorite-songs"); 

export default FavoriteSong;  
