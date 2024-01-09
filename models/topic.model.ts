import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
    
title: String,
status: String,
avatar: String,
description: String,
slug: String,
deleted: {
  type: Boolean,
  default: false
},
deletedAt: Date
}, {
  timestamps: true // thời gian tạo và cập nhật
});

const Topic = mongoose.model("Topic", taskSchema, "topics"); 

export default Topic;  
