 
var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')
var mkdirp = require('mkdirp');
mkdirp('uploads/test/');
var s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})
// aws.config.update({
//     accessKeyId: 'YOUR-ACCESS_KEY',
//     secretAccessKey: 'YOUR_SECRET-ACCESS_KEY'
// });

var localstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/test/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true)
    } else {
        return cb('jpeg,jpg ,png file are allowed',false)
    }
}

const storage = multerS3({
    s3: s3,
    bucket: 'yourbucketname',
    acl: 'public-read ',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]) //image name with timestamp
    }
})
var upload = multer({
    storage: storage,
    fileFilter:fileFilter,
}).single('image')


var local_upload = multer({
    storage:localstorage,
    fileFilter: fileFilter,
}).array('photos', 5)




module.exports.upload = upload ; 
module.exports.local_upload=local_upload;
 
