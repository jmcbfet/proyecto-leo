const router = require('express').Router()
const userController = require('../controllers/userController')

router.get("/find", userController.ListarUsuarios)
router.delete("/delete/:id", userController.EliminarUsuario)
router.put("/update/:id", userController.ActualizarUsuario)
router.post("/add", userController.AgregarUsuario)
router.post("/login", userController.LoginUsuario)
router.get("/getdata/:correo/:password", userController.ObtenerDatosUsuario)

module.exports = router