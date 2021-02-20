package routes

import (
	"proyectos/proyecto-leo/servidor/middleware"
	"proyectos/proyecto-leo/servidor/services"

	"github.com/gin-gonic/gin"
)

func UsersRoutes(route *gin.Engine) {
	userGroup := route.Group("/user")
	{
		userGroup.GET("/find", services.ListarUsuarios)
		userGroup.GET("/findone/:id", middleware.JWTAuth(), services.ListarUsuario)
		userGroup.GET("/getdata", services.ObtenerDatosUsuario)
		userGroup.DELETE("/delete/:id", services.EliminarUsuario)
		userGroup.PUT("/update/:id", services.ActualizarUsuario)
		userGroup.POST("/add", services.AgregarUsuario)
		userGroup.POST("/login", services.Login)
	}
}
