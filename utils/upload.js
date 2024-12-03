const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const path = require('path');

// Initialize S3Client for DigitalOcean Spaces
const s3 = new S3Client({
    endpoint: 'https://nyc3.digitaloceanspaces.com', // DigitalOcean region endpoint
    region: 'nyc3', // DigitalOcean Spaces region
    credentials: {
        accessKeyId: process.env.SPACES_KEY, // Use your access key
        secretAccessKey: process.env.SPACES_SECRET // Use your secret key
    }
});

// Set up storage configuration for DigitalOcean Spaces using multer-s3
const storage = multerS3({
    s3: s3,
    bucket: 'salonbarber', // Your DigitalOcean Space name
    acl: 'public-read', // Makes the file publicly readable
    key: (req, file, cb) => {
        // Generate a unique file name using timestamp + file extension
        cb(null, `photos/${Date.now()}${path.extname(file.originalname)}`); // Set the file path in Space
    }
});

// Initialize multer for multiple file uploads (for multiple photos)
const multipleUpload = multer({
    storage,
    limits: { 
        fileSize: 10 * 1024 * 1024 // Example file size limit (10 MB)
    },
    // Custom fileFilter function to check the number of files
    fileFilter: (req, file, cb) => {
        if (req.files && req.files.length >= 11) {
            return cb(new Error('Cannot upload more than 10 files.'));
        }
        cb(null, true);
    }
}).array('photos'); // Handle multiple files with the field name 'photos'

module.exports = {
    multipleUpload
};
