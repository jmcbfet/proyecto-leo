package services

import (
	"fmt"
	"net/http"
	"proyectos/proyecto-leo/servidor/database"
	"proyectos/proyecto-leo/servidor/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ListarCuentas(c *gin.Context) {

	database.DBConnection()

	var cuentas []models.Cuenta

	err := database.DBClient.Select(&cuentas, "SELECT c.id_cuenta, u.id_usuario, m.descripcion, p.nombre, p.precio, u.apellido FROM cuentas c, mesas m, platos p, usuarios u WHERE c.id_mesa = m.id_mesa AND c.id_plato = p.id_plato AND c.id_usuario = u.id_usuario")

	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, cuentas)

}

func ListarCuentaPorUsuario(c *gin.Context) {

	database.DBConnection()

	idUsuarioStr := c.Param("id_usuario")
	idUsuario, err := strconv.Atoi(idUsuarioStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	idMesaStr := c.Param("id_mesa")
	idMesa, err2 := strconv.Atoi(idMesaStr)

	if err2 != nil {
		fmt.Println(err2.Error())
	}

	fmt.Println(idUsuario)
	fmt.Println(idMesa)

	var cuentas []models.Cuenta

	err3 := database.DBClient.Select(&cuentas, "SELECT c.id_cuenta, m.descripcion, p.nombre, p.precio, u.apellido FROM cuentas c, mesas m, platos p, usuarios u WHERE c.id_mesa = m.id_mesa AND c.id_plato = p.id_plato AND c.id_usuario = u.id_usuario AND u.id_usuario = ? AND c.id_mesa = ?",
		idUsuario,
		idMesa,
	)

	if err != nil {
		fmt.Println(err3.Error())
	}

	c.JSON(200, cuentas)

}

func ConsultaParaActualizar(c *gin.Context) {

	database.DBConnection()

	idPlatoStr := c.Param("id_plato")
	idPlato, err := strconv.Atoi(idPlatoStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	var cuentas []models.Cuenta

	err2 := database.DBClient.Select(&cuentas, "SELECT c.id_cuenta, m.descripcion, p.nombre, p.precio, u.apellido FROM cuentas c, mesas m, platos p, usuarios u WHERE c.id_mesa = m.id_mesa AND c.id_plato = p.id_plato AND c.id_usuario = u.id_usuario AND p.id_plato = ? ORDER BY c.id_cuenta DESC LIMIT 1",
		idPlato,
	)

	if err2 != nil {
		fmt.Println(err2.Error())
	}

	c.JSON(200, cuentas)

}

func ConsultarTotalReserva(c *gin.Context) {

	database.DBConnection()

	idUsuarioStr := c.Param("id_usuario")
	idUsuario, err := strconv.Atoi(idUsuarioStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	idMesaStr := c.Param("id_mesa")
	idMesa, err2 := strconv.Atoi(idMesaStr)

	if err2 != nil {
		fmt.Println(err2.Error())
	}

	fmt.Println(idUsuario)
	fmt.Println(idMesa)

	var total []models.TotalReserva

	err3 := database.DBClient.Select(&total, "SELECT SUM(p.precio) as total FROM cuentas c, mesas m, platos p, usuarios u WHERE c.id_mesa = m.id_mesa AND c.id_plato = p.id_plato AND c.id_usuario = u.id_usuario AND u.id_usuario = ? AND c.id_mesa = ?",
		idUsuario,
		idMesa,
	)

	if err3 != nil {
		fmt.Println(err3.Error())
	}

	c.JSON(200, total)

}

func ConsultarPrecioPorPlatoReserva(c *gin.Context) {

	database.DBConnection()

	idUsuarioStr := c.Param("id_usuario")
	idUsuario, err := strconv.Atoi(idUsuarioStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	idMesaStr := c.Param("id_mesa")
	idMesa, err2 := strconv.Atoi(idMesaStr)

	if err2 != nil {
		fmt.Println(err2.Error())
	}

	idCuentaStr := c.Param("id_cuenta")
	idCuenta, err3 := strconv.Atoi(idCuentaStr)

	if err3 != nil {
		fmt.Println(err3.Error())
	}

	fmt.Println(idUsuario)
	fmt.Println(idMesa)
	fmt.Println(idCuenta)

	var total []models.TotalReserva

	err4 := database.DBClient.Select(&total, "SELECT p.precio as total FROM cuentas c, mesas m, platos p, usuarios u WHERE c.id_mesa = m.id_mesa AND c.id_plato = p.id_plato AND c.id_usuario = u.id_usuario AND u.id_usuario = ? AND c.id_mesa = ? AND c.id_cuenta = ?",
		idUsuario,
		idMesa,
		idCuenta,
	)

	if err4 != nil {
		fmt.Println(err4.Error())
	}

	c.JSON(200, total)

}

func EliminarCuenta(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	res, err2 := database.DBClient.Exec("DELETE FROM cuentas WHERE id_cuenta = ?", id)

	if err2 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "la cuenta ha sido eliminado",
		"res": res,
	})

}

func ActualizarCuenta(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	var reqBody models.AgregarCuenta

	if err2 := c.ShouldBindJSON(&reqBody); err2 != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err2.Error(),
			"msg":   "json no valido",
		})
	}

	res, err3 := database.DBClient.Exec("UPDATE cuentas SET id_mesa = ?, id_plato = ? WHERE id_cuenta = ?",
		reqBody.IdMesa,
		reqBody.IdPlato,
		id,
	)

	if err3 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "la cuenta se ha modificado",
		"res": res,
	})

}

func AgregarCuenta(c *gin.Context) {

	database.DBConnection()

	var reqBody models.AgregarCuenta

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err.Error(),
			"msg":   "json no valido",
		})
		return
	}
	
	result, err2 := database.DBClient.Exec("INSERT INTO cuentas(id_mesa,id_plato,id_usuario,fecha_cuenta) VALUES (?,?,?,NOW())",
		reqBody.IdMesa,
		reqBody.IdPlato,
		reqBody.IdUsuario,
	)

	if err2 != nil {
		fmt.Println(err2.Error())
	}

	lastId, err3 := result.LastInsertId()

	if err3 != nil {
		fmt.Println(err3.Error())
	}

	c.JSON(200, gin.H{
		"msg": "cuenta agregada",
		"id_cuenta": lastId,
	})
	

}

func CuentaTotalPorAno(c *gin.Context) {

	database.DBConnection()

	var reqBody models.ListarAnos

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err.Error(),
			"msg":   "json no valido",
		})
		return
	}

	fmt.Println(reqBody.Year)

	monthStr := c.Param("month")
	month, err2 := strconv.Atoi(monthStr)

	if err2 != nil {
		fmt.Println(err2.Error())
	}

	var cuentas []models.TotalCuentaMes

	err3 := database.DBClient.Select(&cuentas, "SELECT SUM(p.precio) as total_mes FROM cuentas c, platos p WHERE c.id_plato = p.id_plato AND YEAR(c.fecha_cuenta) = ? AND MONTH(c.fecha_cuenta) = ?",
		reqBody.Year,
		month,
	)

	if err3 != nil {
		fmt.Println(err3.Error())
	}

	c.JSON(200, cuentas)

}

func ListarAnos(c *gin.Context) {

	database.DBConnection()

	var cuentas []models.ListarAnos

	err := database.DBClient.Select(&cuentas, "SELECT YEAR(fecha_cuenta) as year FROM cuentas GROUP BY YEAR(fecha_cuenta) HAVING COUNT(*) > 1;")

	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, cuentas)

}