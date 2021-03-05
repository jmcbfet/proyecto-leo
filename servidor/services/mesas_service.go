package services

import (
	"fmt"
	"net/http"
	"proyectos/proyecto-leo/servidor/database"
	"proyectos/proyecto-leo/servidor/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ListarMesas(c *gin.Context) {

	database.DBConnection()

	var mesas []models.Mesa

	err := database.DBClient.Select(&mesas, "SELECT id_mesa, descripcion, disponible FROM mesas")

	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, mesas)

}

func ListarMesasDisponibles(c *gin.Context) {

	database.DBConnection()

	var mesas []models.Mesa

	err := database.DBClient.Select(&mesas, "SELECT id_mesa, descripcion FROM mesas WHERE disponible = 1")

	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, mesas)

}

func EliminarMesa(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	res, err2 := database.DBClient.Exec("DELETE FROM mesas WHERE id_mesa = ?", id)

	if err2 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "la mesa ha sido eliminado",
		"res": res,
	})

}

func ActualizarMesa(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	var reqBody models.Mesa

	if err2 := c.ShouldBindJSON(&reqBody); err2 != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err2.Error(),
			"msg":   "json no valido",
		})
	}

	res, err3 := database.DBClient.Exec("UPDATE mesas SET descripcion = ?, disponible = ? WHERE id_mesa = ?",
		reqBody.Descripcion,
		reqBody.Disponible,
		id,
	)

	if err3 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "la mesa se ha modificado",
		"res": res,
	})

}

func AgregarMesa(c *gin.Context) {

	database.DBConnection()

	var reqBody models.AgregarMesa

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err.Error(),
			"msg":   "json no valido",
		})
		return
	}

	result, err2 := database.DBClient.Exec("INSERT INTO mesas(descripcion,disponible) VALUES (?,1)",
		reqBody.Descripcion,
	)

	if err2 != nil {
		fmt.Println(err2.Error())
	}

	lastId, err3 := result.LastInsertId()

	if err3 != nil {
		fmt.Println(err3.Error())
	}

	c.JSON(200, gin.H{
		"msg": "mesa agregada",
		"id_mesa": lastId,
	})

}
