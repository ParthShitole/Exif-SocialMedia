const express = require('express');
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const originalFilePath = req.file.path;
  const modifiedFilePath = path.join(__dirname, 'modified', req.file.filename);

  try {
    // Read the original image file
    const image = sharp(originalFilePath);

    // Remove EXIF data and save the modified image
    await image.rotate().toFile(modifiedFilePath);

    // Send the modified image file as the response
    res.sendFile(modifiedFilePath);
  } catch (error) {
    console.error('Error removing EXIF data:', error);
    res.status(500).send('Error removing EXIF data');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
