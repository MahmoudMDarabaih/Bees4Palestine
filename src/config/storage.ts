export const storageConfig = {
    uploadPath: process.env.NODE_ENV === 'production'
        ? 'your-cloud-storage-url'
        : 'src/uploads/missions',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
};