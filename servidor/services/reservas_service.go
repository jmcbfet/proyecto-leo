package services

import (
	"fmt"
	"net/http"
	"proyectos/proyecto-leo/servidor/database"
	"proyectos/proyecto-leo/servidor/models"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ListarReservas(c *gin.Context) {

	database.DBConnection()

	var reservas []models.Reserva

	err := database.DBClient.Select(&reservas, "SELECT r.id_reserva, m.descripcion, u.nombre, u.apellido, r.fecha_reserva FROM mesas m, usuarios u, reservas r WHERE r.id_mesa = m.id_mesa AND r.id_usuario = u.id_usuario")

	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, reservas)

}

func EliminarReserva(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	res, err2 := database.DBClient.Exec("DELETE FROM reservas WHERE id_reserva = ?", id)

	if err2 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "la reserva ha sido eliminado",
		"res": res,
	})

}

func ActualizarReserva(c *gin.Context) {

	database.DBConnection()

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		fmt.Println(err.Error())
	}

	var reqBody models.AgregarReserva

	if err2 := c.ShouldBindJSON(&reqBody); err2 != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err2.Error(),
			"msg":   "json no valido",
		})
	}

	res, err3 := database.DBClient.Exec("UPDATE reservas SET id_mesa = ?, id_usuario = ?, fecha_reserva = NOW() WHERE id_reserva = ?",
		reqBody.IdMesa,
		reqBody.IdUsuario,
		id,
	)

	if err3 != nil {
		fmt.Println(err.Error())
	}

	c.JSON(200, gin.H{
		"msg": "la reserva se ha modificado",
		"res": res,
	})

}

func AgregarReserva(c *gin.Context) {

	database.DBConnection()

	var reqBody models.AgregarReserva

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error": err.Error(),
			"msg":   "json no valido",
		})
		return
	}

	result, err2 := database.DBClient.Exec("INSERT INTO reservas(id_mesa,id_usuario,fecha_reserva) VALUES (?,?,NOW())",
		reqBody.IdMesa,
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
		"msg": "mesa agregada",
		"id_mesa": lastId,
	})

}
