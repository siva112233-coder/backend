    const mongoose = require('mongoose');
    require('dotenv').config();

    mongoose.connect(process.env.MONGODB_URI, {
    })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));

    
    const FileSchema = new mongoose.Schema({
        fileName: String,
        fileId: String,
        url: String,
        thumbnailUrl: String,
    });

    const File = mongoose.model('File', FileSchema);

    module.exports = File;