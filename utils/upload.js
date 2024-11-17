const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Save the uploaded files in 'public/photos' directory
        cb(null, './public/photos');
    },
    filename: (req, file, cb) => {
        // Use the current timestamp to make the filename unique
        cb(null, Date.now() + path.extname(file.originalname)); // File name as timestamp + file extension
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

module.exports = upload;
