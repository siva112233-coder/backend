    const express = require('express');
    const multer = require('multer');
    const image = require('./image');
    const File = require('./database'); 
    const app = express();
   const path = require('path');
   const fs = require('fs');
const { url } = require('inspector');
    const upload = multer({ storage: multer.memoryStorage() });
    app.post('/upload', upload.single('file'), async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }
            const uploadit = await image.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
            });
            const newFile = new File({
                fileName: uploadit.name,
                fileId: uploadit.fileId,
                url: uploadit.url,
                thumbnailUrl: uploadit.thumbnailUrl,
            });
            await newFile.save();

            res.status(200).json({
                message: 'File uploaded and saved successfully!',
                // imagekitData: uploadit,
                // mongoData: newFile
            });

        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).send('Server error during upload.');
        }
    });
   app.post('/files', async (req, res) => {
  try {
    const info = await File.find();
    console.log(info);
    return res.json(info);

  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).send('Error fetching files'); 
  }
});
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));