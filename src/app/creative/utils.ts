import fs from 'fs';
import path from 'path';

export function getClothingImages() {
    const directory = path.join(process.cwd(), 'public/assets/Clothing');
    const fileNames = fs.readdirSync(directory);
    return fileNames.filter(file => {
        const extension = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(extension);
    });
} 