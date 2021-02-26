package routes

import (
	"proyectos/proyecto-leo/servidor/middleware"
	"proyectos/proyecto-leo/servidor/services"

	"github.com/gin-gonic/gin"
)

func UsersRoutes(route *gin.Engine) {
	userGroup := route.Group("/user")
	{
		userGroup.GET("/find", middleware.JWTAuth(), services.ListarUsuarios)
		userGroup.GET("/getdata", middleware.JWTAuth(), services.ObtenerDatosUsuario)
		userGroup.DELETE("/delete/:id", middleware.JWTAuth(), services.EliminarUsuario)
		userGroup.PUT("/update/:id", middleware.JWTAuth(), services.ActualizarUsuario)
		userGroup.POST("/add", services.AgregarUsuario)
		userGroup.POST("/login", services.Login)
	}
}
