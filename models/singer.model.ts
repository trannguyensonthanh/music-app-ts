import mongoose from 'mongoose';
const singerSchema = new mongoose.Schema({
    
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

const Singer = mongoose.model("Singer", singerSchema, "singers"); 

export default Singer;  
