const mysql = require('mysql2/promise');
const { generarJwt } = require('../helpers/jwt');
const { pool } = require('../database/config');

require("dotenv").config();

// const pool = mysql.createPool({
//     host: process.env.DBHOST,
//     user: process.env.DBUSER,
//     password: process.env.DBPASSWORD,
//     database: process.env.DATABASE
// });

const crearUsuario = async (req, res = response) => {
    const { name, email, contraseña } = req.body;


    try {
        // Verificar si el correo ya existe
        const [result] = await pool.query('SELECT email FROM usuarios WHERE email = ?', [email]);

        if (result.length > 0) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese correo ya existe'
            });
        }
      
        // Si no existe, proceder con la inserción
            await pool.query('INSERT INTO usuarios (name, email, contraseña) VALUES (?, ?, ?)', [name, email, contraseña]);

            const [resultId] = await pool.query('SELECT name,id FROM usuarios WHERE email = ?', [email]);

            const usuario = resultId[0]

        //generar el token
        const token = await generarJwt(usuario.name, usuario.id);

        // Responder con éxito
        res.status(201).json({
            ok: true,
            name: usuario.name,
            id: usuario.id,
            token 
        });
 
    } catch (error) {
        // Verificar si el error es debido a un correo duplicado
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                ok: false,
                msg: 'Ese correo ya está registrado',
            });
        }

        // Manejar otros posibles errores
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
        });
    }
}


const LoginUsuario = async (req, res = response) => {

    const {email, contraseña} = req.body;

    try {
        const [result] = await pool.query('SELECT id,name,email,contraseña  FROM usuarios WHERE email = ?', [email]);

        if (result.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe ningun usuario con ese correo'
            });
        }
        const usuario = result[0];

        if (usuario.contraseña !== contraseña) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña equivocada'
            });
        }

        //generar jwt

        const token = await generarJwt(usuario.name, usuario.id);

        res.json({
            ok: true,
            name: usuario.name,
            id: usuario.id,
            token
        })

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
        });
    }
}

const RevalidarToken = async (req, res = response) => {

    const id = req.id;
    const name = req.name;

    //generar un jwt
    const token = await generarJwt(name, id)
    res.json({
        ok:true,
        token
    });
}


module.exports = {
    crearUsuario,
    LoginUsuario,
    RevalidarToken,

}