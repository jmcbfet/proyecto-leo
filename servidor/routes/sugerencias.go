package routes

import (
	/*"proyectos/proyecto-leo/servidor/middleware"*/
	"proyectos/proyecto-leo/servidor/services"

	"github.com/gin-gonic/gin"
)

func SugerenciasRoutes(route *gin.Engine) {

	userGroup := route.Group("/sugerencias")
	{
		userGroup.GET("/find", services.ListarSugerencias)
		userGroup.DELETE("/delete/:id", services.EliminarSugerencia)
		userGroup.PUT("/update/:id", services.ActualizarSugerencia)
		userGroup.POST("/add", services.AgregarSugerencia)
	}
}
