import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.join(process.cwd(), 'public/assets/home/hero');

const variants = [
    { width: 480, suffix: '-480' },
    { width: 768, suffix: '-768' }
];

async function processImages() {
    const files = fs.readdirSync(inputDir).filter(f => f.match(/^hero-\d+\.webp$/));

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        console.log(`Processing ${file}...`);

        // Original image: just compress it
        // Use a buffer for both input and output to avoid EPERM rename issues on Windows
        const inputBuffer = fs.readFileSync(inputPath);
        const outputBuffer = await sharp(inputBuffer)
            .webp({ quality: 80, effort: 6 })
            .toBuffer();

        fs.writeFileSync(inputPath, outputBuffer);
        console.log(`  Compressed original to quality 80`);

        const parsed = path.parse(file);

        // Responsive variants
        for (const variant of variants) {
            const variantPath = path.join(inputDir, `${parsed.name}${variant.suffix}${parsed.ext}`);
            await sharp(inputPath)
                .resize({ width: variant.width, withoutEnlargement: true })
                .webp({ quality: 80, effort: 6 })
                .toFile(variantPath);

            console.log(`  Created variant ${variant.suffix}`);
        }
    }
}

processImages().catch(err => {
    console.error(err);
    process.exit(1);
});
