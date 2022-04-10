const mongoose =require('mongoose')
var mediaFileSchema = new mongoose.Schema({
    mediaSerial: { type: String },
    mediaFileName: { type: String },
    // courseCode: { type: String },
    // moduleCode: {type:String, default: "None"},
    mediaTitle: { type: String },
    mediaDescription: { type: String },
    mediaType: { type: String },
    uploadDate: { type: Date, default: Date.now() }
});

module.exports = mediaFileSchema