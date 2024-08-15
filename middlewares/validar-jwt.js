const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarJwt = (req, res = response, next) => {

    //x-key en los headers
    const token = req.header('x-key')
    
    if(!token) {
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la petición'
        })
    } 

    try {

        const {name, id} = jwt.verify(
            token,
            process.env.SECRETA
        );

        req.id = id;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'token no valido'
        })
    }

    next();

}

module.exports = {
    validarJwt
}