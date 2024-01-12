import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";
// Đầu của file
import * as dotenv from 'dotenv';
dotenv.config();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
// end cloudinary

interface CloudinaryResult {
  url: string;
  // Các thuộc tính khác bạn có thể muốn thêm tùy thuộc vào nhu cầu
}

// hàm tạo chuỗi thông tin xử lí ảnh
let streamUpload = (buffer: Buffer): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream({resource_type: 'auto'},(error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
// kết thúc hàm tạo chuỗi thông tin xử lí ảnh

// hàm lấy url của ảnh
const uploadToCloudinary = async (buffer: Buffer): Promise<string> => {
  try {
    const result: CloudinaryResult = await streamUpload(buffer);
    return result["url"];
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
// kết thúc hàm lấy url của ảnh

export default uploadToCloudinary;
