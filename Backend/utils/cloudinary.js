// cloudinary.js - Configuration and utilities
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import fs from 'fs'

// Configure Cloudinary
cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
      folder: 'user-profiles', // Folder in Cloudinary
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [
         { width: 400, height: 400, crop: 'fill' }, // Resize to 400x400
         { quality: 'auto:good' } // Optimize quality
      ]
   }
});

// Alternative: Local storage first, then upload to Cloudinary
const localStorage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads/temp')
   },
   filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
   }
});

// Multer configuration for direct Cloudinary upload
export const uploadToCloudinary = multer({
   storage: storage,
   limits: {
      fileSize: 5 * 1024 * 1024 // 5MB limit
   },
   fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
         cb(null, true);
      } else {
         cb(new Error('Only image files are allowed!'), false);
      }
   }
});

// Multer configuration for local upload
export const uploadLocal = multer({
   storage: localStorage,
   limits: {
      fileSize: 5 * 1024 * 1024 // 5MB limit
   },
   fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
         cb(null, true);
      } else {
         cb(new Error('Only image files are allowed!'), false);
      }
   }
});

// Function to upload file to Cloudinary (for local upload approach)
export const uploadImageToCloudinary = async (filePath, folder = 'user-profiles') => {
   try {
      const result = await cloudinary.uploader.upload(filePath, {
         folder: folder,
         transformation: [
            { width: 400, height: 400, crop: 'fill' },
            { quality: 'auto:good' }
         ]
      });

      // Delete the local file after successful upload
      fs.unlinkSync(filePath);

      return {
         url: result.secure_url,
         publicId: result.public_id
      };
   } catch (error) {
      // Delete the local file even if upload fails
      if (fs.existsSync(filePath)) {
         fs.unlinkSync(filePath);
      }
      throw error;
   }
};

// Function to delete image from Cloudinary
export const deleteImageFromCloudinary = async (publicId) => {
   try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
   } catch (error) {
      throw error;
   }
};

export default cloudinary;