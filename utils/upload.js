const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Save the uploaded files in 'public/photos' directory
        cb(null, './utils/public/photos');
    },
    filename: (req, file, cb) => {
        // Use the current timestamp to make the filename unique
        cb(null, Date.now() + path.extname(file.originalname)); // File name as timestamp + file extension
    }
});

// Initialize multer for single file upload
const singleUpload = multer({ storage }).single('photo');

// Initialize multer for multiple file uploads
const multipleUpload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Example file size limit (10 MB)
}).array('photos'); // Specify the field name as 'photos' to handle multiple files

module.exports = {
    singleUpload,
    multipleUpload
};
