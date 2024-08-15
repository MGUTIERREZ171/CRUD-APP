/*
    Rutas de usuario / auth
    host + /api/auth
*/
const {Router} = require('express');
const {check} = require('express-validator')
const { validarJwt } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const {crearUsuario,LoginUsuario,RevalidarToken} = require('../controllers/auth');

const router = Router();

router.post('/new',
    [
        //middlewares validacion
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('contraseña', 'La contraseña debe de ser de minimo 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
     crearUsuario)

router.post('/',
     [
        
        check('email', 'El correo es obligatorio').isEmail(),
        check('contraseña', 'La contraseña debe de ser de minimo 6 caracteres').isLength({min: 6}),
        validarCampos
     ],
     LoginUsuario)

router.get('/token', validarJwt, RevalidarToken);


module.exports = router;