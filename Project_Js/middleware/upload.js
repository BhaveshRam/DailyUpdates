const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) =>{
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ){ callback(null, true)}
        else{
            console.log("File type not supported!");
            callback(null,false)
        }
    },
    limits: {
        fileSize: 1024 * 1024 
    }
})

module.exports = {
    upload,
    storage
}