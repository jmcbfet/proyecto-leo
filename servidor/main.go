package main

import (
	"proyectos/proyecto-leo/servidor/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST", "OPTIONS", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "User-Agent", "Referrer", "Host", "Token", "x-auth-token"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowAllOrigins:  false,
		AllowOriginFunc:  func(origin string) bool { return true },
		MaxAge:           86400,
	}))

	routes.UsersRoutes(router)
	routes.PlatosRoutes(router)
	routes.MesasRoutes(router)
	routes.SugerenciasRoutes(router)
	routes.ComentariosRoutes(router)
	routes.GaleriaRoutes(router)
	routes.ReservasRoutes(router)
	routes.CuentasRoutes(router)

	router.Run(":8000")

}
