const jwt = require('jsonwebtoken');

const generarJwt = (name, id) => {

    return new Promise((resolve, reject) => {

        const payload = {name,id};

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: '2h'
        },(err, token)=> {

            if(err) {
                console.log(err)
                reject('No se pudo generar el token')
            }

            resolve(token);

        })

    })


}

module.exports = {
    generarJwt
}