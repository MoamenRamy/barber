const multer = require('multer');
const path = require('path');

// Set up storage configuration for package photos
const userStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'users')); // Ensure correct path
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name based on timestamp
    }
});

const upload = multer({ storage: userStorage });

module.exports = upload;
