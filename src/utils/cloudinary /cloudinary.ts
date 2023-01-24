import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const fileUploader = (file: string, folder: string) => {
  new Promise((resolve) => {
    cloudinary.uploader
      .upload(file, {
        resource_type: 'auto',
        folder: `${folder}/`,
      })

      .then((result) => resolve(result));
  });
};
