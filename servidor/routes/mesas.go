package routes

import (
	"proyectos/proyecto-leo/servidor/middleware"
	"proyectos/proyecto-leo/servidor/services"

	"github.com/gin-gonic/gin"
)

func MesasRoutes(route *gin.Engine) {

	userGroup := route.Group("/mesas")
	{
		userGroup.GET("/find", middleware.JWTAuth(), services.ListarMesas)
		userGroup.DELETE("/delete/:id", middleware.JWTAuth(), services.EliminarMesa)
		userGroup.PUT("/update/:id", middleware.JWTAuth(), services.ActualizarMesa)
		userGroup.POST("/add", middleware.JWTAuth(), services.AgregarMesa)
	}
}
