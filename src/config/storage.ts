const IMAGES_MAX_SIZE = process.env.IMAGES_MAX_SIZE || 5
export const storageConfig = {
    uploadPath: process.env.NODE_ENV === 'production'
        ? 'your-cloud-storage-url'
        : 'src/uploads/missions',
    maxFileSize: IMAGES_MAX_SIZE as number * 1024 * 1024, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
};