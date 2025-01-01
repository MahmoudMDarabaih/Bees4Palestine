import multer from 'multer';
import path from 'path';
import { storageConfig } from '../config/storage';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storageConfig.uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `mission-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

export const uploadMiddleware = multer({
    storage,
    limits: {
        fileSize: storageConfig.maxFileSize
    },
    fileFilter: (req, file, cb) => {
        if (storageConfig.allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});