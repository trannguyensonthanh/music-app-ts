import mongoose from 'mongoose';

export const connect = async (): Promise<void> => {
    try {
   await mongoose.connect(process.env.MONGO_URL); // chỉ là kết nối với mongodb thôi
   console.log("success")
    }
    catch(error) {
  console.log("error")
    }
} 