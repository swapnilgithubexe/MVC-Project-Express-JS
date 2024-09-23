// Import the multer middleware for handling multipart/form-data, primarily used for file uploads
import multer from "multer";

// Configure the storage settings for multer
const storageConfig = multer.diskStorage({
  // Define where uploaded files should be stored
  destination: (req, file, cb) => {
    // Set the destination folder to "public/images"
    cb(null, "public/images");
  },
  // Define how uploaded files should be named
  filename: (req, file, cb) => {
    // Generate a unique filename using the current timestamp and the original filename
    const name = Date.now() + "-" + file.originalname
    cb(null, name)
  }
});

// Create and export a multer middleware instance with the defined storage configuration
export const uploadFile = multer({ storage: storageConfig })