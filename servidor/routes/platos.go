package routes

import (
	"proyectos/proyecto-leo/servidor/middleware"
	"proyectos/proyecto-leo/servidor/services"

	"github.com/gin-gonic/gin"
)

func PlatosRoutes(route *gin.Engine) {

	userGroup := route.Group("/platos")
	{
		userGroup.GET("/find", middleware.JWTAuth(), services.ListarPlatos)
		userGroup.DELETE("/delete/:id", middleware.JWTAuth(), services.EliminarPlato)
		userGroup.PUT("/update/:id", middleware.JWTAuth(), services.ActualizarPlato)
		userGroup.POST("/add", middleware.JWTAuth(), services.AgregarPlato)
	}
}
