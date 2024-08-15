const express = require('express');
// const { dbConexion } = require('./database/config');
var cors = require('cors')



//crear el servidor de express
const app = express();

//base de datos
// dbConexion()

//cors
app.use(cors())

//directorio publlco
app.use(express.static('public'));

// lectura y parsea del body
app.use(express.json()); // las peticiones que vengan en json las recibe y extrae la info de ahi

//rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/clientes', require('./routes/clientes'))
//TODO CRUD: Eventos


//escuchar peticiones
app.listen(process.env.PORT,() =>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})