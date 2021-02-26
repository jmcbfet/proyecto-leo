package services

import (
	"fmt"
	"net/http"
	"proyectos/proyecto-leo/servidor/database"
	"proyectos/proyecto-leo/servidor/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ListarPlatos(c *gin.Context) {

	database.DBConnection()

	var platos []models.Plato

	err := database.DBClient.Select(&platos, "SELECT id_plato, nombre, precio, imagen FROM platos")

	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, platos)

}

func EliminarPlato(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	res, err2 := database.DBClient.Exec("DELETE FROM platos WHERE id_plato = ?", id)

	if err2 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "El plato ha sido eliminado",
		"res": res,
	})

}

func ActualizarPlato(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	var reqBody models.Plato

	if err2 := c.ShouldBindJSON(&reqBody); err2 != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err2.Error(),
			"msg":   "json no valido",
		})
	}

	res, err3 := database.DBClient.Exec("UPDATE platos SET nombre = ?, precio = ?, imagen = ? WHERE id_plato = ?",
		reqBody.Nombre,
		reqBody.Precio,
		reqBody.Imagen,
		id,
	)

	if err3 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "El plato se ha modificado",
		"res": res,
	})

}

func AgregarPlato(c *gin.Context) {

	database.DBConnection()

	var reqBody models.AgregarPlato

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err.Error(),
			"msg":   "json no valido",
		})
		return
	}

	fmt.Println(reqBody.Nombre)

	result, err2 := database.DBClient.Exec("INSERT INTO platos(nombre,precio,imagen) VALUES (?,?,?)",
		reqBody.Nombre,
		reqBody.Precio,
		reqBody.Imagen,
	)

	if err2 != nil {
		fmt.Println(err2.Error())
	}

	lastId, err3 := result.LastInsertId()

	if err3 != nil {
		fmt.Println(err3.Error())
	}

	c.JSON(200, gin.H{
		"msg": "plato agregado",
		"id_plato": lastId,
	})

}
