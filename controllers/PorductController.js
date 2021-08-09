const Products = require('../models/Product');

const multer = require('multer');
const shortid = require('shortid');

const configMulter = {
    storage: fileStorage = multer.diskStorage({
        destination:(req,file,cb) => {
            cb(null, __dirname+'../../uploads');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb){
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null, true);
        }else{
            cb(new Error('Formato no valido'));
        }
    },
}

const upload = multer(configMulter).single('imagen');

//up archive
exports.upArchive = (req, res, next) => {
    upload(req,res, function(error){
        if(error){
            res.json({mesage: error})
        }
        return next();
    })
}



exports.newProduct = async (req,res,next) => {
    const product = new Products(req.body);
    try {
        if(req.file.filename){
            product.imagen = req.file.filename
        }

        await product.save();
        res.json({message: "Se agrego un nuevo producto"})
    } catch (error) {
        console.log(error);
        next();
    }
}