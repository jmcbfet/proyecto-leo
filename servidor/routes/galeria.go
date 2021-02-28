package routes

import (
	/*"proyectos/proyecto-leo/servidor/middleware"*/
	"proyectos/proyecto-leo/servidor/services"

	"github.com/gin-gonic/gin"
)

func GaleriaRoutes(route *gin.Engine) {

	userGroup := route.Group("/galeria")
	{
		userGroup.GET("/find", services.ListarGaleria)
		userGroup.DELETE("/delete/:id", services.EliminarFoto)
		userGroup.PUT("/update/:id", services.ActualizarFoto)
		userGroup.POST("/add", services.AgregarFoto)
	}
}
