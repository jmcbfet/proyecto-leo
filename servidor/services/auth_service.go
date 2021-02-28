package services

import (
	"fmt"
	"net/http"
	"proyectos/proyecto-leo/servidor/authorization"
	"proyectos/proyecto-leo/servidor/database"
	"proyectos/proyecto-leo/servidor/models"

	"github.com/gin-gonic/gin"
)

var (
	secret = []byte("secret")
)

var reqBody models.Usuario

func Login(c *gin.Context) {

	database.DBConnection()

	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusUnprocessableEntity, gin.H{
			"error":   true,
			"message": "Invalid request Body",
		})
		return
	}

	err := database.DBClient.Get(&reqBody, "SELECT id_usuario,nombre,apellido,correo,password,id_rol FROM usuarios WHERE correo = ? AND password = ?",
		reqBody.Correo,
		reqBody.Password,
	)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"msg": "Cuenta no valida",
		})
		return
	}

	token, err := authorization.GetToken(reqBody.Correo, c)

	if err != nil {
		fmt.Println(err.Error())
	}

	c.JSON(http.StatusOK, gin.H{
		"token":   token,
		"usuario": reqBody,
	})

}

func ObtenerDatosUsuario(c *gin.Context) {

	database.DBConnection()

	err := database.DBClient.Get(&reqBody, "SELECT nombre,apellido,correo,password,id_rol FROM usuarios WHERE correo = ? AND password = ?",
		reqBody.Correo,
		reqBody.Password,
	)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"msg": "Cuenta no valida",
		})
		return
	}

	c.JSON(200, reqBody)

}