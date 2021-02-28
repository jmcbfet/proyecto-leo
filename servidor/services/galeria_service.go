package services

import (
	"fmt"
	"net/http"
	"proyectos/proyecto-leo/servidor/database"
	"proyectos/proyecto-leo/servidor/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ListarGaleria(c *gin.Context) {

	database.DBConnection()

	var galeria []models.Galeria

	err := database.DBClient.Select(&galeria, "SELECT id_galeria, src, altText, caption FROM galeria");

	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, galeria)

}

func EliminarFoto(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	res, err2 := database.DBClient.Exec("DELETE FROM galeria WHERE id_galeria = ?", id)

	if err2 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "La foto ha sido eliminado",
		"res": res,
	})

}

func ActualizarFoto(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	var reqBody models.Galeria

	if err2 := c.ShouldBindJSON(&reqBody); err2 != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err2.Error(),
			"msg":   "json no valido",
		})
	}

	res, err3 := database.DBClient.Exec("UPDATE galeria SET src = ?, altText = ?, caption = ? WHERE id_galeria = ?",
		reqBody.Src,
		reqBody.AltText,
		reqBody.Caption,
		id,
	)

	if err3 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "La foto se ha modificado",
		"res": res,
	})

}

func AgregarFoto(c *gin.Context) {

	database.DBConnection()

	var reqBody models.AgregarGaleria

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err.Error(),
			"msg":   "json no valido",
		})
		return
	}

	result, err2 := database.DBClient.Exec("INSERT INTO galeria(src,altText,caption) VALUES (?,?,?)",
		reqBody.Src,
		reqBody.AltText,
		reqBody.Caption,
	)

	if err2 != nil {
		fmt.Println(err2.Error())
	}

	lastId, err3 := result.LastInsertId()

	if err3 != nil {
		fmt.Println(err3.Error())
	}

	c.JSON(200, gin.H{
		"msg": "Foto agregada",
		"id_comentario": lastId,
	})

}
