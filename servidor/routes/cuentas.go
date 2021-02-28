package routes

import (
	/*"proyectos/proyecto-leo/servidor/middleware"*/
	"proyectos/proyecto-leo/servidor/services"

	"github.com/gin-gonic/gin"
)

func CuentasRoutes(route *gin.Engine) {

	userGroup := route.Group("/cuentas")
	{
		userGroup.GET("/find", services.ListarCuentas)
		userGroup.DELETE("/delete/:id", services.EliminarCuenta)
		userGroup.PUT("/update/:id", services.ActualizarCuenta)
		userGroup.POST("/add", services.AgregarCuenta)
	}
}
