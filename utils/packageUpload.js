const multer = require('multer');
const path = require('path');

// Set up storage configuration for package photos
const packageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/packages'); // Save the uploaded files in 'public/packages'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name based on timestamp
    }
});

const upload = multer({ storage: packageStorage });

module.exports = upload;  // Export the 'upload' middleware