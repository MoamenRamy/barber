const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');
const AppError = require("../utils/AppError");

// Configure S3 client for DigitalOcean Spaces
const s3Client = new S3Client({
    endpoint: process.env.DO_SPACES_ENDPOINT,
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET
    },
    forcePathStyle: true // Required for DigitalOcean Spaces
});

// Configure multer-s3
const s3Storage = multerS3({
    s3: s3Client,
    bucket: process.env.DO_SPACES_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `photos/${uniqueSuffix}-${file.originalname}`);
    }
});

// Create multer upload middleware
const upload = multer({
    storage: s3Storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new AppError('Only image files are allowed!', 400), false);
        }
        cb(null, true);
    }
});

module.exports = upload;