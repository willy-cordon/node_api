const Users = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


exports.registerUser = async(req,res) => {
    
     const user = new Users(req.body);
     user.password = await bcrypt.hash(req.body.password, 12);

     try{

        await user.save();
        res.json({mensaje:'Usuario creado correctamente'});
        
     }catch (error){
         console.log(error);
         res.json({mensaje:'Hubo un error'})

     }
}

exports.authUser = async (req, res, next) => {

    //buscar usuario
    const {email,password} = req.body;
    const user = await Users.findOne({email});

    if(!user)
    {
        await res.status(401).json({mensaje:'No existe el usuario'})
        next();
    }else{
        if(!bcrypt.compareSync(password, user.password)){
            await res.status(401).json({mensaje:'Datos incorrectos'})
            next();
        }else{
            const token =jwt.sign({
                email: user.email,
                user: user.nombre,
                id: user._id                
            },'LLAVE SECRETA',{
                expiresIn: '1h'
            });
            res.json({token})
        }

    }

}