import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";

const uploadToCloudinary = (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    console.log("Uploading image to Cloudinary...");

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "watchtower",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }

        console.log("Upload Success:", result?.secure_url);

        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default uploadToCloudinary;