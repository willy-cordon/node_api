const Order = require('../models/Order');

exports.newOrder = async(req, res, next) => {
    const order = new Order(req.body);
    try {
        await order.save();
        res.json({message:'Se agrego correctamente el pedido'})
    } catch (error) {
        console.log(error);
        next();
    }
}
exports.getOrders = async(req, res, next) => {
    try {
        
        const orders =await Order.find({}).populate('client').populate({
            path:'order.product',
            model:'Product'
        }); // populate, hacer relacion mediante lo espesificado en el modelo
        res.json(orders)
        
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getOrderById = async(req, res, next) => {

  const order = await Order.findById(req.params.idOrder).populate('client').populate({
    path:'order.product',
    model:'Product'
}); // populate, hacer relacion mediante lo espesificado en el modelo
  if(!order)
  {
      res.json({message:'Este pedido no existe'});
      return next();
  }

  res.json(order)
}
exports.updateOrder = async(req, res, next) => {

    try {
        
       let order = await Order.findOneAndUpdate({_id: req.params.idOrder}, req.body,{
           new: true
       })
       .populate('client')
       .populate({
        path:'order.product',
        model:'Product'
    }); // populate, hacer relacion mediante lo espesificado en el modelo

       res.json(order);
        
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.deleteOrder = async(req,res,next) => {
   
    try {
        await Order.findOneAndDelete({_id : req.params.idOrder});
        res.json({message: 'El pedido fue eliminado'});
    } catch (error) {
        console.log(error);
        next()
    }
    
}