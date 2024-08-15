const {response} = require('express')
const { pool } = require('../database/config')


const getCliente = async (req,res = response) => {

    //verificar que se tiene el usuario
    // console.log(req.body);

    const [clientes] = await pool.query('SELECT usuario, nombre FROM clientes')
    
    res.json({     

        ok: true,
        clientes
    })
  
}

const crearCliente = async (req,res = response) => {

    const { nombre, edad, fecha_nacimiento, sexo, trabajo, tipo_pago, sueldo, telefono } = req.body;

    try {
        
    const usuario = req.body
    const userId = req.id; // Obtener el ID del usuario desde el middleware
    
      await pool.query('INSERT INTO clientes (nombre, edad, fecha_nacimiento, sexo, trabajo, tipo_pago, sueldo, telefono,usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)', [nombre, edad, fecha_nacimiento,sexo,trabajo,tipo_pago,sueldo,telefono,userId]);


    res.json({     
        ok: true,
        user: usuario,
        userId
        
    })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
        });
    }

}


const actualizarCliente = async (req,res = response) => {

    const clienteId = req.params.id
    

    try {

        const [result] = await pool.query('SELECT * FROM clientes WHERE id = ?', [clienteId]);

        if (result.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun cliente con ese id'
            });
        }

        const actCliente = {
            ...req.body
        }

        await pool.query('UPDATE clientes SET ? WHERE id = ?',[actCliente, clienteId])

        res.json({
            ok:true,
            clienteId,
            actCliente
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
        });
    }

}


const eliminarCliente = async (req,res = response) => {

    
    
    
    try {
        const clienteId = req.params.id

        const [result] = await pool.query('SELECT * FROM clientes WHERE id = ?', [clienteId]);

        if (result.length === 0) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun cliente con ese id'
            });
        }

        await pool.query('DELETE FROM clientes where id = ?',[ clienteId])

        res.json({
            ok:true,
            msg: "Cliente eliminado correctamente"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
        });
    }
}


module.exports = {
    getCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}