/*
    Users Routes
    /api/events
*/

const {Router} = require ('express')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {validarJwt} = require('../middlewares/validar-jwt')
const {getCliente,crearCliente,actualizarCliente,eliminarCliente} = require('../controllers/clientes');

const router = Router();

//todas tienen que pasar por la validacion del jwt
router.use(validarJwt); //cualquier peticion que se encuentre debajo necesita del token

//obtener eventos
router.get('/', 
    [

    ],
    getCliente)

//crear un nuevo usuario
router.post('/',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('edad','La edad es obligatoria').not().isEmpty().isInt(),
        check('fecha_nacimiento','La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('sexo','El sexo es obligatorio').not().isEmpty(),
        check('trabajo','El trabajo es obligatorio').not().isEmpty(),
        check('tipo_pago','El pago es obligatorio').not().isEmpty(),
        check('sueldo','El sueldo es obligatorio').not().isEmpty().isInt(),
        check('telefono','El telefono es obligatorio').not().isEmpty().isInt().isLength({min:10}).isLength({max:10}),
        validarCampos
    ]
    ,crearCliente)

//actualizar usuario
router.put('/:id',
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('edad','La edad es obligatoria').not().isEmpty().isInt(),
        check('fecha_nacimiento','La fecha de nacimiento es obligatoria').not().isEmpty(),
        check('sexo','El sexo es obligatorio').not().isEmpty(),
        check('trabajo','El trabajo es obligatorio').not().isEmpty(),
        check('tipo_pago','El pago es obligatorio').not().isEmpty(),
        check('sueldo','El sueldo es obligatorio').not().isEmpty().isInt(),
        check('telefono','El telefono es obligatorio').not().isEmpty().isInt().isLength({min:10}).isLength({max:10}),
        validarCampos
    ],
    actualizarCliente)

//eliminar usuario
router.delete('/:id',eliminarCliente)

module.exports = router;