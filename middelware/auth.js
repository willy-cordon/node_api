const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader)
    {
        const error = new Error('No autenticado');
        error.statusCorde = 401;
        throw error;
    }
    
    const token = authHeader.split(' ')[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token, '48ACBF421DAADF991B83E0CEA63FAA32CBF337944B7C37BDE5BE16801CB8259F')
    } catch (error) {
        error.statusCorde = 500;
        throw error;
    }
    
    if (!revisarToken) {
        const error = new Error('No autenticado');
        error.statusCorde = 401;
        throw error;
    }

    next();

}