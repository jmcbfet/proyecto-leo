const router = require('express').Router()
const sugerenciasController = require('../controllers/sugerenciasController')

router.get("/find", sugerenciasController.ListarSugerencias)
router.delete("/delete/:id", sugerenciasController.EliminarSugerencia)
router.put("/update/:id", sugerenciasController.ActualizarSugerencia)
router.post("/add", sugerenciasController.AgregarSugerencia)

module.exports = router