const router = require('express').Router()
const galeriasController = require('../controllers/galeriasController')

router.get("/find", galeriasController.ListarGaleria)
router.delete("/delete/:id", galeriasController.EliminarGaleria)
router.put("/update/:id", galeriasController.ActualizarGaleria)
router.post("/add", galeriasController.AgregarGaleria)

module.exports = router