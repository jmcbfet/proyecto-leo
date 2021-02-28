package routes

import (
	/*"proyectos/proyecto-leo/servidor/middleware"*/
	"proyectos/proyecto-leo/servidor/services"

	"github.com/gin-gonic/gin"
)

func ComentariosRoutes(route *gin.Engine) {

	userGroup := route.Group("/comentarios")
	{
		userGroup.GET("/find", services.ListarComentarios)
		userGroup.GET("/find/:id", services.ListarComentariosPorPlato)
		userGroup.DELETE("/delete/:id", services.EliminarComentario)
		userGroup.PUT("/update/:id", services.ActualizarComentario)
		userGroup.POST("/add", services.AgregarComentario)
	}
}
