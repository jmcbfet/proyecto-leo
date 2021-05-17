const router = require('express').Router()
const platosController = require('../controllers/platosController')

router.get("/find", platosController.ListarPlatos)
router.delete("/delete/:id", platosController.EliminarPlato)
router.put("/update/:id", platosController.ActualizarPlato)
router.post("/add", platosController.AgregarPlato)

module.exports = router