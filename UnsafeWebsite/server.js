const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files

const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));


app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  const outputFilePath = path.join(__dirname, req.file.path);

  res.sendFile(outputFilePath);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
