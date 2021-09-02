const Products = require('../models/Product');

const multer = require('multer');
const shortid = require('shortid');
const Product = require('../models/Product');

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
exports.getProducts = async (req,res,next) => {
    
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getProduct = async (req,res,next) => {
    const product = new Products(req.body);
    try {
        const product = await Product.findById(req.params.idProduct);
        if(!product)
        {
           res.json({message:'el producto no existe'});     
        }

        res.json(product);
    } catch (error) {
        console.log(error);
        next();
    }
}
//update producto
exports.updateProduct = async (req,res,next) => {
    const product = new Products(req.body);
    try {

        //build new product
        let newProduct = req.body;
        //verificar imagen nueva
        if(req.file)
        {
            newProduct.imagen = req.file.filename;
        }else{
            let productOld = await Product.findById(req.params.idProduct);
            newProduct.imagen = productOld.imagen;
        }
        let product = await Product.findOneAndUpdate({_id: req.params.idProduct}, newProduct, {
            new : true
        })

        res.json(product);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deleteProduct = async(req,res,next) => {
   
    try {
        await Product.findOneAndDelete({_id : req.params.idProduct});
        res.json({message: 'El producto fue eliminado'});
    } catch (error) {
        console.log(error);
        next()
    }
    
}