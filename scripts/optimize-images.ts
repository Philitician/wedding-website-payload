import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const inputDir = path.join(__dirname, 'input')
const outputDir = path.join(__dirname, 'output')

async function optimizeImages() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true })

    // Read all files from input directory
    const files = await fs.readdir(inputDir)

    // Filter for image files (you can add more extensions if needed)
    const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif)$/i.test(file))

    console.log(`Found ${imageFiles.length} images to process`)

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file)
      const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`)

      console.log(`Processing: ${file}`)

      await sharp(inputPath)
        .webp({
          quality: 80, // Adjust quality as needed (0-100)
          effort: 4, // Compression effort (0-6)
        })
        .toFile(outputPath)

      console.log(`Converted ${file} to WebP`)
    }

    console.log('Image optimization complete!')
  } catch (error) {
    console.error('Error optimizing images:', error)
    process.exit(1)
  }
}

optimizeImages()
