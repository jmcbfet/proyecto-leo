package services

import (
	"fmt"
	"net/http"
	"proyectos/proyecto-leo/servidor/database"
	"proyectos/proyecto-leo/servidor/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ListarSugerencias(c *gin.Context) {

	database.DBConnection()

	var sugerencias []models.Sugerencia

	err := database.DBClient.Select(&sugerencias, "SELECT id_sugerencia, correo, descripcion FROM sugerencias")

	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, sugerencias)

}

func EliminarSugerencia(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	res, err2 := database.DBClient.Exec("DELETE FROM sugerencias WHERE id_sugerencia = ?", id)

	if err2 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "La sugerencia ha sido eliminado",
		"res": res,
	})

}

func ActualizarSugerencia(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	var reqBody models.Sugerencia

	if err2 := c.ShouldBindJSON(&reqBody); err2 != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err2.Error(),
			"msg":   "json no valido",
		})
	}

	res, err3 := database.DBClient.Exec("UPDATE sugerencias SET correo = ?, descripcion = ? WHERE id_sugerencia = ?",
		reqBody.Correo,
		reqBody.Descripcion,
		id,
	)

	if err3 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "La sugerencia se ha modificado",
		"res": res,
	})

}

func AgregarSugerencia(c *gin.Context) {

	database.DBConnection()

	var reqBody models.AgregarSugerencia

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err.Error(),
			"msg":   "json no valido",
		})
		return
	}

	result, err2 := database.DBClient.Exec("INSERT INTO sugerencias(correo,descripcion) VALUES (?,?)",
		reqBody.Correo,
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
		"msg": "Sugerencia agregada",
		"id_sugerencia": lastId,
	})

}
