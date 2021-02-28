package services

import (
	"fmt"
	"net/http"
	"proyectos/proyecto-leo/servidor/database"
	"proyectos/proyecto-leo/servidor/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ListarComentarios(c *gin.Context) {

	database.DBConnection()

	var comentarios []models.Comentario

	err := database.DBClient.Select(&comentarios, "SELECT c.id_comentario, p.id_plato, p.nombre, c.comentario FROM comentarios c, platos p WHERE c.id_plato = p.id_plato");

	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, comentarios)

}

func ListarComentariosPorPlato(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	var comentarios []models.Comentario

	err2 := database.DBClient.Select(&comentarios, "SELECT c.id_comentario, p.id_plato, p.nombre, c.comentario FROM comentarios c, platos p WHERE c.id_plato = p.id_plato AND p.id_plato = ?", id);

	if err != nil {
		fmt.Println(err2.Error())
	}

	c.JSON(200, comentarios)

}

func EliminarComentario(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	res, err2 := database.DBClient.Exec("DELETE FROM comentarios WHERE id_comentario = ?", id)

	if err2 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "El comentario ha sido eliminado",
		"res": res,
	})

}

func ActualizarComentario(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	var reqBody models.Comentario

	if err2 := c.ShouldBindJSON(&reqBody); err2 != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err2.Error(),
			"msg":   "json no valido",
		})
	}

	res, err3 := database.DBClient.Exec("UPDATE comentarios SET comentario = ? WHERE id_comentario = ?",
		reqBody.Comentario,
		id,
	)

	if err3 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "El comentario se ha modificado",
		"res": res,
	})

}

func AgregarComentario(c *gin.Context) {

	database.DBConnection()

	var reqBody models.AgregarComentario

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err.Error(),
			"msg":   "json no valido",
		})
		return
	}

	result, err2 := database.DBClient.Exec("INSERT INTO comentarios(id_plato,comentario) VALUES (?,?)",
		reqBody.IdPlato,
		reqBody.Comentario,
	)

	if err2 != nil {
		fmt.Println(err2.Error())
	}

	lastId, err3 := result.LastInsertId()

	if err3 != nil {
		fmt.Println(err3.Error())
	}

	c.JSON(200, gin.H{
		"msg": "Comentario agregado",
		"id_comentario": lastId,
	})

}
