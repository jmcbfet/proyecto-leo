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

	err := database.DBClient.Select(&cuentas, "SELECT c.id_cuenta, m.descripcion, p.nombre FROM cuentas c, mesas m, platos p WHERE c.id_mesa = m.id_mesa AND c.id_plato = p.id_plato")

	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, cuentas)

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

	result, err2 := database.DBClient.Exec("INSERT INTO cuentas(id_mesa,id_plato) VALUES (?,?)",
		reqBody.IdMesa,
		reqBody.IdPlato,
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
		"id_mesa": lastId,
	})

}
