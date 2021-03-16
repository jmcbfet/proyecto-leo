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
		userGroup.GET("/modal/:id_usuario/:id_mesa", services.ListarCuentaPorUsuario)
		userGroup.GET("/cuenta/:id_usuario/:id_mesa", services.ConsultarTotalReserva)
		userGroup.GET("/total/:id_usuario/:id_mesa/:id_cuenta", services.ConsultarPrecioPorPlatoReserva)
		userGroup.GET("/find/:id_plato", services.ConsultaParaActualizar)
		userGroup.DELETE("/delete/:id", services.EliminarCuenta)
		userGroup.PUT("/update/:id", services.ActualizarCuenta)
		userGroup.POST("/add", services.AgregarCuenta)

		userGroup.POST("/grafica/:month", services.CuentaTotalPorAno)
		userGroup.GET("/listar/anos", services.ListarAnos)

	}
}
