const Client = require('../models/Client');


exports.newClient = async (req,res) => {

    const client = new Client(req.body);

    try {
        await client.save();
        res.json({message:'Se agrego un nuevo cliente'})
    } catch (error) {
        console.log(error)
    }
}

exports.getClients = async(req,res,next) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    } catch (error) {
        console.log(error);
        next()
    }
}



exports.getClient = async(req,res,next) => {
   
        const client = await Client.findById(req.params.idClient);
        if (!client) {
            res.json({message:'Ese cliente no existe'});
            next();
        }
        res.json(client);
    
}
exports.updateClient = async(req,res,next) => {
   
    try {
        const client = await Client.findOneAndUpdate({_id :req.params.idClient}, req.body, {new:true});
        res.json(client);
    } catch (error) {
        console.log(error);
        next()
    }
    
}
exports.deleteClient = async(req,res,next) => {
   
    try {
        await Client.findOneAndDelete({_id : req.params.idClient});
        res.json({message: 'El cliente fue eliminado'});
    } catch (error) {
        console.log(error);
        next()
    }
    
}

exports.alive = async(req,res,next) => {
    try {
        const clients = 'is alive';
        res.json(clients);
    } catch (error) {
        console.log(error);
        next()
    }
}

exports.login = async(req,res,next) => {
    try {
        
        token = {
            "tokenNs": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGV2LXNlcnZpY2Utbm9zaXMucHJvdmluY2lhbmV0LmNvbS5hclwvXC9sb2dpbiIsImlhdCI6MTY5ODE1NzMzMSwiZXhwIjoxNjk4MTU4MjMxLCJuYmYiOjE2OTgxNTczMzEsImp0aSI6IjRhUjZ4eTU0V0lXSXRmZUgiLCJzdWIiOiJlNmM5ZDUyMC00YjNmLTExZWUtOWIxYS0wMzVjNWRjZDkxZTYiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.-0bPreGGzagxZeqOUPlGAvruZf2CJ4_vSXJZvVmACvU"
        }
        res.json(token);
    } catch (error) {
        console.log(error);
        next()
    }
}