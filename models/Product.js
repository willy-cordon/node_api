const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    nombre:{
        type:String,
        trim:true
    },
    descripcion:{
        type:String,
    },
    url:{
        type:String
    },
    imagen:{
        type:String,
    }

});
module.exports = mongoose.model('Product', productsSchema)