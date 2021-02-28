package routes

import (
	/*"proyectos/proyecto-leo/servidor/middleware"*/
	"proyectos/proyecto-leo/servidor/services"

	"github.com/gin-gonic/gin"
)

func ReservasRoutes(route *gin.Engine) {

	userGroup := route.Group("/reserva")
	{
		userGroup.GET("/find", services.ListarReservas)
		userGroup.DELETE("/delete/:id", services.EliminarReserva)
		userGroup.PUT("/update/:id", services.ActualizarReserva)
		userGroup.POST("/add", services.AgregarReserva)
	}
}
