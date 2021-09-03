const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    client:{
        type: Schema.ObjectId,
        ref:'Client'
    },
    order: [{
        product:{
            type: Schema.ObjectId,
            ref:'Product'
        },
        cant:Number
    }],
    total:{
        type: Number
    }

});

module.exports = mongoose.model('Orders', ordersSchema)