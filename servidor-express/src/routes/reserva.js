const router = require('express').Router()
const reservaController = require('../controllers/reservaController')

router.get("/find", reservaController.ListarReservas)
router.delete("/delete/:id", reservaController.EliminarReserva)
router.put("/update/:id", reservaController.ActualizarReserva)
router.post("/add", reservaController.AgregarReserva)

module.exports = router