const router = require('express').Router()
const comentariosController = require('../controllers/comentariosController')

router.get("/find", comentariosController.ListarComentarios)
router.get("/find/:id", comentariosController.ListarComentariosPorPlato)
router.delete("/delete/:id", comentariosController.EliminarComentario)
router.put("/update/:id", comentariosController.ActualizarComentario)
router.post("/add", comentariosController.AgregarComentario)

module.exports = router