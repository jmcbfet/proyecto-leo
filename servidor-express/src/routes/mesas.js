const router = require('express').Router()
const mesasController = require('../controllers/mesasController')

router.get("/find", mesasController.ListarMesas)
router.get("/find/disponibles",mesasController.ListarMesasDisponibles)
router.delete("/delete/:id",mesasController.EliminarMesa)
router.put("/update/:id",mesasController.ActualizarMesa)
router.post("/add",mesasController.AgregarMesa)

module.exports = router