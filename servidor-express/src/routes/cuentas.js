const router = require('express').Router()
const cuentasController = require('../controllers/cuentasController')

router.get("/find", cuentasController.ListarCuentas)
router.get("/modal/:id_usuario/:id_mesa", cuentasController.ListarCuentaPorUsuarioYMesa)
router.get("/cuenta/:id_usuario/:id_mesa", cuentasController.ObtenerPrecioTotalCuenta)
router.get("/total/:id_usuario/:id_mesa/:id_cuenta", cuentasController.ObtenerPrecioPorPlato)
router.get("/find/:id_plato", cuentasController.ObtenerDatosDelPlato)
router.delete("/delete/:id", cuentasController.EliminarCuenta)
router.put("/update/:id", cuentasController.ActualizarCuenta)
router.post("/add", cuentasController.AgregarCuenta)
router.post("/grafica/:month", cuentasController.ObtenerPrecioPorAnoPorCadaMes)
router.get("/listar/anos", cuentasController.ListarAnos)


module.exports = router